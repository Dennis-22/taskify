import { createContext, useContext, useReducer } from "react";
import { reducer, state } from "./reducer";

const TaskContext = createContext()

export default function TaskProvider({children}){
    return <TaskContext.Provider>
        {children}
    </TaskContext.Provider>
}

export const useTaskContext = ()=> useContext(TaskContext)