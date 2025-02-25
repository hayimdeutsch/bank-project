import { useState, useEffect } from "react";
import axios from "../utils/api";

export default function useFetch(endpoint) {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let abortController = new AbortController();
    const fetchData = async () => {
      try {
        const response = await axios(endpoint, {
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