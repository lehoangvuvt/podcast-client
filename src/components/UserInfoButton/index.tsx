"use client";

import useAuth from "@/hooks/useAuth";
import useCustomRouter from "@/hooks/useCustomRouter";
import { twMerge } from "tailwind-merge";

const UserInfoButton = () => {
  const { user, isLoading } = useAuth();
  const { pushRouteWithHistory } = useCustomRouter();

  return isLoading ? null : user?.userInfo ? (
    <div
      onClick={() => pushRouteWithHistory("/me")}
      className={twMerge(
        "rounded-full",
        "w-[30px] h-[30px] bg-[white]",
        "cursor-pointer"
      )}
    />
  ) : (
    <h1 className="text-[white]">Not</h1>
  );
};

export default UserInfoButton;
