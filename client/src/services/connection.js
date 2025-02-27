import { any } from "prop-types";
import axiosInstance from "./axiosInstance";

const res = {
  success: any,
  data: any,
  error: any,
};

export const login = async (data) => {
  await axiosInstance
    .post("/connection/login", data)
    .then((resp) => {
      res.success = resp.data.success;
      res.data = resp.data.data;
      res.error = null;
    })
    .catch((error) => {
      let err = error;
      if (error.response) {
        err = new Error("server responded");
      } else if (error.request) {
        err = new Error("network error");
      }
      res.error = err;
    });
  return res;
};

export const registedUser = async (data) => {
  const result = await axiosInstance.post("/connection/register", data);
  return result;
};

export const updateClient = async (data) => {
  const result = await axiosInstance.put("/connection/updateClient", data);
  return result;
};
