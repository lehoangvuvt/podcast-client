"use client";

import { setUserInfo } from "@/redux/slices/userSlice";
import { State } from "@/redux/store";
import UsersService from "@/services/users.service";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useAuth = () => {
  const [isLoading, setLoading] = useState(true);
  const user = useSelector((state: State) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user?.userInfo) {
      setLoading(false);
      return;
    }

    const authenticate = async () => {
      const response = await UsersService.Authenticate();
      if (response.status === "success") {
        dispatch(setUserInfo(response.data));
      } else {
        dispatch(setUserInfo(null));
      }
      setLoading(false);
    };
    authenticate();
  }, [user, dispatch]);

  return { user, isLoading };
};

export default useAuth;
