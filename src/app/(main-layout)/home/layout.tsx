"use client";

import useCustomRouter from "@/hooks/useCustomRouter";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathName = usePathname();
  const { pushRouteWithHistory } = useCustomRouter();

  const headerItemClass = twMerge(
    "h-[32px]",
    "cursor-pointer",
    "flex",
    "items-center",
    "p-[10px]",
    "rounded-xl",
    "text-[13px]",
    "font-[500]"
  );

  return (
    <div className={twMerge("w-full h-auto", "flex flex-col flex-wrap")}>
      <div
        className={twMerge(
          "w-[100%] h-[65px]",
          "flex flex-col",
          "sticky",
          "z-[98]",
          "top-[55px]"
        )}
        style={{
          backgroundColor: "#121212",
          backgroundImage:
            "linear-gradient(to left, #121212, rgba(255,255,255,0.05))",
        }}
      >
        <div
          style={{
            display: "flex",
          }}
          className={twMerge("w-full h-[50px]", "flex-row gap-[10px] p-[15px]")}
        >
          <div
            onClick={() => pushRouteWithHistory("/home")}
            className={headerItemClass}
            style={{
              background: pathName === "/home" ? "white" : "#2e2e2e",
              color: pathName === "/home" ? "#2e2e2e" : "white",
            }}
          >
            Discover
          </div>
          <div
            onClick={() => pushRouteWithHistory("/home/genres")}
            className={headerItemClass}
            style={{
              background: pathName === "/home/genres" ? "white" : "#2e2e2e",
              color: pathName === "/home/genres" ? "#2e2e2e" : "white",
            }}
          >
            Genres
          </div>
          <div
            onClick={() => pushRouteWithHistory("/home/podcasts")}
            className={headerItemClass}
            style={{
              background: pathName === "/home/podcasts" ? "white" : "#2e2e2e",
              color: pathName === "/home/podcasts" ? "#2e2e2e" : "white",
            }}
          >
            Podcasts
          </div>
        </div>
      </div>
      <div className={twMerge("w-full", "mt-[40px]")}>{children}</div>
    </div>
  );
}
