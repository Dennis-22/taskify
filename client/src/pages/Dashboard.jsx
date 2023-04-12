import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CgFolderAdd } from "react-icons/cg";
import { useUserContext } from "../context/user/UserContext";
import { useTaskContext } from "../context/task/TasksContext";
import { Container } from "../component/global/Layout";
import Filter from '../component/task/Filter'
import Button from '../component/global/Button'
import Task from "../component/task/Task";
import Loader from "../component/global/Loader";
import { _pages, _tasks, _user } from "../utils/constance";
import { useEffect } from "react";
import { getAllTasksRoute } from "../utils/api";

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
        <>       
            <p className="text-skin-black-base text-xl">Good Afternoon username</p>
            <div className="my-6 py-2 px-3 flex justify-between bg-slate-600">
                <Filter />
                <Button 
                    text="Create new"
                    className="bg-skin-btn-blue"
                    textClassName="text-skin-white-base"
                    onClick={()=>navigate(_pages.CREATE_TASK)}
                    icon={<CgFolderAdd className="text-skin-white-base"/>}
                />
            </div>

            {
                process.loading ? <Loader className="mt-[150px]"/> :
                process. error ? <DisplayError getTasks={getTasks}/> :
                tasks.length === 0 ? <DisplayEmptyTasks
                    // different messages based on whether user don't have any task or they don't have task on what they are filtering  
                    text={data.length === 0 ? "You do not have any task" : "You do not have any task here"}
                /> :
                <DisplayTasks />
            }

        </>
    </Container>
}

function DisplayTasks({tasks}){
    return <div className="w-[90%] mx-auto flex gap-4 flex-wrap justify-center">
        {tasks.map((task, idx) => <Task {...task} key={idx}/>)}
    </div>
}

function DisplayError({getTasks}){
    return <div className="mt-[150px] text-center">
        <p className="text-xl">{process.error}</p>
        <Button 
            text="Retry"
            onClick={getTasks}
            className="mt-6 mx-auto bg-skin-btn-blue border border-bg-skin-btn-red"
            textClassName="text-skin-white-base"
        />
    </div>
}

function DisplayEmptyTasks({text}){
    return <div>
        <TbFilesOff />
        <p>{text}</p>
    </div>
}