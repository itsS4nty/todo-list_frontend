import { DutyStatus } from '../enums/dutyStatus';
import useFetch from './useFetch';

const useDutyFetch = <T,>(status: DutyStatus) => {
    const { data, error, loading } = useFetch<T>(`/duty?status=${status}`);
    return { data, error, loading };
};

export default useDutyFetch;
