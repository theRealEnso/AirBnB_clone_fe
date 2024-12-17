import { RootState } from '../redux/root-reducer';

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
    baseQuery: fetchBaseQuery({
        baseUrl: `${PLACES_ENDPOINT}`,
        prepareHeaders: (headers, {getState}) => { //destucture the getState function from RTK api
            const token = (getState() as RootState).user?.user?.access_token;
            if(token){
                headers.set("Authorization", `Bearer ${token}`);
            };

            return headers;
        }
    }),
    tagTypes: ["Places"], // define the tag
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
                url: "/upload-to-photo-uploads",
                method: "POST",
                body: formData,
            })
        }),

        createNewPlace: builder.mutation({
            query: (placeData) => ({
                url: "/create-new-place",
                method: "POST",
                body: placeData,
            })
        }),
        updatePlace: builder.mutation({
            query: (data) => ({
                url: "/update-place",
                method: "PUT",
                body: data,
            }),

            invalidatesTags: ["Places"], // invalidate the tag when mutation succeeds
        }),

        getAllUserPlaces: builder.query({ // use builder.query for this endpoint because we are not mutating anything, just fetching data
            query: () => ({
                url: "/get-all-places",
                method: "GET",
                providesTags: ["Places"], // attach tag to this query
            })
        }),

        getPlaceDetails: builder.query({
            query: (placeId) => ({
                url: `/${placeId}`,
                method: "GET",
            })
        })

    })
});

export const { useRegisterUserMutation, useLoginUserMutation } = userApiSlice;
export const {useUploadPhotoFromLinkMutation, useUploadPhotoFromDeviceMutation, useCreateNewPlaceMutation, useGetAllUserPlacesQuery, useGetPlaceDetailsQuery, useUpdatePlaceMutation} = placesApiSlice;