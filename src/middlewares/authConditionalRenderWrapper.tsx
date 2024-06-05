"use client";

import { State } from "@/redux/store";
import { useSelector } from "react-redux";

type Props = {
  children: React.ReactNode;
  required: boolean;
};

const AuthConditionalRenderWrapper: React.FC<Props> = ({
  children,
  required,
}) => {
  const user = useSelector((state: State) => state.user);

  return required
    ? user && user.userInfo
      ? children
      : null
    : user && user.userInfo
    ? null
    : children;
};

export default AuthConditionalRenderWrapper;
