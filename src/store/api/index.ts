import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL as string,
  }),
  tagTypes: ['Exercises', 'VideosClasses', 'User'],
  endpoints: () => ({}),
});
