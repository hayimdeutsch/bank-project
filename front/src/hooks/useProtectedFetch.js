// import { useState, useEffect } from "react";
// import useAxiosProtected from "./useAxiosProtected";

// export default function useProtectedFetch(endpoint, refresh) {
//   let privateAxios = useAxiosProtected();

//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     let abortController = new AbortController();
//     const fetchData = async () => {
//       try {
//         const response = await privateAxios(endpoint, {
//           signal: abortController.signal,
//         });
//         setLoading(false);
//         setData(response.data);
//         setError(null);
//       } catch (error) {
//         if (error?.response?.status !== 401) {
//           setError(error);
//           setLoading(false);
          
//         }
//       }
//     };

//     fetchData();
    
//     return () => {
//       abortController.abort();
//     };
//   }, [endpoint, refresh]);

//   return { data, loading, error };
// }

import { useState, useEffect } from "react";
import useAxiosProtected from "./useAxiosProtected";

export default function useProtectedFetch(endpoint, refresh) {
  let privateAxios = useAxiosProtected();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

useEffect(() => {
  let abortController = new AbortController();
  const fetchData = async () => {
    try {
      const response = await privateAxios(endpoint, {
        signal: abortController.signal,
      });
      setData(response.data);
      setError(null);
    } catch (error) {
      if (!abortController.signal.aborted) {
        setError(error);
      }
    } finally {
      setLoading(false);
    }
  };

  const timer = setTimeout(fetchData, 300); // debounce for 300ms

  return () => {
    clearTimeout(timer);
    abortController.abort();
  };
}, [endpoint, refresh]);

  return { data, loading, error };
}
