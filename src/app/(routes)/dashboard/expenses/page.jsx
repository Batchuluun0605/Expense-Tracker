"use client";
import React, { useEffect, useState } from "react";
import ExpenseListTable from "./_components/ExpenseListTable";
import { useUser } from "@clerk/nextjs";

function ExpensesScreen() {
  const [expensesList, setExpensesList] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    user && getAllExpenses();
  }, [user]);
  const getAllExpenses = async () => {};
  return (
    <div className="p-10">
      <h2 className="font-bold text-3xl">My Expenses</h2>

      <ExpenseListTable
        refreshData={() => getAllExpenses()}
        expensesList={expensesList}
      />
    </div>
  );
}

export default ExpensesScreen;
