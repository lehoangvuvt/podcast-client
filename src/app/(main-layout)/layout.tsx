"use client";

import RoutesHandler from "@/components/RoutesHandler";
import UserInfoButton from "@/components/UserInfoButton";
import { twMerge } from "tailwind-merge";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import useCustomRouter from "@/hooks/useCustomRouter";
import MyAudioPlayer from "@/components/AudioPlayer";
import { usePathname } from "next/navigation";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import { Suspense } from "react";
import AuthConditionalRenderWrapper from "@/middlewares/authConditionalRenderWrapper";
import { useSelector } from "react-redux";
import { State } from "@/redux/store";
import { routes } from "@/config/routes";
import BodyLayout from "./bodyLayout";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const sectionDivClass = twMerge("bg-[white]", "rounded-[8px]", "shadow-sm");
  const { pushRouteWithHistory } = useCustomRouter();
  const pathName = usePathname();
  const userSlice = useSelector((state: State) => state.user);
  const baseHeaderLinkClass = twMerge(
    "flex flex-row items-center gap-[20px]",
    "text-[15px] font-semibold",
    "cursor-pointer"
  );

  return (
    <div
      style={{
        height: "calc(100% - 100px)",
      }}
      className={twMerge(
        "absolute",
        "w-[100%]",
        "bg-[rgba(0,0,0,0.05)]",
        "flex flex-row gap-[10px]",
        "p-[8px]"
      )}
    >
      <div className="w-[20%] h-[100%] flex flex-col gap-[10px]">
        <div
          className={twMerge(
            sectionDivClass,
            "w-[100%]",
            "flex",
            "flex-col",
            "px-[15px]",
            "py-[20px]",
            "gap-[15px]"
          )}
        >
          <div
            onClick={() => pushRouteWithHistory("/")}
            style={{
              color: pathName === routes.HOME ? "#121212" : "rgba(0,0,0,0.6)",
            }}
            className={baseHeaderLinkClass}
          >
            <HomeOutlinedIcon style={{ fontSize: "26px" }} fontSize="inherit" />
            Home
          </div>
          <div
            onClick={() => pushRouteWithHistory(routes.SEARCH)}
            style={{
              color: pathName === routes.SEARCH ? "#121212" : "rgba(0,0,0,0.6)",
            }}
            className={baseHeaderLinkClass}
          >
            <SearchOutlinedIcon
              style={{ fontSize: "26px" }}
              fontSize="inherit"
            />
            Search
          </div>
        </div>
        <AuthConditionalRenderWrapper required>
          <div
            className={twMerge(
              sectionDivClass,
              "w-[100%]",
              "flex-1",
              "flex flex-col gap-[20px]",
              "px-[15px]",
              "py-[20px]",
              "bg-[white]"
            )}
          >
            <div
              className={twMerge(
                "w-full",
                "text-[rgba(0,0,0,0.7)] font-bold",
                "text-[16px]",
                "flex items-center gap-[10px]"
              )}
            >
              <BookmarksIcon fontSize="inherit" style={{ fontSize: "24px" }} />
              Library
            </div>
            <div className="w-full flex-1 flex flex-col">
              <div
                style={{
                  background:
                    pathName === routes.FAVOURITES.EPISODES
                      ? "rgba(0,0,0,0.06)"
                      : "transparent",
                }}
                className={twMerge(
                  "w-full",
                  "cursor-pointer",
                  "py-[10px] px-[15px]",
                  "rounded-sm",
                  "flex flex-col justify-center gap-[2px]"
                )}
                onClick={() => pushRouteWithHistory(routes.FAVOURITES.EPISODES)}
              >
                <div
                  className={twMerge(
                    "w-full",
                    "text-[#121212] font-semibold text-[15px]"
                  )}
                >
                  Favourite episodes
                </div>
                <div
                  className={twMerge(
                    "w-full",
                    "text-[rgba(0,0,0,0.6)] font-semibold text-[16px]"
                  )}
                >
                  {userSlice.favouriteItems?.favourite_episodes?.length ?? 0}{" "}
                  episodes
                </div>
              </div>
            </div>
          </div>
        </AuthConditionalRenderWrapper>
      </div>
      <div
        className={twMerge(
          sectionDivClass,
          "overflow-y-auto",
          "overflow-x-hidden",
          "flex flex-1 flex-col",
          "relative",
          "items-start",
          "justify-start"
        )}
      >
        <div
          className={twMerge(
            "w-[100%]",
            "bg-[white]",
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
        <Suspense fallback={<h1>Loading...</h1>}>
          <BodyLayout>{children}</BodyLayout>
        </Suspense>
      </div>
      <div className="fixed bottom-0 left-0 z-[100] w-full h-[100px] bg-[#000000] flex items-center justify-center">
        <MyAudioPlayer />
      </div>
    </div>
  );
}
