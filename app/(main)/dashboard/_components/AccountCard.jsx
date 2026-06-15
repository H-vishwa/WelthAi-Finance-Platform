"use client";

import { updateDefaultAccount } from "@/actions/accounts";
import { Switch } from "@/components/ui/switch";
import useFetch from "@/hooks/useFetch";
import { ArrowDownRight, ArrowUpRight, Building2 } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { toast } from "sonner";

const AccountCard = ({ account }) => {
  const { name, type, balance, id, isDefault } = account;

  const {
    loading: updateDefaultLoading,
    fn: updateDefaultFn,
    data: updatedAccount,
    error,
  } = useFetch(updateDefaultAccount);

  const handleDefaultChange = async (event) => {
    event.preventDefault();
    if (isDefault) {
      toast.warning("At least one account must be default");
      return;
    }
    await updateDefaultFn(id);
  };

  useEffect(() => {
    if (updatedAccount?.success) {
      toast.success("Default account updated successfully");
    }
  }, [updatedAccount, updateDefaultLoading]);

  useEffect(() => {
    if (error) {
      toast.error("Error updating default account: " || error.message);
    }
  }, [error]);

  return (
    <div className="group relative rounded-2xl overflow-hidden border border-blue-500/10 bg-[#0d1426]/70 backdrop-blur-xl shadow-[0_4px_40px_rgba(0,0,0,0.4)] hover:border-blue-500/30 hover:shadow-[0_8px_60px_rgba(59,130,246,0.1)] hover:-translate-y-0.5 transition-all duration-300 min-h-[180px]">

      <Link href={`/account/${id}`} className="block p-6">
        {/* Card Header */}
        <div className="flex items-start justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br from-blue-500/20 to-cyan-500/15 border border-blue-500/20">
              <Building2 size={18} className="text-blue-400" />
            </div>
            <div>
              <div className="text-white font-semibold text-sm capitalize">{name}</div>
              <div className="text-slate-500 text-xs">
                {type.charAt(0) + type.slice(1).toLowerCase()} Account
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
            {isDefault ? (
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border border-blue-500/30 bg-blue-500/10 text-blue-400">
                Default
              </span>
            ) : (
              <Switch
                checked={isDefault}
                onClick={handleDefaultChange}
                disabled={updateDefaultLoading}
              />
            )}
          </div>
        </div>

        {/* Balance */}
        <div className="mb-5">
          <div className="text-3xl font-black text-white tracking-tight">
            ₹{parseFloat(balance).toLocaleString("en-IN", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </div>
          <div className="text-slate-500 text-xs mt-0.5">Current Balance</div>
        </div>

        {/* Badges — Tailwind only, no .badge-income/.badge-expense */}
        <div className="flex gap-3">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/25">
            <ArrowUpRight size={12} />
            Income
          </span>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-rose-500/15 text-rose-400 border border-rose-500/25">
            <ArrowDownRight size={12} />
            Expense
          </span>
        </div>
      </Link>

      {/* Bottom glow accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
    </div>
  );
};

export default AccountCard;
