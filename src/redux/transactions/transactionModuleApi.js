// src/redux/auth/authApi.js
import { use } from "react";
import { PERMISSIONS_MODULES, ROLES_MODULES, TRANSACTION_HISTORY } from "../../constants/apiUrls";
import { api } from "../service";

export const transactionsModuleApi = api.injectEndpoints({
  endpoints: (builder) => ({
      getTransactionHistory: builder.query({
      query: () => {
        return {
          url: TRANSACTION_HISTORY,
          method: "GET",
        };
      },
      providesTags: ["TransactionHistory"],
    }),

          getTransactionHistoryById: builder.query({
      query: (id) => {
        return {
          url: `${TRANSACTION_HISTORY}/${id}`,
          method: "GET",
        };
      },
      providesTags: ["TransactionHistory"],
    }),


    // Add more auth endpoints as needed
  }),
});

export const {
 useGetTransactionHistoryQuery,
 useGetTransactionHistoryByIdQuery,
} = transactionsModuleApi;
