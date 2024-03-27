import { useEffect, useState } from 'react';
import axiosConfig from '../config/axios';
import { AxiosError, AxiosResponse } from 'axios';
import { notifyError } from '../utils/notifications';

const useFetch = <T,>(url: string, refetch?: boolean) => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        axiosConfig
            .get(url)
            .then((res: AxiosResponse<T>) => setData(res.data))
            .catch((err: AxiosError) =>
                notifyError(
                    'Fetch error',
                    `There was an error fetching data: ${err.message || 'Unknown error'}`,
                ),
            )
            .finally(() => setLoading(false));
    }, [url, refetch]);

    return { data, loading };
};

export default useFetch;
