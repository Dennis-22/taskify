import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BsTextareaT, BsCalendarDate } from "react-icons/bs";
import { AiOutlineTags } from "react-icons/ai";
import { MdOutlineDescription } from "react-icons/md";
import { useUserContext } from "../context/user/UserContext";
import { useTaskContext } from "../context/task/TasksContext";
import Button from "../component/global/Button";
import Tag from "../component/task/Tag";
import Modal from "../component/global/Modal";
import Loader from "../component/global/Loader";
import { notify } from "../component/global/Toast";
import { _tasks, _pages, _toasts } from "../utils/constance";
import { deleteTasksRoute, findATaskRoute } from "../utils/api";

export default function TaskDetails() {
    const {userState:{user:{accessToken}}} = useUserContext()
    const {taskState:{data}, taskDispatch} = useTaskContext()
    const [taskDetails, setTaskDetails] = useState({id:"", title:"", description:"", date:{start:"", end:""}})
    const [showDeleteTask, setShowDeleteTask] = useState(false)
    const [process, setProcess] = useState({getting:false, deleting:false}) //loading when getting the task from backend 
    const {taskId} = useParams()
    const navigate = useNavigate()
    const {title, description, tag, date} = taskDetails

    const getTask = async()=>{
        setProcess({getting:true, deleting:false})
        // if the task is not available locally, request from the backend
        let localTask = data.find(task => task.id === taskId)
        if(localTask) {
            setTaskDetails(localTask)
            setProcess({getting:false, deleting:false})
            return
        }

        //task is not available locally
        try {
            let request = await findATaskRoute(taskId, accessToken)
            let task = request.data.data
            setTaskDetails(task)
            setProcess({getting:false, deleting:false})
        } catch (error) {
            notify(_toasts.ERROR, "Failed to get task")
            navigate(_pages.DASHBOARD)
        }
        
    }

    const deleteTask = async()=>{
        setProcess({getting:false, deleting:true})
        setShowDeleteTask(false)
        try {
            await deleteTasksRoute(taskId, accessToken)
            taskDispatch({type:_tasks.DELETE_TASK, payload:taskId})
            notify(_toasts.SUCCESS, "Task deleted")
            navigate(_pages.DASHBOARD)
        } catch (error) {
            setProcess({getting:false, deleting:false})
            notify(_toasts.ERROR, "Failed to delete task")
        }
    }

    useEffect(()=>{
        getTask()
    },[])

    return <>
        <div className="w-[90%] max-w-sm my-10 mx-auto">
            <h1 className="text-skin-black-base text-2xl font-semibold text-center">Task Details</h1>
            {
                process.getting ? <Loader className="mt-40"/>    
                :
                <>
                    <DetailsWrap title="Title"text={title} icon={<BsTextareaT className="text-[18px]"/>}/>

                    <DetailsWrap 
                        title="Description"
                        text={description} 
                        icon={<MdOutlineDescription className="text-[18px]"/>}
                    />

                    <DetailsWrap 
                        renderComponent={
                            <>
                                <p className="mb-2 flex items-center gap-2 text-skin-black-base">
                                    <AiOutlineTags className="text-skin-black-base text-[18px]"/>
                                    <span className="text-xl font-medium">Tag</span>
                                </p>
                                <Tag tag={tag}/>
                            </>
                        }
                    />

                    <DetailsWrap 
                        renderComponent={
                            <>
                                <p className="mb-2 flex items-center gap-2 text-skin-black-base">
                                    <BsCalendarDate className="text-[18px]"/>
                                    <span className="text-xl font-medium">Dates</span>
                                </p>
                                <div className="px-4">
                                    <p className="text-skin-black-muted">
                                        <span>Starts at - </span>
                                        <span>{date.start}</span>
                                    </p>

                                    <p className="text-skin-black-muted">
                                        <span>Ends at - </span>
                                        <span>{date.end}</span>
                                    </p>
                                </div>
                            </>
                        }
                    />

                    {
                        process.deleting ? <Loader className="mt-10"/>
                        :
                        <div className="mt-8 flex gap-4 sm:gap-0 flex-col sm:flex-row ">
                            <Button 
                                text="Edit task"
                                onClick={()=>navigate(`${_pages.EDIT_TASK}/${taskId}`)}
                                className="bg-skin-btn-blue w-fit mx-auto"
                                textClassName="text-skin-white-base"
                            /> 

                            <Button 
                                text="Delete task"
                                onClick={()=>setShowDeleteTask(true)}
                                className="bg-skin-btn-red w-fit mx-auto"
                                textClassName="text-skin-white-base"
                            /> 
                        </div>
                    }                    

                </>
            }
        </div>

        {showDeleteTask && <DeleteTask 
                isOpen={showDeleteTask} 
                onClose={()=>setShowDeleteTask(false)}
                deleteTask={deleteTask}
            />
        }
    </>
}

function DetailsWrap({renderComponent=null, title, text, icon}){

    return <div className="my-4 bg-skin-white py-4 px-5 rounded-lg border border-gray-300">
        {
            renderComponent ? renderComponent :
            <>
                <p className="mb-2 flex items-center gap-2 text-skin-black-base">
                    {icon}
                    <span className="text-xl text-skin-black-base font-medium">{title}</span>
                </p>
                <p className="text-skin-black-muted">{text}</p>
            </>
        }
        
    </div>
}

function DeleteTask({isOpen, onClose, deleteTask}){
    return <Modal isOpen={isOpen}>
        <p className="text-lg text-skin-black-base font-medium text-center">Delete Task</p>
        <div className="flex justify-center gap-4 mt-6">
            <Button 
                text="Delete"
                onClick={deleteTask}
                className="bg-skin-btn-blue"
                textClassName="text-skin-white-base"
            />
            <Button 
                text="Cancel"
                onClick={onClose}
                className="bg-slate-600"
                textClassName="text-skin-white-base"
            />
        </div>
    </Modal>
}