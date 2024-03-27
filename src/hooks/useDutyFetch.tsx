import { DutyStatus } from '../enums/dutyStatus';
import useFetch from './useFetch';

const useDutyFetch = <T,>(status: DutyStatus, refetch?: boolean) => {
    const { data, loading } = useFetch<T>(`/duty?status=${status}`, refetch);
    return { data, loading };
};

export default useDutyFetch;
