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
          <div className="rounded-2xl h-64 border border-white/5 bg-neutral-900/30 backdrop-blur-xl animate-pulse" />
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
            <div className="rounded-2xl p-6 flex flex-col items-center justify-center gap-3 cursor-pointer group border border-dashed border-white/10 bg-white/3 hover:border-white/25 hover:bg-white/5 transition-all duration-300 min-h-[180px]">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-white/5 border border-white/10 group-hover:scale-110 group-hover:bg-white/10 group-hover:border-white/20 transition-all duration-300">
                <Plus size={22} className="text-white" />
              </div>
              <div className="text-center">
                <p className="text-slate-300 font-medium text-sm">Add New Account</p>
                <p className="text-slate-500 text-xs mt-0.5">Connect a bank or wallet</p>
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
