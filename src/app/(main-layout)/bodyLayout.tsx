"use client";

import { routes } from "@/config/routes";
import useCustomRouter from "@/hooks/useCustomRouter";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";

export default function BodyLayout({
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
          "top-[55px]",
          "bg-white]"
        )}
      >
        <div
          className={twMerge(
            "w-full flex bg-[white] h-[50px]",
            "flex-row gap-[10px] p-[15px]"
          )}
        >
          <div
            onClick={() => pushRouteWithHistory(routes.HOME)}
            className={headerItemClass}
            style={{
              background: pathName !== routes.HOME ? "white" : "#2e2e2e",
              color: pathName !== routes.HOME ? "#2e2e2e" : "white",
            }}
          >
            Discover
          </div>
          <div
            onClick={() => pushRouteWithHistory(routes.GENRES)}
            className={headerItemClass}
            style={{
              background: pathName !== routes.GENRES ? "white" : "#2e2e2e",
              color: pathName !== routes.GENRES ? "#2e2e2e" : "white",
            }}
          >
            Genres
          </div>
          <div
            onClick={() => pushRouteWithHistory(routes.PODCASTS)}
            className={headerItemClass}
            style={{
              background: pathName !== routes.PODCASTS ? "white" : "#2e2e2e",
              color: pathName !== routes.PODCASTS ? "#2e2e2e" : "white",
            }}
          >
            Podcasts
          </div>
        </div>
      </div>
      <div className={twMerge("w-full", "pt-[20px]", "bg-[white]")}>
        {children}
      </div>
    </div>
  );
}
