import { SearchResult } from "@/types/apiResponse";
import baseAxios from "./axiosClient";

const baseServiceURL = "/home";

const HomeService = {
  async GetHomeFeeds(): Promise<
    | {
        status: "success";
        data: SearchResult;
      }
    | {
        status: "fail";
        errorMsg: string;
      }
  > {
    try {
      const url = `${baseServiceURL}/feeds`;
      const response = (await baseAxios.get(url)) as SearchResult;
      return { status: "success", data: response };
    } catch (err: any) {
      return { status: "fail", errorMsg: err.response.data.error };
    }
  },
};

export default HomeService;
