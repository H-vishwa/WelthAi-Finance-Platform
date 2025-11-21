"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

const serializeTransaction = (transaction) => {
  const serialized = { ...transaction };

  if (transaction.balance) {
    serialized.balance = transaction.balance.toNumber();
  }
  if (transaction.amount) {
    serialized.amount = transaction.amount.toNumber();
  }
  return serialized;
};

export async function createAccount(data) {
  try {
    const userId = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
      where: { clerkUserId: userId.userId },
    });
    if (!user) throw new Error("User does not exist");

    // balance conversion into float before storing
    const balanceFloat = parseFloat(data.balance);
    if (isNaN(balanceFloat)) {
      throw new Error("Invalid balance amount");
    }

    // check for existing account with the same name
    const existingAccounts = await db.account.findMany({
      where: {
        userId: user.id,
      },
    });

    // if the Account should be default, then set all other accounts to non-default
    const shouldBeDefault =
      existingAccounts.length === 0 ? true : data.isDefault;
    if (shouldBeDefault) {
      await db.account.updateMany({
        where: { userId: user.id, isDefault: true },
        data: { isDefault: false },
      });
    }

    // create the new account
    const newAccount = await db.account.create({
      data: {
        ...data,
        balance: balanceFloat,
        userId: user.id,
        isDefault: shouldBeDefault,
      },
    });

    const serializedAcc = serializeTransaction(newAccount);
    revalidatePath("/dashboard");
    return { success: true, data: serializedAcc };
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getUserAccounts() {
  const userId = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId.userId },
  });
  if (!user) throw new Error("User does not exist");

  const accounts = await db.account.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
    include: {
      _count: {
        select: {
          transactions: true,
        },
      },
    },
  });
  const serializedAcc = accounts.map(serializeTransaction);
  return serializedAcc;
}

export async function getDashboardData() {
  const userId = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId.userId },
  });
  if (!user) throw new Error("User does not exist");

  const transactions = await db.transaction.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });

  return transactions.map(serializeTransaction);
}
