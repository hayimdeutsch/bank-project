import { useState, useEffect } from "react";

export default function useFetch(endpoint) {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let abortController = new AbortController();
    const fetchData = async () => {
      try {
        const response = await fetch(endpoint, {
          signal: abortController.signal,
        });
        const newData = await response.json();
        setLoading(false);
        setData(newData);
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