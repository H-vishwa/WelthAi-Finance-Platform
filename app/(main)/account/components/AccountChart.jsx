"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { endOfDay } from "date-fns/endOfDay";
import { format } from "date-fns/format";
import { startOfDay } from "date-fns/startOfDay";
import { subDays } from "date-fns/subDays";
import { useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const DATE_RANGES = {
  "7D": { days: 7, label: "Last 7 Days" },
  "1M": { days: 30, label: "Last 1 Month" },
  "3M": { days: 90, label: "Last 3 Months" },
  "6M": { days: 180, label: "Last 6 Months" },
  ALL: { days: null, label: "All Time" },
};

const AccountChart = ({ transactions }) => {
  const [dateRange, setDateRange] = useState("1M");
  const [showIncome, setShowIncome] = useState(true);
  const [showExpense, setShowExpense] = useState(true);

  const filteredData = useMemo(() => {
    const range = DATE_RANGES[dateRange];
    const now = new Date();
    const startDate = range.days
      ? startOfDay(subDays(now, range.days))
      : startOfDay(new Date(0));

    const filtered = transactions.filter(
      (txn) =>
        new Date(txn.date) >= startDate && new Date(txn.date) <= endOfDay(now)
    );

    const grouped = filtered.reduce((acc, txn) => {
      const date = format(new Date(txn.date), "MMM dd");

      if (!acc[date]) {
        acc[date] = { date, income: 0, expense: 0 };
      }

      if (txn.type === "INCOME") {
        acc[date].income += txn.amount;
      } else {
        acc[date].expense += txn.amount;
      }
      return acc;
    }, {});

    return Object.values(grouped).sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );
  }, [transactions, dateRange]);

  const totals = useMemo(() => {
    return filteredData.reduce(
      (acc, day) => ({
        income: acc.income + day.income,
        expense: acc.expense + day.expense,
      }),
      { income: 0, expense: 0 }
    );
  }, [filteredData]);

  return (
    <Card className="py-0">
      <CardHeader className="flex flex-col items-stretch border-b border-white/5 p-0! sm:flex-row justify-between">
        <div className="flex flex-1 flex-col justify-center gap-2 px-6 py-5">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-bold text-white">
              Transaction Overview
            </CardTitle>
            <div className="sm:hidden">
              <Select defaultValue={dateRange} onValueChange={setDateRange}>
                <SelectTrigger className="w-[120px] h-9 text-xs">
                  <SelectValue placeholder="Select range" />
                </SelectTrigger>
                <SelectContent className="bg-[#121212] border-white/10 text-slate-200">
                  {Object.entries(DATE_RANGES).map(([key, { label }]) => (
                    <SelectItem key={key} value={key} className="text-xs">
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <CardDescription className="text-xs text-slate-500">
            Click on a tab below to toggle visible metrics on the chart
          </CardDescription>
        </div>

        {/* Date Selector for larger screens */}
        <div className="hidden sm:flex items-center px-4 border-l border-white/5">
          <Select defaultValue={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-[130px] h-9 text-xs">
              <SelectValue placeholder="Select range" />
            </SelectTrigger>
            <SelectContent className="bg-[#121212] border-white/10 text-slate-200">
              {Object.entries(DATE_RANGES).map(([key, { label }]) => (
                <SelectItem key={key} value={key} className="text-xs">
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Interactive buttons acting as toggles */}
        <div className="flex border-t border-white/5 sm:border-t-0 sm:border-l border-white/5">
          {["income", "expense"].map((key) => {
            const chart = key;
            const isVisible = chart === "income" ? showIncome : showExpense;
            return (
              <button
                key={chart}
                onClick={() => {
                  if (chart === "income") {
                    if (showIncome && !showExpense) {
                      setShowExpense(true); // Don't allow turning off both
                    }
                    setShowIncome(!showIncome);
                  } else {
                    if (showExpense && !showIncome) {
                      setShowIncome(true); // Don't allow turning off both
                    }
                    setShowExpense(!showExpense);
                  }
                }}
                className={`relative z-30 flex flex-1 flex-col justify-center gap-1.5 px-6 py-4 text-left sm:px-8 sm:py-5 border-r last:border-0 border-white/5 transition-all duration-300 cursor-pointer ${
                  isVisible
                    ? "bg-white/5 text-white"
                    : "opacity-35 text-slate-500 hover:bg-white/2 hover:opacity-55"
                }`}
              >
                <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-slate-500">
                  {chart === "income" ? "Total Income" : "Total Expenses"}
                </span>
                <span className={`text-base sm:text-2xl font-black leading-none transition-all ${
                  isVisible
                    ? chart === "income" ? "text-emerald-400" : "text-rose-400"
                    : "text-slate-600"
                }`}>
                  ₹{totals[chart].toLocaleString("en-IN", {
                    maximumFractionDigits: 2,
                  })}
                </span>
              </button>
            );
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6 pt-6">
        <div className="flex justify-between items-center px-4 mb-6 text-sm">
          <div>
            <span className="text-slate-500 font-medium">Net Flow: </span>
            <span className={`font-black text-base ${
              totals.income - totals.expense >= 0 ? "text-emerald-400" : "text-rose-400"
            }`}>
              ₹{(totals.income - totals.expense).toLocaleString("en-IN", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </div>
          <div className="text-xs text-slate-500">
            Showing transactions for {DATE_RANGES[dateRange].label}
          </div>
        </div>

        {filteredData.length === 0 ? (
          <div className="h-[200px] md:h-[300px] flex flex-col items-center justify-center border border-dashed border-white/10 rounded-2xl bg-neutral-900/40 backdrop-blur-md px-6 text-center">
            <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4 bg-white/5 border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.05)]">
              <Plus size={20} className="text-white" />
            </div>
            <p className="text-slate-300 font-semibold text-sm">No transactions found</p>
            <p className="text-slate-500 text-xs mt-1 max-w-[280px]">
              We couldn't find any transactions for the selected time range. Add one to see your breakdown.
            </p>
            <Link href="/transaction/create" className="mt-4">
              <Button
                size="sm"
                className="cursor-pointer btn-shimmer gap-1.5 text-xs font-semibold py-2 px-4 rounded-xl border-0 bg-gradient-to-r from-purple-600 to-indigo-500 text-white shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_35px_rgba(139,92,246,0.5)] transition-all duration-300"
              >
                Add Transaction
              </Button>
            </Link>
          </div>
        ) : (
          <div className="h-[250px] md:h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                className="w-full h-full"
                data={filteredData}
                margin={{
                  top: 10,
                  right: 10,
                  left: 10,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }}
                />
                <YAxis
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `₹${value}`}
                  tick={{ fill: "rgba(255,255,255,0.4)" }}
                />
                <Tooltip
                  cursor={{ fill: "rgba(255, 255, 255, 0.04)" }}
                  formatter={(value, name) => [
                    `₹${parseFloat(value).toLocaleString("en-IN", { minimumFractionDigits: 2 })}`,
                    name === "income" ? "Income" : "Expense"
                  ]}
                  contentStyle={{
                    backgroundColor: "#121212",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "12px",
                  }}
                  itemStyle={{
                    // Items list style
                  }}
                  labelStyle={{ color: "rgba(255, 255, 255, 0.5)", fontWeight: "600" }}
                />
                {showIncome && (
                  <Bar
                    dataKey="income"
                    name="income"
                    fill="#10b981"
                    radius={[4, 4, 0, 0]}
                    maxBarSize={30}
                  />
                )}
                {showExpense && (
                  <Bar
                    dataKey="expense"
                    name="expense"
                    fill="#f43f5e"
                    radius={[4, 4, 0, 0]}
                    maxBarSize={30}
                  />
                )}
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AccountChart;
