"use client";

import React from "react";
import TopNav from "./includes/TopNav";
import SideNavMain from "./includes/SideNavMain";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="bg-[#fff] h-[100vh]">
        <TopNav />
        <div className="flex justify-between mx-auto w-full px-2 max-w-[1140px]">
          <SideNavMain />
          {children}
        </div>
      </div>
    </>
  );
}
