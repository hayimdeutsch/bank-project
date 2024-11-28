import { useState, useEffect } from "react";
import useAxiosProtected from "./useAxiosProtected";

export default function useFetch(endpoint) {
  let privateAxios = useAxiosProtected();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let abortController = new AbortController();
    const fetchData = async () => {
      try {
        const response = await privateAxios(endpoint, {
          signal: abortController.signal,
        });
        setLoading(false);
        setData(response.data);
        setError(null);
      } catch (error) {
          setError(error);
          setLoading(false);
      }
    };
    fetchData();
    return () => {
      abortController.abort();
    };
  }, [endpoint]);

  return { data, loading, error };
}