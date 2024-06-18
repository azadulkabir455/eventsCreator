// features/api/EventSlice.js
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, getDoc } from 'firebase/firestore';
import { database } from '../../firebase_config';

const eventSlice = createApi({
  reducerPath: "eventapi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["events"],
  endpoints: (builder) => ({
    getEvents: builder.query({
      async queryFn() {
        try {
          const querySnapshot = await getDocs(collection(database, 'events'));
          let items = [];
          querySnapshot.forEach((doc) => {
            items.push({ id: doc.id, ...doc.data() });
          });
          return { data: items };
        } catch (error) {
          return { error: error.message };
        }
      }, providesTags: ["events"]
    }),
    getSingleEvent: builder.query({
      async queryFn(eventId) {
        try {
          const docRef = doc(database, 'events', eventId);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            return { data: { id: docSnap.id, ...docSnap.data() } };
          } else {
            return { error: 'No such document!' };
          }
        } catch (error) {
          return { error: error.message };
        }
      }, providesTags: ["events"]
    }),
    addEvents: builder.mutation({
      async queryFn(value) {
        try {
          const docRef = await addDoc(collection(database, 'events'), value);
          return { data: { id: docRef.id, ...value } };
        } catch (error) {
          return { error: error.message };
        }
      }, invalidatesTags: ["events"]
    }),
    updateEvents: builder.mutation({
      async queryFn({ id, ...updatedItem }) {
        try {
          const itemDoc = doc(database, 'events', id);
          await updateDoc(itemDoc, updatedItem);
          return { data: { id, ...updatedItem } };
        } catch (error) {
          return { error: error.message };
        }
      }, invalidatesTags: ["events"]
    }),
    deleteEvents: builder.mutation({
      async queryFn(id) {
        try {
          const itemDoc = doc(database, 'events', id);
          await deleteDoc(itemDoc);
          return { data: id };
        } catch (error) {
          return { error: error.message };
        }
      }, invalidatesTags: ["events"]
    }),
  }),
});

export const { 
  useGetEventsQuery, 
  useGetSingleEventQuery, 
  useAddEventsMutation, 
  useUpdateEventsMutation, 
  useDeleteEventsMutation } = eventSlice;
export default eventSlice;
