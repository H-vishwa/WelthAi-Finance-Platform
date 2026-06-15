import { getDashboardData, getUserAccounts } from "@/actions/dashboard";
import AccountDrawer from "@/components/accountDrawer";
import { Plus } from "lucide-react";
import AccountCard from "./_components/AccountCard";
import { getCurrentBudgets } from "@/actions/budget";
import BudgetProgress from "./_components/budgetProgress";
import { Suspense } from "react";
import DashboardOverview from "./_components/transactionOverview";

async function DashboardPage() {
  const accounts = await getUserAccounts();
  const defaultAccount = accounts?.find((account) => account.isDefault);

  let budgetData = null;
  if (defaultAccount) {
    budgetData = await getCurrentBudgets(defaultAccount.id);
  }

  const transactions = await getDashboardData();

  return (
    <div className="space-y-8">
      {/* Budget Progress */}
      {defaultAccount && (
        <BudgetProgress
          initialBudget={budgetData?.budget}
          currentExpenses={budgetData?.currentExpenses || 0}
        />
      )}

      {/* Overview */}
      <Suspense
        fallback={
          <div className="rounded-2xl h-64 border border-blue-500/10 bg-[#0d1426]/70 animate-pulse" />
        }
      >
        <DashboardOverview accounts={accounts} transactions={transactions || []} />
      </Suspense>

      {/* Account Grid */}
      <div>
        <h2 className="text-base font-semibold text-slate-400 mb-4 uppercase tracking-wider">
          Your Accounts
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* Add New Account Card */}
          <AccountDrawer>
            <div className="rounded-2xl p-6 flex flex-col items-center justify-center gap-3 cursor-pointer group border border-dashed border-blue-500/15 bg-[#0d1426]/50 hover:border-blue-500/35 hover:bg-blue-500/5 transition-all duration-300 min-h-[180px]">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-blue-500/10 border border-blue-500/20 group-hover:scale-110 group-hover:bg-blue-500/15 transition-all duration-300">
                <Plus size={22} className="text-blue-400" />
              </div>
              <div className="text-center">
                <p className="text-slate-300 font-medium text-sm">Add New Account</p>
                <p className="text-slate-600 text-xs mt-0.5">Connect a bank or wallet</p>
              </div>
            </div>
          </AccountDrawer>

          {accounts.length > 0 &&
            accounts.map((account) => (
              <AccountCard key={account.id} account={account} />
            ))}
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
