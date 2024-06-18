import { useGetEventsQuery } from "../store/feature/EventSlice";

export default function useEvents() {
    const { data: events, isLoading } = useGetEventsQuery();
    return [isLoading, events];
}
