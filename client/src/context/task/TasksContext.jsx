import { createContext, useContext, useReducer } from "react";
import { taskReducer, state } from "./reducer";

const TaskContext = createContext()

export default function TaskProvider({children}){
    const [taskState, taskDispatch] = useReducer(taskReducer, state)

    const value = {
        taskState, taskDispatch,
    }

    return <TaskContext.Provider value={value}>
        {children}
    </TaskContext.Provider>
}

export const useTaskContext = ()=> useContext(TaskContext)