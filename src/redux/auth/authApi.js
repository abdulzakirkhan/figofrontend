
// src/redux/auth/authApi.js
import { api } from '../service';
import { ADMIN, AUTH_LOGIN, } from '../../constants/apiUrls';

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => {
        return {
          url:`${ADMIN}${AUTH_LOGIN}`,
          method: 'POST',
          body,
        };
      },
    }),
      getMe: builder.query({
      query: () => ({
        url: `admin/me`,
        method: "GET",
      }),
           providesTags: ["AuthMe"],
    }),
    getModulesTree: builder.query({
      query: () => ({
        url: `/modules/tree`,
        method: "GET",
       
      }),
        providesTags: ["ModulesTree"],
    }),
  }),
});

export const { 
  useLoginMutation,
  useGetMeQuery,
  useGetModulesTreeQuery
} = authApi;