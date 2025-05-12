import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const generalApiSlice = createApi({
  reducerPath: "generalApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.BASE_URL,
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      const token = localStorage.getItem("estate_loop");
      if (token) {
        headers.set("Authorization", token);
      }
      return headers;
    },
  }),
  tagTypes: ["Auctions"],
  endpoints: (builder) => ({
    fetch: builder.query({
      query: ({ endpoint, id, params, type }) => {
        const url = id ? `${endpoint}/${id}` : id;
        return {
          url,
          method: "GET",
          params: params || undefined,
        };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ _id }) => ({ type, id: _id })),
              { type, id: "LIST" },
            ]
          : [{ type, id: "LIST" }],
    }),

    createQuery: builder.mutation({
      query: ({ endpoint, formData }) => ({
        url: endpoint,
        method: "POST",
        body: formData,
      }),
      // Optimistic update for create
      async onQueryStarted(
        { endpoint, formData, lastId, fetchEndpoint, type },
        { dispatch, queryFulfilled }
      ) {
        try {
          const { data } = await queryFulfilled;
          if (data && data.data && data.data._id) {
            dispatch(
              generalApiSlice.util.updateQueryData(
                type,
                { endpoint: fetchEndpoint, id: lastId },
                (draft) => {
                  draft.data.unshift(data.data);
                }
              )
            );
          }
        } catch (error) {
          console.error("Create failed:", error);
        }
      },
    }),

    updateQuery: builder.mutation({
      query: ({ endpoint, id, formData }) => ({
        url: `${endpoint}/${id}`,
        method: "PUT",
        body: formData,
      }),
      // Optimistic update for edit
      async onQueryStarted(
        { endpoint, id, formData, lastId, fetchEndpoint, type },
        { dispatch, queryFulfilled }
      ) {
        try {
          const { data } = await queryFulfilled;
          if (data && data.data) {
            dispatch(
              generalApiSlice.util.updateQueryData(
                "fetch",
                { endpoint: fetchEndpoint, id: lastId },
                (draft) => {
                  const index = draft.data.findIndex((item) => item._id === id);
                  if (index !== -1) {
                    draft.data[index] = data.data;
                  }
                }
              )
            );
          }
        } catch (error) {
          console.error("Update failed:", error);
        }
      },
    }),

    deleteQuery: builder.mutation({
      query: ({ endpoint, id }) => ({
        url: `${endpoint}/${id}`,
        method: "DELETE",
      }),
      // Optimistic update for delete
      async onQueryStarted(
        { endpoint, id, lastId, fetchEndpoint, type }, // ← Structured object, like other mutations
        { dispatch, queryFulfilled }
      ) {
        const patchResult = dispatch(
          generalApiSlice.util.updateQueryData(
            "fetch",
            { endpoint: fetchEndpoint, id: lastId },
            (draft) => {
              if (draft?.data) {
                // Now we can use 'id' directly, not 'id?.id'
                draft.data = draft.data.filter((item) => item._id !== id);
              }
            }
          )
        );

        try {
          await queryFulfilled;
        } catch (error) {
          patchResult.undo();
          console.error("Delete lot failed:", error);
        }
      },
    }),
  }),
});

export const {
  useFetchQuery,
  useCreateQueryMutation,
  useUpdateQueryMutation,
  useDeleteQueryMutation,
} = generalApiSlice;
