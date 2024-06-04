"use client";

import useAuth from "@/hooks/useAuth";
import useCustomRouter from "@/hooks/useCustomRouter";
import { useEffect } from "react";

const noAuth = (WrappedComponent: React.FC) => {
  const NoAuth: React.FC = (props: any) => {
    const { pushRoute } = useCustomRouter();
    const { user, isLoading } = useAuth();

    useEffect(() => {
      if (isLoading) return;
      if (user?.userInfo) {
        pushRoute("/home");
      }
    }, [user, pushRoute, isLoading]);

    if (isLoading) return <h1>Loading...</h1>;
    if (!isLoading && user?.userInfo) return null;
    return <WrappedComponent {...props} />;
  };

  NoAuth.displayName = `noAuth(${
    WrappedComponent.displayName || WrappedComponent.name
  })`;

  return NoAuth;
};

export default noAuth;
