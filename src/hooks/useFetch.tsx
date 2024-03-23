import { useEffect, useState } from 'react';
import axiosConfig from '../config/axios';
import { AxiosResponse } from 'axios';

const useFetch = <T,>(url: string) => {
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axiosConfig
            .get(url)
            .then((res: AxiosResponse<T>) => setData(res.data))
            .catch(() => setError(true))
            .finally(() => setLoading(false));
    }, [url]);

    return { data, error, loading };
};

export default useFetch;
