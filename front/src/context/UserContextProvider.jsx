import { createContext, useState } from "react"; 

export const UserContext = createContext({});

export default function UserContextProvider({children}) {
  let { userDetails, setUserDetails } = useState({});

  return (
    <UserContext.Provider value={ {userDetails, setUserDetails} }>
      {children}
    </UserContext.Provider>
  )
}