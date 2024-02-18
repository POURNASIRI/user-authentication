import { createContext, useContext, useState } from "react";

const UserContext = createContext()


export const UserProvider = ({children})=>{

    const [userValid,setUserValid] = useState(false)
    

    return(
        <UserContext.Provider value={{userValid,setUserValid}}>
            {children}
        </UserContext.Provider>
    )

}

export const useUser = ()=>{
    return useContext(UserContext)   
}