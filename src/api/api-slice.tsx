import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const AUTH_ENDPOINT = `${import.meta.env.VITE_REACT_APP_AIRBNB_API_ENDPOINT}/auth`;
const PLACES_ENDPOINT = `${import.meta.env.VITE_REACT_APP_AIRBNB_API_ENDPOINT}/places`;


//define slice to handle functions and actions related to user authentication
export const userApiSlice = createApi({
  reducerPath: 'usersApi',
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
  })
});

//define slice to handle functions and actions related to users creating new places
export const placesApiSlice = createApi({
    reducerPath: "placesApi",
    baseQuery: fetchBaseQuery({baseUrl: `${PLACES_ENDPOINT}`}),
    endpoints: (builder) => ({
        uploadPhotoFromLink: builder.mutation({
            query: (imageUrl) => ({
                url: "/upload-by-link",
                method: "POST",
                body: imageUrl,
            })
        }),

        uploadPhotoFromDevice: builder.mutation({
            query: (formData) => ({
                url: "/upload-to-temporary",
                method: "POST",
                body: formData,
            })
        }),

    })
});

export const { useRegisterUserMutation, useLoginUserMutation } = userApiSlice;
export const {useUploadPhotoFromLinkMutation, useUploadPhotoFromDeviceMutation} = placesApiSlice;