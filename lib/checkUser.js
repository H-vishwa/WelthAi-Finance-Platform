import { currentUser } from "@clerk/nextjs/server";
import { db } from "./prisma";

export const checkUser = async () => {
  try {
    const user = await currentUser();
    
    if (!user) {
      return null;
    }

    const loggedInUser = await db.user.findUnique({
      where: {
        clerkUserId: user.id, // Assuming 'clerkUserId' is the unique identifier in your schema
      },
    });

    if (loggedInUser) {
      return loggedInUser;
    }

    const email = user.emailAddresses[0].emailAddress;
    const existingUserByEmail = await db.user.findUnique({
      where: { email },
    });

    if (existingUserByEmail) {
      const updatedUser = await db.user.update({
        where: { email },
        data: {
          clerkUserId: user.id,
          name: `${user.firstName || ""} ${user.lastName || ""}`.trim(),
          imageUrl: user.imageUrl,
        },
      });
      return updatedUser;
    }

    const name = `${user.firstName || ""} ${user.lastName || ""}`.trim();
    const newUser = await db.user.create({
      data: {
        clerkUserId: user.id,
        name,
        imageUrl: user.imageUrl,
        email,
      },
    });
    return newUser;
  } catch (error) {
    console.error("Error in checkUser:", error);
    return null; // Return null instead of undefined
  }
};
