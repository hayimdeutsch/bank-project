import "../utils/axios"
import axios from "axios";
import { useEffect } from "react";
import { privateAxios } from "../utils/axios";

const useProtectedFetch = () => {
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
    
        if (error.response.status === 401 && !reqConfig.isRetry) {
          console.log("need to refresh, trying now");
          const refreshToken = localStorage.getItem('refreshToken');
          console.log(sessionStorage.getItem('accessToken'));
          console.log(refreshToken);
          reqConfig.isRetry = true;
          const refreshResopnse = await axios.post(
            "/api/v1/refresh", 
            {refreshToken},
          );
          console.log("refreshed", refreshResopnse)
          sessionStorage.setItem('accessToken', refreshResopnse.data.accessToken);
          localStorage.setItem('refreshToken', refreshResopnse.data.refreshToken);
          console.log(sessionStorage.getItem('accessToken'));
          console.log(localStorage.getItem('refreshToken'));
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

export default useProtectedFetch;