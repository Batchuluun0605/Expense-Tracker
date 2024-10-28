import { currentUser } from "@clerk/nextjs/server";
import React, { ReactNode } from "react";

async function layout({ children }: { children: ReactNode }) {
  const user = await currentUser();
  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center">
      {children}
    </div>
  );
}

export default layout;
