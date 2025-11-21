import { getAccountsWithTransactions } from "@/actions/accounts";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import TransactionTable from "../components/transactionTable";
import { BarLoader } from "react-spinners";
import AccountChart from "../components/AccountChart";

const AccountsPage = async ({ params }) => {
  const { id } = await params;
  const accountData = await getAccountsWithTransactions(id);

  if (!accountData) {
    notFound();
  }

  const { transactions, ...account } = accountData;

  return (
    <div className="space-y-8 px-5 ">
      <div className="flex gap-4 items-end justify-between">
        <div className="">
          <h1 className="text-5xl md:text-6xl font-bold capitalize gradient-title">
            {accountData.name}
          </h1>
          <p className="text-muted-foreground">
            {account.type.charAt(0) + account.type.slice(1).toLowerCase()}{" "}
            Account{" "}
          </p>
        </div>
        <div className="text-right pb-2">
          <div className="text-xl font-bold sm:text-2xl">
            ₹{parseFloat(account.balance).toFixed(2)}
          </div>
          <p className="text-sm text-muted-foreground">
            {account._count.transactions} Transactions
          </p>
        </div>
      </div>
      {/* Chart Section */}
      <Suspense
        fallback={
          <BarLoader className="mt-4" width={"100%"} color="#0e7490" />
        }>
        <AccountChart transactions={transactions} />
      </Suspense>

      {/* Transaction Table */}
      <Suspense
        fallback={
          <BarLoader className="mt-4" width={"100%"} color="#0e7490" />
        }>
        <TransactionTable transactions={transactions} />
      </Suspense>
    </div>
  );
};

export default AccountsPage;
