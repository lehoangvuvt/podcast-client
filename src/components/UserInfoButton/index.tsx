"use client";

import useAuth from "@/hooks/useAuth";
import useCustomRouter from "@/hooks/useCustomRouter";
import { twMerge } from "tailwind-merge";
import { Popover } from "react-tiny-popover";
import { useState } from "react";

const UserInfoButton = () => {
  const { user, isLoading } = useAuth();
  const { pushRouteWithHistory } = useCustomRouter();
  const [isOpenPopover, setOpenPopover] = useState(false);

  if (isLoading) return null;

  return (
    <div>
      {user?.userInfo ? (
        <Popover
          containerStyle={{
            zIndex: "101",
          }}
          onClickOutside={() => setOpenPopover(false)}
          isOpen={isOpenPopover}
          positions={["bottom"]}
          content={
            <div
              className="bg-[#282828] h-[200px] w-[200px] text-[#eaeaea] rounded-md shadow-xl"
              style={{ transform: "translate(-80px, 10px)" }}
            ></div>
          }
        >
          <div
            onClick={(e) => {
              e.stopPropagation();
              setOpenPopover(!isOpenPopover);
            }}
            className={twMerge(
              "rounded-full",
              "w-[30px] h-[30px] bg-[white]",
              "cursor-pointer"
            )}
          />
        </Popover>
      ) : null}
    </div>
  );
};

export default UserInfoButton;
