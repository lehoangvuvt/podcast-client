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

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const sectionDivClass = twMerge("bg-[#121212]", "rounded-[8px]");
  const { pushRouteWithHistory } = useCustomRouter();
  const pathName = usePathname();
  const userSlice = useSelector((state: State) => state.user);
  const baseHeaderLinkClass = twMerge(
    "flex flex-row items-center gap-[20px]",
    "text-[15px] font-semibold",
    "cursor-pointer"
  );

  return (
    <Suspense>
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
        <div className="w-[28%] h-[100%] flex flex-col gap-[10px]">
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
              onClick={() => pushRouteWithHistory("/home")}
              style={{
                color: pathName === "/home" ? "white" : "rgba(255,255,255,0.7)",
              }}
              className={baseHeaderLinkClass}
            >
              <HomeOutlinedIcon
                style={{ fontSize: "26px" }}
                fontSize="inherit"
              />
              Home
            </div>
            <div
              onClick={() => pushRouteWithHistory("/search")}
              style={{
                color:
                  pathName === "/search" ? "white" : "rgba(255,255,255,0.7)",
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
                "py-[20px]"
              )}
            >
              <div
                className={twMerge(
                  "w-full",
                  "text-[rgba(255,255,255,0.6)] font-bold",
                  "text-[16px]",
                  "flex items-center gap-[10px]"
                )}
              >
                <BookmarksIcon
                  fontSize="inherit"
                  style={{ fontSize: "24px" }}
                />
                Library
              </div>
              <div className="w-full flex-1 flex flex-col">
                <div
                  style={{
                    background:
                      pathName === "/home/favourites/episodes"
                        ? "rgba(255,255,255,0.1"
                        : "transparent",
                  }}
                  className={twMerge(
                    "w-full",
                    "cursor-pointer",
                    "py-[10px] px-[15px]",
                    "rounded-sm",
                    "flex flex-col justify-center gap-[2px]"
                  )}
                  onClick={() =>
                    pushRouteWithHistory("/home/favourites/episodes")
                  }
                >
                  <div
                    className={twMerge(
                      "w-full",
                      "text-[rgba(255,255,255,0.9)] font-semibold text-[15px]"
                    )}
                  >
                    Favourite episodes
                  </div>
                  <div
                    className={twMerge(
                      "w-full",
                      "text-[rgba(255,255,255,0.5)] font-medium text-[15px]"
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
            "w-[72%]",
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
        <div className="fixed bottom-0 left-0 z-[100] w-full h-[100px] bg-[#000000] flex items-center justify-center">
          <MyAudioPlayer />
        </div>
      </div>
    </Suspense>
  );
}
