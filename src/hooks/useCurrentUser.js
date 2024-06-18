import { useSelector } from "react-redux";
import { useGetUsersQuery } from "../store/feature/UserSlice";

export default function useCurrentUser() {
    const { currentUser } = useSelector((state) => state.auth);
    const { data } = useGetUsersQuery();
    const currentUserInfo = data?.filter((user) => user.id == currentUser?.uid);
    return [currentUserInfo];
}
