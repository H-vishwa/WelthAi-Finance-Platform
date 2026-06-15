import { getAccountsWithTransactions } from "@/actions/accounts";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import TransactionTable from "../components/transactionTable";
import AccountChart from "../components/AccountChart";
import { CreditCard } from "lucide-react";

const AccountsPage = async ({ params }) => {
  const { id } = await params;
  const accountData = await getAccountsWithTransactions(id);

  if (!accountData) notFound();

  const { transactions, ...account } = accountData;

  return (
    <div className="space-y-8 pb-12">
      {/* Page Header */}
      <div className="flex gap-4 items-end justify-between pt-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br from-blue-500/20 to-cyan-500/15 border border-blue-500/25">
            <CreditCard size={24} className="text-blue-400" />
          </div>
          <div>
            <h1 className="text-4xl md:text-5xl font-black capitalize gradient-title">
              {accountData.name}
            </h1>
            <p className="text-slate-500 text-sm mt-0.5">
              {account.type.charAt(0) + account.type.slice(1).toLowerCase()} Account
            </p>
          </div>
        </div>

        {/* Balance box */}
        <div className="text-right rounded-2xl px-6 py-4 border border-blue-500/10 bg-[#0d1426]/70 backdrop-blur-xl">
          <div className="text-2xl md:text-3xl font-black text-white">
            ₹{parseFloat(account.balance).toLocaleString("en-IN", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </div>
          <p className="text-slate-500 text-xs mt-0.5">
            {account._count.transactions} Transactions
          </p>
        </div>
      </div>

      {/* Chart */}
      <Suspense
        fallback={<div className="rounded-2xl h-64 border border-blue-500/10 bg-[#0d1426]/70 animate-pulse" />}
      >
        <AccountChart transactions={transactions} />
      </Suspense>

      {/* Table */}
      <Suspense
        fallback={<div className="rounded-2xl h-96 border border-blue-500/10 bg-[#0d1426]/70 animate-pulse" />}
      >
        <TransactionTable transactions={transactions} />
      </Suspense>
    </div>
  );
};

export default AccountsPage;
