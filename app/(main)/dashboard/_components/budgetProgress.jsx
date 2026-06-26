"use client";

import { updateBudget } from "@/actions/budget";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import useFetch from "@/hooks/useFetch";
import { Check, Pencil, Target, X } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const BudgetProgress = ({ initialBudget, currentExpenses }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newBudget, setnewBudget] = useState(
    initialBudget?.amount?.toString() || ""
  );

  const percentageUsed = initialBudget
    ? (currentExpenses / initialBudget.amount) * 100
    : 0;

  const { loading: isLoading, fn: updateBudgetFn, data: updatedBudget, error } =
    useFetch(updateBudget);

  const handleUpdateBudget = async () => {
    const amount = parseFloat(newBudget);
    if (isNaN(amount) || amount <= 0) {
      toast.error("Please enter a valid budget amount.");
      return;
    }
    await updateBudgetFn(amount);
  };

  useEffect(() => {
    if (updatedBudget?.success) {
      setIsEditing(false);
      toast.success("Budget updated successfully");
    }
  }, [updatedBudget]);

  useEffect(() => {
    if (error) toast.error("Error updating budget: " || error.message);
  }, [error]);

  const handleCancel = () => {
    setnewBudget(initialBudget?.amount?.toString() || "");
    setIsEditing(false);
  };

  // Color config — all Tailwind, no .progress-glow-* CSS class
  const config =
    percentageUsed >= 90
      ? { bar: "bg-rose-500", shadow: "shadow-[0_0_12px_rgba(244,63,94,0.6)]", text: "text-rose-400", badge: "bg-rose-500/10 border-rose-500/30 text-rose-400", label: "Critical" }
      : percentageUsed >= 75
      ? { bar: "bg-amber-400", shadow: "shadow-[0_0_12px_rgba(245,158,11,0.6)]", text: "text-amber-400", badge: "bg-amber-500/10 border-amber-500/30 text-amber-400", label: "High" }
      : { bar: "bg-emerald-500", shadow: "shadow-[0_0_12px_rgba(16,185,129,0.6)]", text: "text-emerald-400", badge: "bg-emerald-500/10 border-emerald-500/30 text-emerald-400", label: "On Track" };

  const remaining = initialBudget
    ? Math.max(0, initialBudget.amount - currentExpenses)
    : 0;

  return (
    <div className="rounded-2xl p-6 border border-white/5 bg-neutral-900/40 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.55)] hover:border-white/20 transition-all duration-300">

      {/* Header */}
      <div className="flex items-start justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/5 border border-white/10">
            <Target size={18} className="text-white" />
          </div>
          <div>
            <div className="text-white font-semibold text-sm">Monthly Budget</div>
            <div className="text-slate-500 text-xs">Default Account</div>
          </div>
        </div>
        {initialBudget && (
          <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${config.badge}`}>
            {config.label}
          </span>
        )}
      </div>

      {/* Budget row */}
      <div className="flex items-center gap-2 mb-5">
        {isEditing ? (
          <div className="flex items-center gap-2 flex-1">
            <Input
              type="number"
              value={newBudget}
              onChange={(e) => setnewBudget(e.target.value)}
              className="w-40 text-white bg-white/5 border-white/10 focus:border-white/20"
              placeholder="Enter budget"
              autoFocus
              disabled={isLoading}
            />
            <Button variant="ghost" size="icon" onClick={handleUpdateBudget} disabled={isLoading}
                    className="h-8 w-8 cursor-pointer hover:bg-emerald-500/10">
              <Check className="h-4 w-4 text-emerald-400" />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleCancel} disabled={isLoading}
                    className="h-8 w-8 cursor-pointer hover:bg-rose-500/10">
              <X className="h-4 w-4 text-rose-400" />
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-2 flex-1">
            <div className="text-slate-400 text-sm">
              {initialBudget ? (
                <>
                  <span className="text-rose-400 font-semibold">₹{currentExpenses.toFixed(2)}</span>
                  {" "}of{" "}
                  <span className="text-white font-semibold">₹{initialBudget.amount.toFixed(2)}</span>
                  {" "}spent
                </>
              ) : (
                <span className="text-slate-500">No budget set</span>
              )}
            </div>
            <Button variant="ghost" size="icon" onClick={() => setIsEditing(true)}
                    className="h-6 w-6 cursor-pointer hover:bg-white/5 ml-1">
              <Pencil className="h-3 w-3 text-slate-400" />
            </Button>
          </div>
        )}
      </div>

      {/* Progress bar — glow via Tailwind shadow utility */}
      {initialBudget && (
        <div className="space-y-3">
          <div className="relative h-2 rounded-full overflow-hidden bg-white/7">
            <div
              className={`h-full rounded-full transition-all duration-1000 ${config.bar} ${config.shadow}`}
              style={{ width: `${Math.min(percentageUsed, 100)}%` }}
            />
          </div>
          <div className="flex justify-between text-xs">
            <span className={`font-medium ${config.text}`}>
              {percentageUsed.toFixed(1)}% used
            </span>
            <span className="text-slate-500">₹{remaining.toFixed(2)} remaining</span>
          </div>
        </div>
      )}

      {!initialBudget && (
        <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)}
                className="text-white hover:text-white hover:bg-white/10 bg-white/5 px-4 py-2 rounded-xl transition-all duration-300 text-xs cursor-pointer mt-1">
          + Set a budget
        </Button>
      )}
    </div>
  );
};

export default BudgetProgress;
