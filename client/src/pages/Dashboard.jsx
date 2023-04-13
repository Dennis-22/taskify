import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TbFilesOff } from "react-icons/tb";
import { useUserContext } from "../context/user/UserContext";
import { useTaskContext } from "../context/task/TasksContext";
import { Container } from "../component/global/Layout";
import Button from '../component/global/Button'
import Task from "../component/task/Task";
import Loader from "../component/global/Loader";
import { _pages, _tasks, _user } from "../utils/constance";
import { useEffect } from "react";
import { getAllTasksRoute } from "../utils/api";
import Header from "../component/Dashboard/Header";

export default function Dashboard(){
    const {userState:{signedIn, user:{id, accessToken}}} = useUserContext()
    const {taskDispatch, taskState:{data, tasks, fetched}} = useTaskContext()
    const [process, setProcess] = useState({loading:false, error:""})
    const navigate = useNavigate()

    const getTasks = async()=>{
        if(fetched) return null //if the tasks have been fetched from the backend don't fetch again
        setProcess({loading:true, error:""})
        try {
            let request = await getAllTasksRoute(id, accessToken)
            let userTasks = request.data.data
            taskDispatch({type:_tasks.GET_TASKS, payload:userTasks})
            setProcess({loading:false, error:""})
        } catch (error) {
            let errorResponse = error.response && error.response.data.message // if error from the backend
            setProcess({loading:false, error:errorResponse || "Failed to get tasks"})
        }
    }

    useEffect(()=>{
        if(signedIn === false) navigate(_pages.HOME)
    },[signedIn])

    useEffect(()=>{
        getTasks()
    },[])

    return <Container>
        <Header />
        {
            process.loading ? <Loader className="mt-[150px]"/> :
            process. error ? <DisplayError getTasks={getTasks} error={process.error}/> :
            tasks.length === 0 ? <DisplayEmptyTasks
                // different messages based on whether user don't have any task or they don't have task on what they are filtering  
                text={data.length === 0 ? "You do not have any task" : "You do not have any task here"}
            /> :
            <DisplayTasks tasks={tasks}/>
        }
    </Container>
}

function DisplayTasks({tasks}){
    return <div className="w-[90%] mx-auto flex gap-4 flex-wrap justify-center">
        {tasks.map((task, idx) => <Task {...task} key={idx}/>)}
    </div>
}

function DisplayError({error, getTasks}){
    return <div className="mt-[150px] text-center">
        <p className="text-xl text-skin-black-muted">{error}</p>
        <Button 
            text="Retry"
            onClick={getTasks}
            className="mt-6 mx-auto bg-skin-btn-blue border border-bg-skin-btn-red"
            textClassName="text-skin-white-base"
        />
    </div>
}

function DisplayEmptyTasks({text}){
    return <div className="mt-[120px] text-center">
        <TbFilesOff className="inline text-7xl text-skin-black-muted"/>
        <p className="text-skin-black-muted mt-7">{text}</p>
    </div>
}