import { api } from "../service";

export const rolesApi = api.injectEndpoints({
  endpoints: (builder) => ({
     getRolesDropdown: builder.query({
      query: () => ({
        url: "/roles",
        method: "GET",
      }),
      providesTags: ["Roles"],
    }),

    getRolesList: builder.query({
      query: ({ page = 1, limit = 10, search = "" }) =>
        `/roles/list?page=${page}&limit=${limit}&search=${search}`,
      providesTags: ["Roles"],
    }),

    createRole: builder.mutation({
      query: (body) => ({
        url: "/roles",
        method: "POST",
        body, // { name, key }
      }),
      invalidatesTags: ["Roles"],
    }),

    updateRole: builder.mutation({
      query: ({ roleId, body }) => ({
        url: `/roles/${roleId}`,
        method: "PATCH",
        body, // { name }
      }),
      invalidatesTags: ["Roles"],
    }),

    deleteRole: builder.mutation({
      query: (roleId) => ({
        url: `/roles/${roleId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Roles"],
    }),
  }),
});

export const {
    useGetRolesDropdownQuery,
  useGetRolesListQuery,
  useCreateRoleMutation,
  useUpdateRoleMutation,
  useDeleteRoleMutation,
} = rolesApi;
