import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { collection, getDocs } from 'firebase/firestore';
import { database } from '../../firebase_config';

const userSlice = createApi({
    reducerPath: "userapi",
    baseQuery: fakeBaseQuery(),
    endpoints: (builder) => ({
        getUsers: builder.query({
            async queryFn() {
                try {
                    const querySnapshot = await getDocs(collection(database, 'userProfiles'));
                    let users = [];
                    querySnapshot.forEach((doc) => {
                        users.push({ id: doc.id, ...doc.data() });
                    });
                    return { data: users };
                } catch (error) {
                    return { error: error.message };
                }
            },
        })
    }),
});

export const { useGetUsersQuery } = userSlice;
export default userSlice;
