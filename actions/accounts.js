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

export async function updateDefaultAccount(accountId) {
  try {
    const userId = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
      where: { clerkUserId: userId.userId },
    });
    if (!user) throw new Error("User does not exist");

    await db.account.updateMany({
      where: { userId: user.id, isDefault: true },
      data: { isDefault: false },
    });

    const account = await db.account.update({
      where: {
        id: accountId,
        userId: user.id,
      },
      data: { isDefault: true },
    });

    revalidatePath("/dashboard");
    return { success: true, data: serializeTransaction(account) };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function getAccountsWithTransactions(accountId) {
  const userId = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId.userId },
  });
  if (!user) throw new Error("User does not exist");

  const accounts = await db.account.findUnique({
    where: {
      id: accountId,
      userId: user.id,
    },
    include: {
      transactions: { orderBy: { createdAt: "desc" } },
      _count: {
        select: {
          transactions: true,
        },
      },
    },
  });

  if (!accounts) return null;

  return {
    ...serializeTransaction(accounts),
    transactions: accounts.transactions.map(serializeTransaction),
  };
}

export async function bulkDeleteTransaction(transactionsIds) {
  try {
    const userId = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
      where: { clerkUserId: userId.userId },
    });
    if (!user) throw new Error("User does not exist");

    const transactions = await db.transaction.findMany({
      where: {
        id: { in: transactionsIds },
        userId: user.id,
      },
    });

    const accountBalanceUpdates = transactions.reduce((acc, txn) => {
      const Change =
        txn.type === "EXPENSE" ? txn.amount.toNumber() : -txn.amount.toNumber();

      acc[txn.accountId] = (acc[txn.accountId] || 0) + Change;
      return acc;
    }, {});

    await db.$transaction(async (tx) => {
      await tx.transaction.deleteMany({
        where: {
          id: { in: transactionsIds },
          userId: user.id,
        },
      });

      for (const [accountId, balanceChange] of Object.entries(
        accountBalanceUpdates
      )) {
        await tx.account.update({
          where: {
            id: accountId,
          },
          data: {
            balance: {
              increment: balanceChange,
            },
          },
        });
      }
    });

    revalidatePath("/dashboard");
    revalidatePath("/account/[id]");
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
