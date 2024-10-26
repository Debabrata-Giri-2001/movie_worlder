import { useCallback, useEffect, useState } from "react";
import axios, { AxiosRequestConfig } from "axios";

interface ApiResponse<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

const TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZTc1MjJlNTM2MDdhZjQwZWIxMTUwZjQxYjc0ZjM4MCIsIm5iZiI6MTcyOTgzNDUyNi44MTI3MDEsInN1YiI6IjYwZjY3ODkyMjA5ZjE4MDA3ZDUyZmU5MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FJOfeFqYKhZNc3poU1RcnowFqN-HQ_2zU3G40wqyxM0";

export const useApi = <T>( url: string,method: "GET"): ApiResponse<T> & { refetch: () => void } => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

 const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const config: AxiosRequestConfig = {
        url: `https://api.themoviedb.org/3/${url}`,
        method,
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
      };
      const response = await axios(config);
      setData(response.data);
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(); 
  }, [url, method]);

  return { data, loading, error, refetch: fetchData };
};

//for hadnel request
export const useChange = <T>() => {
  const [isChanging, setIsChanging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const change = async (
    url: string,
    method: "POST" | "PUT" | "DELETE" | "GET",
    payload?: any
  ) => {
    setIsChanging(true);
    setError(null);
    try {
      const response = await axios({
        url: `https://api.themoviedb.org/3/${url}`,
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
        data: payload,
      });
      return response.data;
    } catch (err: any) {
      setError(err.message || "Something went wrong");
      throw new Error(err.message || "Something went wrong");
    } finally {
      setIsChanging(false);
    }
  };

  return { change, isChanging, error };
};

export default useApi;
