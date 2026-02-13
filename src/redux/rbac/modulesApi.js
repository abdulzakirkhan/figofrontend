import { api } from "../service";

export const modulesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getModules: builder.query({
      query: () => "/modules",
      providesTags: ["Modules"],
    }),

    getModulesTree: builder.query({
      query: () => "/modules/tree",
      providesTags: ["Modules"],
    }),

    createModule: builder.mutation({
      query: (body) => ({
        url: "/modules",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Modules"],
    }),

    updateModule: builder.mutation({
      query: ({ id, body }) => ({
        url: `/modules/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Modules"],
    }),

    deleteModule: builder.mutation({
      query: (id) => ({
        url: `/modules/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Modules"],
    }),
  }),
});

export const {
  useGetModulesQuery,
  useGetModulesTreeQuery,
  useCreateModuleMutation,
  useUpdateModuleMutation,
  useDeleteModuleMutation,
} = modulesApi;
