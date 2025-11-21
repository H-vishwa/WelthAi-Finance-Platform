import { getDashboardData, getUserAccounts } from "@/actions/dashboard";
import AccountDrawer from "@/components/accountDrawer";
import { Card, CardContent } from "@/components/ui/card";
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
      <div>
        {defaultAccount && (
          <BudgetProgress
            initialBudget={budgetData?.budget}
            currentExpenses={budgetData?.currentExpenses || 0}
          />
        )}
      </div>
      {/* Overview  */}
      <Suspense fallback="Loading Overview...">
        <DashboardOverview
          accounts={accounts}
          transactions={transactions || []}
        />
      </Suspense>

      {/* Account Grid  */}
      <div className=" grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-4">
        <AccountDrawer>
          <Card className="hover:shadow-md transition-shadow cursor-pointer border-dashed">
            <CardContent
              className={
                "flex flex-col items-center justify-center text-muted-foreground h-full pt-5"
              }>
              <Plus className="h-10 w-10 mb-2" />
              <p className="text-sm font-medium">Add New Account</p>
            </CardContent>
          </Card>
        </AccountDrawer>
        {accounts.length > 0 &&
          accounts.map((account) => {
            return (
              <AccountCard key={account.id} account={account}></AccountCard>
            );
          })}
      </div>
    </div>
  );
}

export default DashboardPage;
