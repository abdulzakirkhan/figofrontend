import { api } from "../service";

export const adminUsersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAdminUsers: builder.query({
      query: () => ({ url: "/admin", method: "GET" }),
      providesTags: ["AdminUsers"],
    }),

    createAdminUser: builder.mutation({
      query: (body) => ({
        url: "/admin",
        method: "POST",
        body,
      }),
      invalidatesTags: ["AdminUsers"],
    }),

    assignRoleToUser: builder.mutation({
      query: ({ userId, roleId }) => ({
        url: `/admin/${userId}/assign-role`,
        method: "PATCH",
        body: { roleId },
      }),
      invalidatesTags: ["AdminUsers"],
    }),

    updateAdminUser: builder.mutation({
      query: ({ userId, body }) => ({
        url: `/admin/${userId}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["AdminUsers"],
    }),

    deleteAdminUser: builder.mutation({
      query: (userId) => ({
        url: `/admin/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["AdminUsers"],
    }),
  }),
});

export const {
  useGetAdminUsersQuery,
  useCreateAdminUserMutation,
  useAssignRoleToUserMutation,
  useUpdateAdminUserMutation,
  useDeleteAdminUserMutation,
} = adminUsersApi;
