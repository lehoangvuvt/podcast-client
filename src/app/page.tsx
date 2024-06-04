"use client";

import useCustomRouter from "@/hooks/useCustomRouter";
import { useEffect } from "react";

export default function Home() {
  const { pushRoute } = useCustomRouter();

  useEffect(() => {
    pushRoute("/home");
  }, [pushRoute]);

  return null;
}
