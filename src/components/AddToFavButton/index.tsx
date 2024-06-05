"use client";

import AuthConditionalRenderWrapper from "@/middlewares/authConditionalRenderWrapper";
import { State } from "@/redux/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

type Props = {
  type: "episode" | "podcast";
  itemId: number;
};

const AddToFavButton: React.FC<Props> = ({ type, itemId }) => {
  const userSlice = useSelector((state: State) => state.user);
  const [isAdded, setAdded] = useState(false);

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

  return (
    <AuthConditionalRenderWrapper required>
      {isAdded ? (
        <button className="text-[white]">Added</button>
      ) : (
        <button className="text-[white]">Add to favourite</button>
      )}
    </AuthConditionalRenderWrapper>
  );
};

export default AddToFavButton;
