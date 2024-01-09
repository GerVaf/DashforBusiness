import axios from "axios";
import Cookies from "js-cookie";

const token = Cookies.get("token");
// console.log(token)

const baseUrl = import.meta.env.VITE_BASE_URL;

const axiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "multiple/form-data",
    "Authorization": `Bearer ${token}`
  },
});

// axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${Cookies.get(
//   "token"
// )}`;

export const get = (url) => {
  return axiosInstance.get(url);
};

export const post = (url, data) => {
  return axiosInstance.post(url, data);
};
export const put = (url, data) => {
  return axiosInstance.put(url, data);
};

export const isPublish = (url, id) => {
  return axiosInstance.post(url, { data: { id } });
};

export const patch = (url, data) => {
  return axiosInstance.patch(url, data);
};

// export const del = (url, id) => {
//   return axiosInstance.delete(url, { data: { id } });
// };
