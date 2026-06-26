"use client";

import { createTransaction, updateTransaction } from "@/actions/transaction";
import { TransactionSchema } from "@/app/lib/schema";
import AccountDrawer from "@/components/accountDrawer";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import useFetch from "@/hooks/useFetch";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns/format";
import { CalendarIcon, Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import ReceiptScanner from "./receiptScanner";

const TransactionForm = ({
  accounts,
  categories,
  editMode = false,
  initialData = null,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("edit");

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    watch,
    getValues,
    reset,
  } = useForm({
    resolver: zodResolver(TransactionSchema),
    defaultValues:
      editMode && initialData
        ? {
            type: initialData.type,
            amount: initialData.amount.toString(),
            description: initialData.description,
            accountId: initialData.accountId,
            category: initialData.category,
            date: new Date(initialData.date),
            isRecurring: initialData.isRecurring,
            ...(initialData.recurringInterval && {
              recurringInterval: initialData.recurringInterval,
            }),
          }
        : {
            type: "EXPENSE",
            amount: "",
            description: "",
            accountId: accounts.find((ac) => ac.isDefault)?.id,
            date: new Date(),
            isRecurring: false,
          },
  });

  const {
    loading: transactionLoading,
    fn: transactionfn,
    data: transactionResult,
  } = useFetch(editMode ? updateTransaction : createTransaction);

  const type = watch("type");
  const isRecurring = watch("isRecurring");
  const date = watch("date");

  const onSubmit = async (data) => {
    const formData = {
      ...data,
      amount: parseFloat(data.amount),
    };

    if (editMode) {
      transactionfn(editId, formData);
    } else {
      transactionfn(formData);
    }
  };

  useEffect(() => {
    if (transactionResult?.success && !transactionLoading) {
      toast.success(
        editMode
          ? "Transaction updated Succesfully"
          : "Transaction created Succesfully",
      );
      reset();
      router.push(`/account/${transactionResult.data.accountId}`);
    }
  }, [transactionResult, transactionLoading, editMode]);

  const filteredCategories = categories.filter(
    (category) => category.type === type,
  );

  const handleScanComplete = async (scannedData) => {
    if (scannedData) {
      setValue("amount", scannedData.amount.toString());
      setValue("date", new Date(scannedData.date));
      if (scannedData.description) {
        setValue("description", scannedData.description);
      }
      if (scannedData.category) {
        setValue("category", scannedData.category);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* AI Receipt Scanner */}
      {!editMode && <ReceiptScanner onScanComplete={handleScanComplete} />}

      <div className="rounded-2xl px-4 py-6 sm:p-6 md:p-8 border border-white/5 bg-neutral-900/40 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.55)] hover:border-white/15 transition-all duration-300">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-6 md:grid-cols-2">
            {/* Account */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">Account</label>
              <Select
                onValueChange={(value) => setValue("accountId", value)}
                defaultValue={getValues("accountId")}>
                <SelectTrigger className="cursor-pointer w-full bg-[#080d1a]/50 border-white/10 hover:border-white/20 text-white rounded-xl h-11 focus:ring-1 focus:ring-white/20 focus:border-white/20">
                  <SelectValue placeholder="Select Account" />
                </SelectTrigger>
                <SelectContent className="bg-[#121212] border border-white/10 text-slate-200">
                  {accounts.map((account) => (
                    <SelectItem
                      value={account.id}
                      key={account.id}
                      className="cursor-pointer hover:bg-white/5 focus:bg-white/5">
                      {account.name} (₹{parseFloat(account.balance).toFixed(2)})
                    </SelectItem>
                  ))}
                  <AccountDrawer>
                    <Button
                      variant="ghost"
                      className="w-full select-none items-center text-sm outline-none cursor-pointer hover:bg-white/5 text-blue-400 hover:text-blue-300">
                      Create Account
                    </Button>
                  </AccountDrawer>
                </SelectContent>
              </Select>
              {errors.accountId && (
                <p className="text-sm text-red-400">{errors.accountId.message}</p>
              )}
            </div>

            {/* Type */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">Type</label>
              <Select
                onValueChange={(value) => setValue("type", value)}
                defaultValue={type}>
                <SelectTrigger className="w-full bg-[#080d1a]/50 border-white/10 hover:border-white/20 text-white rounded-xl h-11 focus:ring-1 focus:ring-white/20 focus:border-white/20">
                  <SelectValue placeholder="Select Type" />
                </SelectTrigger>
                <SelectContent className="bg-[#121212] border border-white/10 text-slate-200">
                  <SelectItem value="INCOME" className="cursor-pointer text-emerald-400">Income</SelectItem>
                  <SelectItem value="EXPENSE" className="cursor-pointer text-rose-400">Expense</SelectItem>
                </SelectContent>
              </Select>
              {errors.type && (
                <p className="text-sm text-red-400">{errors.type.message}</p>
              )}
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Amount */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">Amount</label>
              <Input
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                className="bg-[#080d1a]/50 border-white/10 hover:border-white/20 text-white rounded-xl h-11 focus:ring-1 focus:ring-white/20 focus:border-white/20 pr-4"
                {...register("amount")}
              />
              {errors.amount && (
                <p className="text-sm text-red-400">{errors.amount.message}</p>
              )}
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">Category</label>
              <Select
                onValueChange={(value) => setValue("category", value)}
                defaultValue={getValues("category")}>
                <SelectTrigger className="cursor-pointer w-full bg-[#080d1a]/50 border-white/10 hover:border-white/20 text-white rounded-xl h-11 focus:ring-1 focus:ring-white/20 focus:border-white/20">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent className="bg-[#121212] border border-white/10 text-slate-200">
                  {filteredCategories.map((category) => (
                    <SelectItem
                      value={category.id}
                      key={category.id}
                      className="cursor-pointer hover:bg-white/5 focus:bg-white/5">
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.category && (
                <p className="text-sm text-red-400">{errors.category.message}</p>
              )}
            </div>
          </div>

          {/* Date */}
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">Date</label>
            <Popover>
              <PopoverTrigger className="cursor-pointer" asChild>
                <Button
                  variant="outline"
                  className="w-full pl-3 text-left font-normal bg-[#080d1a]/50 border-white/10 hover:border-white/20 hover:bg-[#080d1a]/80 text-slate-300 hover:text-white rounded-xl h-11">
                  {date ? format(date, "PPP") : <span className="text-slate-500">Pick a date</span>}
                  <CalendarIcon className="ml-auto w-4 h-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="bg-[#121212] border border-white/10 p-0 rounded-xl" align="start">
                <Calendar
                  className="cursor-pointer text-white"
                  mode="single"
                  selected={date}
                  onSelect={(date) => setValue("date", date)}
                  disabled={(date) =>
                    date > new Date() || date < new Date("1900-01-01")
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            {errors.date && (
              <p className="text-sm text-red-400">{errors.date.message}</p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">Description</label>
            <Input 
              placeholder="Enter Description" 
              className="bg-[#080d1a]/50 border-white/10 hover:border-white/20 text-white rounded-xl h-11 focus:ring-1 focus:ring-white/20 focus:border-white/20"
              {...register("description")} 
            />
            {errors.description && (
              <p className="text-sm text-red-400">{errors.description.message}</p>
            )}
          </div>

          {/* Recurring Transaction Switch */}
          <div className="flex items-center justify-between rounded-xl p-4 border border-purple-500/20 bg-purple-500/5 shadow-[0_0_15px_rgba(139,92,246,0.05)]">
            <div className="space-y-1">
              <label
                htmlFor="isRecurring"
                className="text-sm font-semibold text-white cursor-pointer">
                Recurring Transaction
              </label>
              <p className="text-xs text-slate-400">
                Set up recurring schedule for this transaction automatically.
              </p>
            </div>
            <Switch
              checked={isRecurring}
              onCheckedChange={(checked) => setValue("isRecurring", checked)}
              className="cursor-pointer"
            />
          </div>

          {isRecurring && (
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">Recurring Interval</label>
              <Select
                onValueChange={(value) => setValue("recurringInterval", value)}
                defaultValue={getValues("recurringInterval")}>
                <SelectTrigger className="cursor-pointer w-full bg-[#080d1a]/50 border-white/10 hover:border-white/20 text-white rounded-xl h-11 focus:ring-1 focus:ring-white/20 focus:border-white/20">
                  <SelectValue placeholder="Select Interval" />
                </SelectTrigger>
                <SelectContent className="bg-[#121212] border border-white/10 text-slate-200">
                  <SelectItem value="DAILY" className="cursor-pointer">Daily</SelectItem>
                  <SelectItem value="WEEKLY" className="cursor-pointer">Weekly</SelectItem>
                  <SelectItem value="MONTHLY" className="cursor-pointer">Monthly</SelectItem>
                  <SelectItem value="YEARLY" className="cursor-pointer">Yearly</SelectItem>
                </SelectContent>
              </Select>
              {errors.recurringInterval && (
                <p className="text-sm text-red-400">
                  {errors.recurringInterval.message}
                </p>
              )}
            </div>
          )}

          {/* Submit or Cancel */}
          <div className="grid gap-6 md:grid-cols-2 pt-2">
            <Button
              type="button"
              variant="outline"
              className="cursor-pointer border-white/10 text-slate-300 hover:text-white hover:bg-white/5 hover:border-white/20 transition-all rounded-xl h-11"
              onClick={() => router.back()}>
              Cancel
            </Button>
            <Button
              type="submit"
              className="cursor-pointer btn-shimmer gap-2 text-sm font-bold h-11 rounded-xl border-0 bg-gradient-to-r from-purple-600 to-indigo-500 text-white shadow-[0_0_20px_rgba(139,92,246,0.35)] hover:shadow-[0_0_35px_rgba(139,92,246,0.55)] transition-all duration-300"
              disabled={transactionLoading}>
              {transactionLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {editMode ? "Updating..." : "Creating..."}
                </>
              ) : editMode ? (
                "Update Transaction"
              ) : (
                "Create Transaction"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransactionForm;
