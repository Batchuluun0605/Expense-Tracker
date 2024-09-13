"use client";
import React, { useEffect, useState } from "react";
import CreateIncomes from "./CreateIncomes";
import { useUser } from "@clerk/nextjs";
import IncomeItem from "./IncomeItem";

import { useCookies } from "react-cookie";

function IncomeList() {
  const [incomelist, setIncomeList] = useState([]);
  const [cookies, setCookie] = useCookies(["incomes"]);

  const { user } = useUser();
  useEffect(() => {
    user && getIncomelist();
  }, [user]);

  const getIncomelist = () => {
    setIncomeList(cookies.incomes);
  };
  console.log(cookies, "coocke");
  return (
    <div className="mt-7">
      <div
        className="grid grid-cols-1
        md:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        <CreateIncomes refreshData={() => getIncomelist()} />
        {incomelist?.length > 0
          ? incomelist.map((budget, index) => (
              <IncomeItem budget={budget} key={index} />
            ))
          : [1, 2, 3, 4, 5].map((item, index) => (
              <div
                key={index}
                className="w-full bg-slate-200 rounded-lg
        h-[150px] animate-pulse"
              ></div>
            ))}
      </div>
    </div>
  );
}

export default IncomeList;
