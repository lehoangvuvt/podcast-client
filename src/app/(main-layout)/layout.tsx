"use client";

import RoutesHandler from "@/components/RoutesHandler";
import UserInfoButton from "@/components/UserInfoButton";
import useCustomRouter from "@/hooks/useCustomRouter";
import { twMerge } from "tailwind-merge";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const sectionDivClass = twMerge("bg-[#121212]", "rounded-[8px]");

  return (
    <div
      style={{
        height: "calc(100% - 100px)",
      }}
      className={twMerge(
        "absolute",
        "w-[100%]",
        "bg-[#000000]",
        "flex flex-row gap-[10px]",
        "p-[8px]"
      )}
    >
      <div className={twMerge(sectionDivClass, "w-[18%]", "h-[100%]")}>123</div>
      <div
        className={twMerge(
          sectionDivClass,
          "w-[82%]",
          "overflow-y-auto",
          "overflow-x-hidden",
          "flex flex-col",
          "relative",
          "items-start",
          "justify-start"
        )}
      >
        <div
          style={{
            backgroundColor: "#121212",
            backgroundImage:
              "linear-gradient(to left, #121212, rgba(255,255,255,0.05))",
          }}
          className={twMerge(
            "w-[100%]",
            "sticky z-[100]",
            "top-[0px]",
            "flex flex-row",
            "justify-between",
            "pt-[10px]",
            "pr-[15px]"
          )}
        >
          <RoutesHandler />
          <UserInfoButton />
        </div>
        {children}
      </div>
    </div>
  );
}
