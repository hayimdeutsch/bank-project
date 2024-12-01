import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/api";
import { privateAxios } from "../utils/api";
import { useAuthContext } from '../context/UserContext'

export default () => {
  let { activeUser, setActiveUser, logout } = useAuthContext();
  let navigate = useNavigate();

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
          let refreshToken = localStorage.getItem('refreshToken');
          // let refreshToken = activeUser?.refreshToken;
          reqConfig.isRetry = true;
          try {
            const refreshResopnse = await axios.post(
              "/api/v1/refresh", 
              {refreshToken},
            );
            const accessToken = refreshResopnse?.data?.accessToken;
            refreshToken = refreshResopnse?.data?.refreshToken;
            setActiveUser((prev) => ({
              ...prev, 
              accessToken,
              refreshToken
            }))
            sessionStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            return privateAxios(reqConfig);
          } catch (err) {
            logout();
            navigate("/");
            return Promise.reject(error);
 
          }
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