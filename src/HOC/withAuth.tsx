"use client";

import useCustomRouter from "@/hooks/useCustomRouter";
import { State } from "@/redux/store";
import UsersService from "@/services/users.service";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const withAuth = (WrappedComponent: React.FC) => {
  const WithAuth: React.FC = (props: any) => {
    const [isLoading, setLoading] = useState(true);
    const user = useSelector((state: State) => state.user);
    const { pushRoute } = useCustomRouter();

    useEffect(() => {
      return () => setLoading(false);
    }, []);

    useEffect(() => {
      if (user?.userInfo) {
        setLoading(false);
      } else {
        const authenticate = async () => {
          const response = await UsersService.Authenticate();
          if (response.status === "fail") {
            pushRoute("/home/genres");
          }
          setLoading(false);
        };
        authenticate();
      }
    }, [user, pushRoute]);

    if (isLoading) return <h1>Loading...</h1>;
    return <WrappedComponent {...props} />;
  };

  WithAuth.displayName = `withAuth(${
    WrappedComponent.displayName || WrappedComponent.name
  })`;

  return WithAuth;
};

export default withAuth;
