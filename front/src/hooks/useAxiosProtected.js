import { useEffect } from "react";
import { privateAxios } from "../utils/axios";

export default useProtectedFetch = () => {
  useEffect(() => {    
    const requestIntercept = privateAxios.interceptors.request.use(
      (config) => {
        const accessToken = sessionStorage.getItem('accessToken');
        if (accessToken) {
          config.headers['Authorization'] = `Bearer ${accessToken}`
        } 
        return config;
      },
      (error) => (Promise.reject(error))
    );
    
    const responseIntercept = privateAxios.interceptors.response.use(
      (response) => (response),
      async (error) => {
        let reqConfig = error?.config;
    
        if (error.response.status === 401 && !reqConfig?.isRetry) {
          reqConfig.isRetry = true;
          const refreshToken = localStorage.getItem('refreshToken');
          const refreshResopnse = await axios.post(
            `${baseURL}/api/v1/refresh`, 
            {refreshToken},
            { withCredentials: true } 
          );
          sessionStorage.setItem('accessToken', refreshResopnse.data.accessToken);
          localStorage.setItem('refreshToken', refreshResopnse.data.refreshToken);
          return privateAxios(reqConfig);
        }
        return Promise.reject(error);
      }
    )

    return (() => {
      privateAxios.interceptors.request.eject(requestIntercept);
      privateAxios.interceptors.response.eject(responseIntercept);
    })
    
  }, []);
  
  return privateAxios;
}