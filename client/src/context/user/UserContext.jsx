import { createContext, useContext, useReducer } from "react";
import { userReducer, state } from "./reducer";

const UserContext = createContext()

export default function UserProvider({children}){
    const [userState, userDispatch] = useReducer(userReducer, state)

    const value = {
        userState, userDispatch,
    }

    return <UserContext.Provider value={value}>
        {children}
    </UserContext.Provider>
}

export const useUserContext = ()=> useContext(UserContext)