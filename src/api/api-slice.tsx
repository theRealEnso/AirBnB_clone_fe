import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const AUTH_ENDPOINT = `${import.meta.env.VITE_REACT_APP_AIRBNB_API_ENDPOINT}/auth`;

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: `${AUTH_ENDPOINT}` }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (userData) => ({
        url: '/register', // endpoint for user registration
        method: 'POST',
        body: userData,
      }),
    }),

    loginUser: builder.mutation({
        query: (userData) => ({
            url: '/login', //endpoint for logging the user in
            method: 'POST',
            body: userData,
        })
    })
  }),
});

export const { useRegisterUserMutation, useLoginUserMutation } = apiSlice;