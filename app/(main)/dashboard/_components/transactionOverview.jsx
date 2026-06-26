"use client";

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { format } from "date-fns/format";
import { ArrowDownRight, ArrowUpRight, TrendingUp } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  Label,
} from "recharts";
import { categoryColors } from "@/data/categories";

const COLORS = [
  "#FF6B6B",
  "#4ECDC4",
  "#45B7D1",
  "#96CEB4",
  "#FFEEAD",
  "#D4A5A5",
  "#9FA8DA",
];

const DashboardOverview = ({ accounts, transactions }) => {
  const [selectedAccountId, setSelectedAccountId] = useState(
    accounts.find((a) => a.isDefault)?.id || accounts[0]?.id
  );
  const [chartDimensions, setChartDimensions] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 1200,
    outerRadius: 80,
    showLabels: true,
    height: 300,
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setChartDimensions({
        width,
        outerRadius: width < 480 ? 50 : width < 768 ? 60 : 80,
        showLabels: width >= 768,
        height: width < 480 ? 250 : width < 768 ? 280 : 300,
      });
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const accountTransactions = useMemo(() => {
    return transactions.filter((tx) => tx.accountId === selectedAccountId);
  }, [transactions, selectedAccountId]);

  const recentTransactions = useMemo(() => {
    return [...accountTransactions]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 5);
  }, [accountTransactions]);

  const currentDate = new Date();
  const currentMonthExpenses = useMemo(() => {
    return accountTransactions.filter((t) => {
      const transactionDate = new Date(t.date);
      return (
        t.type === "EXPENSE" &&
        transactionDate.getMonth() === currentDate.getMonth() &&
        transactionDate.getFullYear() === currentDate.getFullYear()
      );
    });
  }, [accountTransactions, currentDate.getMonth(), currentDate.getFullYear()]);

  // Group expenses by category
  const expensesByCategory = useMemo(() => {
    return currentMonthExpenses.reduce((acc, transaction) => {
      const category = transaction.category;
      if (!acc[category]) {
        acc[category] = 0;
      }
      acc[category] += transaction.amount;
      return acc;
    }, {});
  }, [currentMonthExpenses]);

  // Format data for pie chart
  const pieChartData = useMemo(() => {
    return Object.entries(expensesByCategory).map(
      ([category, amount]) => ({
        name: category,
        value: amount,
      })
    );
  }, [expensesByCategory]);

  const topExpenseCategory = useMemo(() => {
    if (pieChartData.length === 0) return null;
    const sorted = [...pieChartData].sort((a, b) => b.value - a.value);
    return sorted[0];
  }, [pieChartData]);

  const customLabel = ({ cx, cy, midAngle, outerRadius, name, value }) => {
    if (!chartDimensions.showLabels) return null;

    const RADIAN = Math.PI / 180;
    const radius = outerRadius + 20;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);

    return (
      <text
        x={x}
        y={y}
        fill="rgba(255,255,255,0.7)"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        className="text-[10px] sm:text-xs font-semibold">
        {`${capitalizedName}: ₹${value.toFixed(0)}`}
      </text>
    );
  };

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader
          className="pb-4 flex flex-col sm:flex-row justify-between sm:items-center gap-4 sm:gap-0"
        >
          <CardTitle className="text-base font-bold text-white">
            Recent Transactions
          </CardTitle>
          <Select
            value={selectedAccountId}
            onValueChange={setSelectedAccountId}>
            <SelectTrigger className="w-[140px] h-9 text-xs">
              <SelectValue placeholder="Select Account" />
            </SelectTrigger>
            <SelectContent className="bg-[#121212] border-white/10 text-slate-200">
              {accounts.map((account) => (
                <SelectItem
                  value={account.id}
                  key={account.id}
                  className={"cursor-pointer text-xs"}>
                  {account.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentTransactions.length === 0 ? (
              <p className="text-center text-muted-foreground py-4 text-sm">
                No Recent Transactions
              </p>
            ) : (
              recentTransactions.map((transaction) => {
                return (
                  <div
                    className="flex items-center justify-between border-b border-white/5 pb-3 last:border-0 last:pb-0"
                    key={transaction.id}>
                    <div className="space-y-1">
                      <p className="text-sm font-semibold text-slate-200">
                        {transaction.description || "Untitled Transaction"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {format(new Date(transaction.date), "PP")}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div
                        className={cn(
                          "flex items-center text-sm font-bold",
                          transaction.type === "EXPENSE"
                            ? "text-rose-400"
                            : "text-emerald-400"
                        )}>
                        {transaction.type === "EXPENSE" ? (
                          <ArrowDownRight className="mr-0.5 h-4 w-4" />
                        ) : (
                          <ArrowUpRight className="mr-0.5 h-4 w-4" />
                        )}
                        ₹{transaction.amount.toFixed(2)}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="flex flex-col">
        <CardHeader>
          <CardTitle className={"text-base font-bold text-white"}>
            Monthly Expense Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent className={"p-0 pb-5 flex-1"}>
          {pieChartData.length === 0 ? (
            <p className="text-center text-muted-foreground py-4 text-sm">
              No expenses this month
            </p>
          ) : (
            <>
              <div style={{ height: `${chartDimensions.height}px` }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieChartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={chartDimensions.outerRadius * 0.65}
                      outerRadius={chartDimensions.outerRadius}
                      paddingAngle={4}
                      cornerRadius={6}
                      stroke="#030209"
                      strokeWidth={2}
                      dataKey="value"
                      nameKey="name"
                      label={chartDimensions.showLabels ? customLabel : false}
                      labelLine={chartDimensions.showLabels}>
                      <Label
                        position="center"
                        content={(props) => {
                          const { cx, cy } = props.viewBox || {};
                          if (!cx || !cy) return null;
                          return (
                            <g>
                              <text
                                x={cx}
                                y={cy - 8}
                                textAnchor="middle"
                                dominantBaseline="middle"
                                className="fill-slate-500 text-[10px] uppercase font-bold tracking-wider"
                              >
                                Total Spent
                              </text>
                              <text
                                x={cx}
                                y={cy + 12}
                                textAnchor="middle"
                                dominantBaseline="middle"
                                className="fill-white font-black text-sm sm:text-base"
                              >
                                ₹{pieChartData.reduce((acc, curr) => acc + curr.value, 0).toLocaleString("en-IN", { maximumFractionDigits: 0 })}
                              </text>
                            </g>
                          );
                        }}
                      />
                      {pieChartData.map((entry, index) => {
                        const color = categoryColors[entry.name] || COLORS[index % COLORS.length];
                        return (
                          <Cell
                            key={`cell-${index}`}
                            fill={color}
                          />
                        );
                      })}
                    </Pie>
                    <Tooltip
                      formatter={(value) => `₹${parseFloat(value).toLocaleString("en-IN", { minimumFractionDigits: 2 })}`}
                      contentStyle={{
                        backgroundColor: "#121212",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: "12px",
                      }}
                      itemStyle={{ color: "#ffffff" }}
                      labelStyle={{ color: "rgba(255,255,255,0.5)" }}
                    />
                    <Legend
                      wrapperStyle={{
                        fontSize: chartDimensions.width < 480 ? "11px" : "12px",
                        paddingTop: "10px",
                      }}
                      iconType="circle"
                      iconSize={8}
                      formatter={(value) => (
                        <span className="text-slate-400 font-medium capitalize">
                          {value}
                        </span>
                      )}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Mobile Summary Cards */}
              {chartDimensions.width < 768 && (
                <div className="px-6 mt-4 space-y-2 max-h-48 overflow-y-auto">
                  {pieChartData.map((item, index) => {
                    const color = categoryColors[item.name] || COLORS[index % COLORS.length];
                    return (
                      <div
                        key={item.name}
                        className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{
                              backgroundColor: color,
                            }}
                          />
                          <span className="text-sm font-semibold capitalize text-slate-300">
                            {item.name}
                          </span>
                        </div>
                        <span className="text-sm font-bold text-white">
                          ₹{item.value.toFixed(2)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </CardContent>
        {topExpenseCategory && (
          <CardFooter className="flex flex-col gap-2 text-sm pt-0 pb-6 border-t border-white/5 mt-auto">
            <div className="flex items-center gap-2 font-semibold text-slate-300 mt-4">
              Top spending category: <span className="text-white capitalize font-bold">{topExpenseCategory.name}</span>
              <TrendingUp className="h-4 w-4 text-emerald-400" />
            </div>
            <div className="leading-none text-slate-500 text-xs">
              Accumulated ₹{topExpenseCategory.value.toLocaleString("en-IN")} in {topExpenseCategory.name} this month
            </div>
          </CardFooter>
        )}
      </Card>
    </div>
  );
};

export default DashboardOverview;
