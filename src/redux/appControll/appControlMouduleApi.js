// src/redux/auth/authApi.js
import { PERMISSIONS_MODULES, ROLES_MODULES, SUBSCRIBERS, TRANSACTION_HISTORY } from "../../constants/apiUrls";
import { api } from "../service";

export const appControllModuleApi = api.injectEndpoints({
  endpoints: (builder) => ({
  listBanners: builder.query({
      query: (activeOnly = true) => ({
        url: `/api/banners${activeOnly ? "?active=true" : ""}`,
        method: "GET",
      }),
      providesTags: ["Banners"],
    }),

    createBanner: builder.mutation({
      query: (body) => ({
        url: "/api/banners",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Banners"],
    }),
     updateBanner: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/api/banners/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Banners"],
    }),

    deleteBanner: builder.mutation({
      query: (id) => ({
        url: `/api/banners/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Banners"],
    }),

     /* =======================
       LEGAL CONTENT
       (Privacy / Terms)
    ======================= */

    // ADMIN LIST (table)
    listLegalContent: builder.query({
      query: (type) => ({
        url: "/api/legal",
        method: "GET",
        params: type ? { type } : undefined, // privacy | terms | all
      }),
      providesTags: ["Legal"],
    }),

    // APP + WEB (active content)
    getActiveLegalContent: builder.query({
      query: (type) => ({
        url: `/api/legal/${type}/active`, // privacy | terms
        method: "GET",
      }),
      providesTags: ["Legal"],
    }),

     createLegalContent: builder.mutation({
      query: (body) => ({
        url: "/api/legal",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Legal"],
    }),

    updateLegalContent: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/api/legal/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Legal"],
    }),

      deleteLegalContent: builder.mutation({
      query: (id) => ({
        url: `/api/legal/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Legal"],
    }),


  }),
});

export const {
  useListBannersQuery,
  useCreateBannerMutation,
  useUpdateBannerMutation,
  useDeleteBannerMutation,

   /* LEGAL CONTENT */
  useListLegalContentQuery,
  useGetActiveLegalContentQuery,
  useCreateLegalContentMutation,
  useUpdateLegalContentMutation,
  useDeleteLegalContentMutation,
} = appControllModuleApi;
