import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import type { AxiosInstance } from "axios";
import { useMemo } from "react";

const baseURL = import.meta.env.VITE_API_BASE_URL;

export const useAxios = () => {
  const { getToken } = useAuth();

  const instance: AxiosInstance = useMemo(() => {
    const axiosInstance = axios.create({
      baseURL,
      headers: {
        "Content-Type": "application/json",
      },
    });

    axiosInstance.interceptors.request.use(async (config) => {
      try {
        const token = await getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      } catch (error) {
        console.error("Error getting token", error);
      }
      return config;
    });

    return axiosInstance;
  }, [getToken]);

  return instance;
};
