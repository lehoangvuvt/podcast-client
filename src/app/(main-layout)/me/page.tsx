import UsersService from "@/services/users.service";
import { cache } from "react";

const get = cache(async () => {
  await UsersService.Authenticate();
});

export const generateMetadata = async () => {
  await get();
};

const MePage = async () => {
  await get();
  return <h1>User info</h1>;
};

export default MePage;
