import { axiosInstance as axios } from "@/shared/lib/axios/axiosInstance";

export const getUserInfo = () => axios.get("/api/manage/userInfo");

export const getUserMenu = () => axios.get("/user-menus");
