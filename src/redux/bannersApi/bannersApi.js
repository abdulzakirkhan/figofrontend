import { API_BANNERS } from "../../constants/apiUrls";
import { api } from "../service";

export const bannersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBanners: builder.query({
      query: () => ({
        url: API_BANNERS,
        method: "GET",
      }),
      providesTags: ["Banners"],
    }),
  }),
});

export const {useGetBannersQuery } = bannersApi;
