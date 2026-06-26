"use client";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AccountSchema } from "@/app/lib/schema";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Switch } from "./ui/switch";
import { Button } from "./ui/button";
import useFetch from "@/hooks/useFetch";
import { createAccount } from "@/actions/dashboard";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const AccountDrawer = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm({
    resolver: zodResolver(AccountSchema),
    defaultValues: {
      name: "",
      type: "CURRENT",
      balance: "",
      isDefault: false,
    },
  });

  const {
    data: newAccount,
    loading: createAccountLoading,
    error,
    fn: createAccountFn,
  } = useFetch(createAccount);

  useEffect(() => {
    if (newAccount && !createAccountLoading) {
      toast.success("Account created successfully");
      setIsOpen(false);
      reset();
    }
  }, [createAccountLoading, newAccount, reset]);

  useEffect(() => {
    if (error) {
      toast.error("Error creating account: " || error.message);
      setIsOpen(false);
    }
  }, [error]);

  const onSubmit = async (data) => {
    await createAccountFn(data);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-md border border-white/5 bg-neutral-900/95 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] text-white rounded-2xl p-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white text-left">Create New Account</DialogTitle>
        </DialogHeader>

        <form className="space-y-6 mt-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <label htmlFor="name" className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Account Name
            </label>
            <Input
              id="name"
              placeholder="e.g. Checking"
              className="bg-[#080d1a]/50 border-white/10 hover:border-white/20 text-white rounded-xl h-11 focus:ring-1 focus:ring-white/20 focus:border-white/20"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-sm text-red-400">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="type" className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Account Type
            </label>
            <Select
              onValueChange={(value) => setValue("type", value)}
              defaultValue={watch("type")}>
              <SelectTrigger id="type" className="w-full bg-[#080d1a]/50 border-white/10 hover:border-white/20 text-white rounded-xl h-11 focus:ring-1 focus:ring-white/20 focus:border-white/20">
                <SelectValue placeholder="Select Account Type" />
              </SelectTrigger>
              <SelectContent className="bg-[#121212] border border-white/10 text-slate-200">
                <SelectItem value="CURRENT" className="cursor-pointer">Current</SelectItem>
                <SelectItem value="SAVINGS" className="cursor-pointer">Savings</SelectItem>
              </SelectContent>
            </Select>
            {errors.type && (
              <p className="text-sm text-red-400">{errors.type.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="balance" className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Initial Balance
            </label>
            <Input
              id="balance"
              type="number"
              step="1"
              placeholder="e.g. 1000.00"
              className="bg-[#080d1a]/50 border-white/10 hover:border-white/20 text-white rounded-xl h-11 focus:ring-1 focus:ring-white/20 focus:border-white/20"
              {...register("balance")}
            />
            {errors.balance && (
              <p className="text-sm text-red-400">
                {errors.balance.message}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between rounded-xl p-4 border border-white/5 bg-white/3">
            <div className="space-y-1">
              <label
                htmlFor="isDefault"
                className="text-sm font-semibold text-white cursor-pointer">
                Set as Default Account
              </label>
              <p className="text-xs text-slate-400">
                This Account will be selected by default for transactions
              </p>
            </div>
            <Switch
              id="isDefault"
              onCheckedChange={(checked) => setValue("isDefault", checked)}
              checked={watch("isDefault")}
              className="cursor-pointer"
            />
          </div>

          <div className="flex gap-4 pt-2">
            <DialogClose asChild>
              <Button type="button" variant="outline" className="flex-1 cursor-pointer border-white/10 text-slate-300 hover:text-white hover:bg-white/5 hover:border-white/20 transition-all rounded-xl h-11">
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              className="flex-1 cursor-pointer btn-shimmer gap-2 text-sm font-bold h-11 rounded-xl border-0 bg-gradient-to-r from-purple-600 to-indigo-500 text-white shadow-[0_0_20px_rgba(139,92,246,0.35)] hover:shadow-[0_0_35px_rgba(139,92,246,0.55)] transition-all duration-300"
              disabled={createAccountLoading}>
              {createAccountLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Account"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AccountDrawer;
