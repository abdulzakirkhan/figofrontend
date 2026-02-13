// // src/redux/auth/authApi.js
// import { PERMISSIONS_MODULES, ROLES_MODULES } from "../../constants/apiUrls";
// import { api } from "../service";

// export const providersModuleApi = api.injectEndpoints({
//   endpoints: (builder) => ({
// listPrepaidPackageTemplate: builder.query({
//       query: () => ({
//         url: "https://portal.hellofigo.com/yesim/listPrepaidPackageTemplate",
//         method: "POST",
//         body: {
//           listPrepaidPackageTemplate: {},
//         },
//       }),
//       transformResponse: (response) =>
//         response?.data?.listPrepaidPackageTemplate?.template || [],
//     }),
// listDetailedLocationZone: builder.query({
//   query: () => ({
//     url: "https://portal.hellofigo.com/yesim/listDetailedLocationZone",
//     method: "POST",
//     body: {
//       listDetailedLocationZone: 984
//     },
//   }),
//   transformResponse: (response) =>
//   response?.data?.listDetailedLocationZone || [],
// }),

// listSubscriber: builder.query({
//   query: () => ({
//     url: "https://portal.hellofigo.com/yesim/listSubscriber",
//     method: "POST",
//     body: {
//   "listSubscriber": {
//     "accountId": 4263
//   }
// }
//   }),
//   transformResponse: (response) =>
//     response?.data?.listSubscriber?.subscriberList || [],
// }),
// getSingleSubscriber: builder.query({
//   query: (imsi) => ({
//     url: "https://portal.hellofigo.com/yesim/getSingleSubscriber",
//     method: "POST",
//     body: {
//       getSingleSubscriber: { imsi },
//     },
//   }),
//   transformResponse: (res) => res?.data?.getSingleSubscriber,
// }),

// createPrepaidPackageTemplate: builder.mutation({
//   query: (payload) => ({
//     url: "https://portal.hellofigo.com/yesim/createPrepaidPackageTemplate",
//     method: "POST",
//     body: {
//       createPrepaidPackageTemplate: payload,
//     },
//   }),
// }),

// modifyPrepaidPackageTemplateCore: builder.mutation({
//   query: (payload) => ({
//     url: "https://portal.hellofigo.com/yesim/modify-prepaid-package-template-core",
//     method: "POST",
//     body: {
//       modifyPPTCore: payload, // ❗ docs demand this
//     },
//   }),
// }),




//   }),
  
// });

// export const {
//   useListPrepaidPackageTemplateQuery,
//   useListDetailedLocationZoneQuery,
//   useListSubscriberQuery,
//   useGetSingleSubscriberQuery,
//   useCreatePrepaidPackageTemplateMutation,
//     useModifyPrepaidPackageTemplateCoreMutation,
// } = providersModuleApi;



// src/redux/auth/authApi.js
import { api } from "../service";

export const providersModuleApi = api.injectEndpoints({
  endpoints: (builder) => ({

    /* =========================
       LIST PACKAGE TEMPLATES
    ========================= */
    listPrepaidPackageTemplate: builder.query({
      query: () => ({
        url: "https://portal.hellofigo.com/yesim/listPrepaidPackageTemplate",
        method: "POST",
        body: {
          listPrepaidPackageTemplate: {},
        },
      }),
      transformResponse: (response) =>
        response?.data?.listPrepaidPackageTemplate?.template || [],

      providesTags: (result) =>
        result
          ? [
              { type: "PrepaidPackageTemplate", id: "LIST" },
              ...result.map((pkg) => ({
                type: "PrepaidPackageTemplate",
                id: pkg.prepaidpackagetemplateid,
              })),
            ]
          : [{ type: "PrepaidPackageTemplate", id: "LIST" }],
    }),

    /* =========================
       LOCATION ZONES
    ========================= */
    listDetailedLocationZone: builder.query({
      query: () => ({
        url: "https://portal.hellofigo.com/yesim/listDetailedLocationZone",
        method: "POST",
        body: {
          listDetailedLocationZone: 984,
        },
      }),
      transformResponse: (response) =>
        response?.data?.listDetailedLocationZone || [],
    }),

    /* =========================
       SUBSCRIBERS
    ========================= */
    listSubscriber: builder.query({
      query: () => ({
        url: "https://portal.hellofigo.com/yesim/listSubscriber",
        method: "POST",
        body: {
          listSubscriber: {
            accountId: 4263,
          },
        },
      }),
      transformResponse: (response) =>
        response?.data?.listSubscriber?.subscriberList || [],
    }),

    getSingleSubscriber: builder.query({
      query: (imsi) => ({
        url: "https://portal.hellofigo.com/yesim/getSingleSubscriber",
        method: "POST",
        body: {
          getSingleSubscriber: { imsi },
        },
      }),
      transformResponse: (res) => res?.data?.getSingleSubscriber,
    }),

    /* =========================
       CREATE PACKAGE TEMPLATE
    ========================= */
    createPrepaidPackageTemplate: builder.mutation({
      query: (payload) => ({
        url: "https://portal.hellofigo.com/yesim/createPrepaidPackageTemplate",
        method: "POST",
        body: {
          createPrepaidPackageTemplate: payload,
        },
      }),
      invalidatesTags: [{ type: "PrepaidPackageTemplate", id: "LIST" }],
    }),

    /* =========================
       MODIFY PACKAGE TEMPLATE (4.7)
    ========================= */
    modifyPrepaidPackageTemplateCore: builder.mutation({
      query: (payload) => ({
        url: "https://portal.hellofigo.com/yesim/modify-prepaid-package-template-core",
        method: "POST",
        body: {
          modifyPPTCore: payload, // ✅ docs-correct
        },
      }),
      invalidatesTags: (result, error, payload) => [
        { type: "PrepaidPackageTemplate", id: payload.prepaidpackagetemplateid },
        { type: "PrepaidPackageTemplate", id: "LIST" },
      ],
    }),

  }),

  // 🔥 VERY IMPORTANT
  overrideExisting: false,
});

export const {
  useListPrepaidPackageTemplateQuery,
  useListDetailedLocationZoneQuery,
  useListSubscriberQuery,
  useGetSingleSubscriberQuery,
  useCreatePrepaidPackageTemplateMutation,
  useModifyPrepaidPackageTemplateCoreMutation,
} = providersModuleApi;
