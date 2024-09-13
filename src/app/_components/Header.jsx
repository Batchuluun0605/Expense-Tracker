"use client";
import { Button } from "../../components/ui/button";
import { UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header = () => {
  const { isSignedIn } = useUser();
  return (
    <div className="p-5 flex justify-between items-center border shadow-sm">
      <div className="flex flex-row items-center">
        <Image src={"/chart-donut.svg"} alt="logo" width={40} height={25} />
        <span className="text-blue-800 font-bold text-xl">FinanSmart</span>
      </div>
      <div>
        {isSignedIn ? (
          <UserButton />
        ) : (
          <div className="flex gap-3 items-center">
            <Link href="/dashboard">
              <Button variant="outline" className="rounded-full">
                Dashboard
              </Button>
            </Link>
            <Link href="/sign-in">
              <Button className="rounded-full">Get started</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
