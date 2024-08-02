"use client";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import CardInfo from "./_components/CardInfo";
import BarChartDashboard from "./_components/BarChartDashboard";

import { Budgets, Expenses } from "../../../../utils/schema";
import BudgetItem from "./budgets/_components/BudgetItem";
import { useCookies } from "react-cookie";

const Dashboard = () => {
  const { user } = useUser();
  const [budgetList, setBudgetList] = useState([]);
  const [incomeList, setIncomeList] = useState([]);
  const [expenseList, setExpenseList] = useState([]);
  const [cookies, setco] = useCookies(["budgets"]);
  useEffect(() => {
    user && getBudgetList();
  }, [user]);
  const getBudgetList = () => {
    setBudgetList(cookies.budgets);
  };
  return (
    <div className="p-8">
      <h2 className="font-bold text-4xl">Hi, {user?.fullName}</h2>
      <p className="text-gray-500">
        Here's what happening with your money. Lets manage your expenses
      </p>
      <CardInfo budgetList={budgetList} incomeList={incomeList} />
      <div className="grid grid-cols-1 lg:grid-cols-3 mt-6 gap-5">
        <div className="lg:col-span-2">
          <BarChartDashboard budgetList={budgetList} />

          {/* <ExpenseListTable
            expensesList={expensesList}
            refreshData={() => getBudgetList()}
          /> */}
        </div>
        <div className="grid gap-5">
          <h2 className="font-bold text-lg">Latest Budgets</h2>
          {budgetList?.length > 0
            ? budgetList.map((budget, index) => (
                <BudgetItem budget={budget} key={index} />
              ))
            : [1, 2, 3, 4].map((item, index) => (
                <div
                  className="h-[180xp] w-full
                 bg-slate-200 rounded-lg animate-pulse"
                ></div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
