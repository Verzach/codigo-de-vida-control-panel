import { atom } from "recoil";

export const ISLOGGEDIN = atom<boolean | undefined>({
  key: "isLoggedIn",
  default: undefined,
})



export const MAIN_SERVER = "20.118.130.63"
export const SERVER_URL = `http://${MAIN_SERVER}:80`;