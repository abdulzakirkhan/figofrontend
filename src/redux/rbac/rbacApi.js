import { api } from "../service";

export const rbacApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getRoles: builder.query({
      query: () => ({ url: "/roles", method: "GET" }),
    }),

    getModulesTree: builder.query({
      query: () => ({ url: "/modules/tree", method: "GET" }),
    }),

    getRolePermissions: builder.query({
      query: (roleId) => ({ url: `/roles/${roleId}/permissions`, method: "GET" }),
      providesTags: (res, err, roleId) => [{ type: "RolePerms", id: roleId }],
    }),

    updateRolePermissions: builder.mutation({
      query: ({ roleId, permissions }) => ({
        url: `/roles/${roleId}/permissions`,
        method: "PATCH",
        body: { permissions },
      }),
       invalidatesTags: (res, err, arg) => [
        { type: "RolePerms", id: arg.roleId },
        "AuthMe",        // 👈 re-fetch logged-in user
        "ModulesTree",   // 👈 re-fetch sidebar/menu
      ],
    }),
  }),
});

export const {
  useGetRolesQuery,
  useGetModulesTreeQuery,
  useGetRolePermissionsQuery,
  useUpdateRolePermissionsMutation,
} = rbacApi;
