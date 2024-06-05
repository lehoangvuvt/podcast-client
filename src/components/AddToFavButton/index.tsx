"use client";

import AuthConditionalRenderWrapper from "@/middlewares/authConditionalRenderWrapper";
import { State } from "@/redux/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { twMerge } from "tailwind-merge";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import UsersService from "@/services/users.service";
import { setUserInfo } from "@/redux/slices/userSlice";

type Props = {
  type: "episode" | "podcast";
  itemId: number;
};

const AddToFavButton: React.FC<Props> = ({ type, itemId }) => {
  const [isLoading, setLoading] = useState(true);
  const userSlice = useSelector((state: State) => state.user);
  const [isAdded, setAdded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    let isAdded = false;
    switch (type) {
      case "episode":
        isAdded = userSlice.userInfo?.favourite_episodes?.find(
          (ele) => ele.id === itemId
        )
          ? true
          : false;
        break;
    }
    setAdded(isAdded);
  }, [userSlice, type, itemId]);

  const handleAddToFav = async () => {
    setLoading(true);
    switch (type) {
      case "episode":
        const response = await UsersService.ModifyUserFavourite({
          type: "Episode",
          item_id: itemId,
          operator: "Add",
        });
        if (response.status === "success") {
          const authenticateRes = await UsersService.Authenticate();
          if (authenticateRes.status === "success") {
            dispatch(setUserInfo(authenticateRes.data));
          }
        }
        break;
    }
    setLoading(false);
  };

  const handleRemoveFromFav = async () => {
    setLoading(true);
    switch (type) {
      case "episode":
        const response = await UsersService.ModifyUserFavourite({
          type: "Episode",
          item_id: itemId,
          operator: "Remove",
        });
        if (response.status === "success") {
          const authenticateRes = await UsersService.Authenticate();
          if (authenticateRes.status === "success") {
            dispatch(setUserInfo(authenticateRes.data));
          }
        }
        break;
    }
    setLoading(false);
  };

  return (
    <AuthConditionalRenderWrapper required>
      <button
        className={twMerge(
          "rounded-full",
          "w-[45px]",
          "h-[45px]",
          "flex",
          "items-center",
          "justify-center",
          "cursor-pointer",
          "transition-all",
          "hover:scale-110",
          "text-[36px]"
        )}
      >
        {isAdded ? (
          <CheckCircleIcon
            onClick={handleRemoveFromFav}
            fontSize="inherit"
            color="inherit"
            style={{ color: "#00E676" }}
          />
        ) : (
          <AddCircleOutlineIcon
            onClick={handleAddToFav}
            fontSize="inherit"
            color="inherit"
            style={{ color: "rgba(255,255,255,0.6)" }}
          />
        )}
      </button>
    </AuthConditionalRenderWrapper>
  );
};

export default AddToFavButton;
