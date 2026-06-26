import { getUserAccounts } from "@/actions/dashboard";
import { defaultCategories } from "@/data/categories";
import TransactionForm from "../components/transactionForm";
import { getTransaction } from "@/actions/transaction";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

const addTransactionPage = async ({ searchParams }) => {
  const accounts = await getUserAccounts();

  const { edit: editId } = await searchParams;
  let initialData = null;
  if (editId) {
    const transaction = await getTransaction(editId);
    initialData = transaction;
  }


  return (
    <div className="max-w-3xl mx-auto px-5">
      {/* Back Navigation */}
      <div className="mb-4">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-white transition-colors duration-200"
        >
          <ChevronLeft size={14} />
          Back to Dashboard
        </Link>
      </div>

      <h1 className="text-4xl md:text-5xl gradient-title mb-8 animate-gradient">
        {editId ? "Edit" : "Add"} Transaction
      </h1>

      <TransactionForm
        accounts={accounts}
        categories={defaultCategories}
        editMode={!!editId}
        initialData={initialData}
      />
    </div>
  );
};

export default addTransactionPage;
