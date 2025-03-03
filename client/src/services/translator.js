import axiosInstance from "./axiosInstance";

const tokenAcces = localStorage.getItem("token");

export const createTraducteur = async (data) => {
  const result = await axiosInstance.post("/translators", data, {
    headers: { "jwt-token": tokenAcces },
  });
  return result;
};

export const getTranslators = async () => {
  const translators = await axiosInstance.get("/translators");
  return translators.data;
};

export const getTranslator = async (id) => {
  const translator = await axiosInstance.get(`/translators/${id}`, {
    headers: { "jwt-token": tokenAcces },
  });
  return translator.data;
};

export const updateTraducteur = async (data) => {
  const client = await axiosInstance.put("/translators", data, {
    headers: { "jwt-token": tokenAcces },
  });
  return client;
};

export const deleteTraducteur = async (id) => {
  const response = await axiosInstance.delete(`/translators/${id}`, {
    headers: { "jwt-token": tokenAcces },
  });
  return response.data;
};
