import { useEffect, useState } from 'react';
import axios from 'axios';

interface ApiResponse<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

const useApi = <T>(url: string, method: 'GET' | 'POST' = 'GET', options?: any): ApiResponse<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios({
          url: `https://api.themoviedb.org/3/${url}`,
          method,
          headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZTc1MjJlNTM2MDdhZjQwZWIxMTUwZjQxYjc0ZjM4MCIsIm5iZiI6MTcyOTgzNDUyNi44MTI3MDEsInN1YiI6IjYwZjY3ODkyMjA5ZjE4MDA3ZDUyZmU5MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FJOfeFqYKhZNc3poU1RcnowFqN-HQ_2zU3G40wqyxM0',
          },
          ...options,
        });

        setData(response.data);
      } catch (err: any) {
        setError(err.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, method, options]);

  return { data, loading, error };
};

export default useApi;
