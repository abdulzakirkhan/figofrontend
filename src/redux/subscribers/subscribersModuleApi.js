// src/redux/auth/authApi.js
import { PERMISSIONS_MODULES, ROLES_MODULES, SUBSCRIBERS, TRANSACTION_HISTORY } from "../../constants/apiUrls";
import { api } from "../service";

export const subscriberModuleApi = api.injectEndpoints({
  endpoints: (builder) => ({
      getAllSubscribers: builder.query({
      query: () => {
        return {
          url: SUBSCRIBERS,
          method: "GET",
        };
      },
      providesTags: ["Subscribers"],
    }),


    // Add more auth endpoints as needed
  }),
});

export const {
 useGetAllSubscribersQuery
} = subscriberModuleApi;
