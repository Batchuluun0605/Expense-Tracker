"use client";
import React, { useEffect } from "react";
import { db } from "../../../../utils/dbConfig";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Budgets } from "../../../../utils/schema";
import SideNav from "./_components/SideNav";
import DashboardHeader from "./_components/DashboardHeader";
const layout = ({ children }) => {
  const { user } = useUser();
  const router = useRouter();

  return (
    <div>
      <div className="fixed md:w-64 hidden md:block">
        <SideNav />
      </div>
      <div className="md:ml-64">
        <DashboardHeader />
        {children}
      </div>
    </div>
  );
};

export default layout;
