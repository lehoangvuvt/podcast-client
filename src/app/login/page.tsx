"use client";

import noAuth from "@/HOC/noAuth";
import ResponseMessage from "@/components/ResponseMessage";
import useCustomRouter from "@/hooks/useCustomRouter";
import { setUserInfo } from "@/redux/slices/userSlice";
import UsersService from "@/services/users.service";
import React, { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { ClipLoader } from "react-spinners";
import { twMerge } from "tailwind-merge";

const LoginPage = () => {
  const { pushRoute } = useCustomRouter();
  const [isLoading, setLoading] = useState(false);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const dispatch = useDispatch();

  const submitForm = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);
    const response = await UsersService.Login(username, password);
    if (response.status === "success") {
      dispatch(setUserInfo(response.data));
    } else {
      dispatch(setUserInfo(null));
      setErrorMsg(response.errorMsg);
    }
    setLoading(false);
  };

  return (
    <form
      onSubmit={submitForm}
      className="w-screen h-screen absolute top-0 left-0 flex-row"
    >
      <div className="w-[50%] h-[100%] bg-[#131418] flex flex-col items-center justify-center gap-[20px]">
        <h1 className="w-[55%] text-[white] text-[40px] font-[600]">Log in</h1>
        <p className="w-[55%] text-[rgba(255,255,255,0.85)] font-[400] pb-[20px]">
          {`Don't have an account?`}{" "}
          <span
            onClick={() => pushRoute("/sign-up")}
            className="cursor-pointer text-[rgba(255,255,255,0.95)] font-[500] underline"
          >
            Create account
          </span>
        </p>
        {errorMsg && (
          <ResponseMessage width="55%" type="ERROR">
            {errorMsg.charAt(0).toUpperCase() + errorMsg.substring(1)}
          </ResponseMessage>
        )}
        <input
          placeholder="Username"
          className=" bg-[#303339] w-[55%] h-[55px] outline-0 p-[15px] border-none text-[white]"
          value={username}
          required
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          placeholder="Password"
          className=" bg-[#303339] w-[55%] h-[55px] outline-0 p-[15px] border-none text-[white]"
          value={password}
          required
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          disabled={isLoading}
          type="submit"
          className={twMerge(
            "bg-[#ffffff] mt-[5px] w-[55%] h-[55px] outline-0 border-none text-[#303339] font-bold",
            "hover:brightness-[80%]",
            isLoading ? "brightness-[80%]" : "brightness-[100%]",
            isLoading ? "cursor-not-allowed" : "cursor-pointer"
          )}
        >
          {isLoading ? <ClipLoader /> : "Log in"}
        </button>
      </div>
    </form>
  );
};

export default noAuth(LoginPage);
