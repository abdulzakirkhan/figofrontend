import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, logOut } from "./auth/authSlice";
import { BASE_URL } from "../constants/apiUrls";
import { api as apiSlice } from "./service"; // ← your createApi instance

const rawBaseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  // credentials: "include", // ← enable if you use cookies
  prepareHeaders: (headers, { getState }) => {
    const token = getState()?.auth?.token;
    if (token) headers.set("Authorization", `Bearer ${token}`);
    return headers;
  },
});

export const baseQueryWithReauth = async (args, api, extraOptions) => {
  try {
    let result = await rawBaseQuery(args, api, extraOptions);

    // 401 → logout + reset cache
    if (result?.error?.status === 401) {
      api.dispatch(logOut());
      api.dispatch(apiSlice.util.resetApiState());
      return result;
    }

    // Success: only capture token/user on login (or refresh) route
    if (result?.data) {
      const url = typeof args === "string" ? args : args?.url;
      const isLogin = url?.includes("/admin/auth/login");
      const isRefresh = url?.includes("/refreshToken");

      if (isLogin || isRefresh) {
        const token = result.data?.token;
        const user = result.data?.user;
        if (token && user) {
          api.dispatch(setCredentials({ token, user }));
        }
      }
    } else if (result?.error) {
      console.error("API Error:", result.error);
    }

    return result;
  } catch (e) {
    console.error("baseQueryWithReauth fatal error:", e);
    // defensive: log out + reset to avoid bad state
    api.dispatch(logOut());
    api.dispatch(apiSlice.util.resetApiState());
    throw e;
  }
};