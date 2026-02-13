import { api } from "../service";

export const customerApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCustomersUsers: builder.query({
      query: ({ page = 1, limit = 10 }) => ({
        url: `/auth/users?page=${page}&limit=${limit}`,
        method: "GET",
      }),
      providesTags: ["Users"],
    }),
     getCustomerDetail: builder.query({
      query: (id) => `/auth/users/${id}`,
    }),
     getUserEsims: builder.query({
      query: (userId) => `/auth/users/${userId}/esims`,
      
    }),
     getAllEsims: builder.query({
      query: () => "/orders/admin/all",
    }),
  }),
});

export const { useGetCustomersUsersQuery, useGetCustomerDetailQuery, useGetUserEsimsQuery, useGetAllEsimsQuery } = customerApi;
