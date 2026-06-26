import { getAccountsWithTransactions } from "@/actions/accounts";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import TransactionTable from "../components/transactionTable";
import AccountChart from "../components/AccountChart";
import { CreditCard, ChevronLeft } from "lucide-react";
import Link from "next/link";

const AccountsPage = async ({ params }) => {
  const { id } = await params;
  const accountData = await getAccountsWithTransactions(id);

  if (!accountData) notFound();

  const { transactions, ...account } = accountData;

  return (
    <div className="space-y-6 pb-12">
      {/* Back Navigation */}
      <div>
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-white transition-colors duration-200"
        >
          <ChevronLeft size={14} />
          Back to Dashboard
        </Link>
      </div>

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row gap-4 sm:items-end justify-between pt-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-white/5 border border-white/10 shrink-0">
            <CreditCard size={24} className="text-white" />
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
        <div className="text-left sm:text-right rounded-2xl px-6 py-4 border border-white/5 bg-neutral-900/40 backdrop-blur-xl">
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
        fallback={<div className="rounded-2xl h-64 border border-white/5 bg-neutral-900/30 backdrop-blur-xl animate-pulse" />}
      >
        <AccountChart transactions={transactions} />
      </Suspense>

      {/* Table */}
      <Suspense
        fallback={<div className="rounded-2xl h-96 border border-white/5 bg-neutral-900/30 backdrop-blur-xl animate-pulse" />}
      >
        <TransactionTable transactions={transactions} />
      </Suspense>
    </div>
  );
};

export default AccountsPage;
