import { createContext, useState, useEffect, useContext } from "react"; 

export const UserContext = createContext({});

export default function UserContextProvider({children}) {
  let [activeUser, setActiveUser] = useState( {
    user: sessionStorage.getItem('activeUser'),
    accessToken: sessionStorage.getItem('accessToken'),
    refreshToken: localStorage.getItem('refreshToken')
  });

  useEffect(()=> {
    sessionStorage.setItem('activeUser', activeUser?.user || '' );
    sessionStorage.setItem('accessToken', activeUser?.accessToken || '');
    localStorage.setItem('refreshToken', activeUser?.refreshToken|| '');
  }, [activeUser])

  const login = (userLoggingIn) => {
    setActiveUser({...userLoggingIn});
  };

  const logout = () => (setActiveUser({}));

  return (
    <UserContext.Provider value={{ activeUser, setActiveUser, login, logout }}>
      {children}
    </UserContext.Provider>
  )
}

export const useAuthContext = () => useContext(UserContext);
 