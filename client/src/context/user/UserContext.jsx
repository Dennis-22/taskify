import { createContext, useContext, useReducer, useEffect } from "react";
import { userReducer, state } from "./reducer";
import { _user } from "../../utils/constance";

const UserContext = createContext()

export default function UserProvider({children}){
    const [userState, userDispatch] = useReducer(userReducer, state)

    const value = {
        userState, userDispatch,
    }

    useEffect(()=>{
        // check if user is available in session storage
        const user = sessionStorage.getItem('user')
        if(user){
            userDispatch({type:_user.SIGN, payload:JSON.parse(user)})
        }
    },[])

    return <UserContext.Provider value={value}>
        {children}
    </UserContext.Provider>
}

export const useUserContext = ()=> useContext(UserContext)