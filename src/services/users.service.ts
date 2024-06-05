import { LoginSuccessResponse } from "@/types/apiResponse";
import baseAxios from "./axiosClient";

const baseServiceURL = "/users";

const UsersService = {
  async Login(
    username: string,
    password: string
  ): Promise<
    | {
        status: "success";
        data: LoginSuccessResponse;
      }
    | {
        status: "fail";
        errorMsg: string;
      }
  > {
    const data = { username, password };
    try {
      const response = (await baseAxios.post(
        "/login",
        data
      )) as LoginSuccessResponse;
      return { status: "success", data: response };
    } catch (err: any) {
      return { status: "fail", errorMsg: err.response.data.error };
    }
  },
  async Authenticate(): Promise<
    | {
        status: "success";
        data: LoginSuccessResponse;
      }
    | {
        status: "fail";
        errorMsg: string;
      }
  > {
    try {
      const url = `${baseServiceURL}/authenticate`;
      const response = (await baseAxios.get(url, {
        withCredentials: true,
      })) as LoginSuccessResponse;
      return { status: "success", data: response };
    } catch (err: any) {
      return { status: "fail", errorMsg: err.response.data.error };
    }
  },
  async Invalidate(): Promise<
    | {
        status: "success";
        data: {
          message: string;
        };
      }
    | {
        status: "fail";
        errorMsg: string;
      }
  > {
    try {
      const url = `${baseServiceURL}/invalidate`;
      const response = (await baseAxios.get(url, {
        withCredentials: true,
      })) as {
        message: string;
      };
      return { status: "success", data: response };
    } catch (err: any) {
      return { status: "fail", errorMsg: err.response.data.error };
    }
  },
};

export default UsersService;
