import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTaskContext } from "../context/task/TasksContext";
import Button from "../component/global/Button";
import Tag from "../component/task/Tag";
import Modal from "../component/global/Modal";
import { _tasks, _pages, _toasts } from "../utils/constance";
import { notify } from "../component/global/Toast";

export default function TaskDetails() {
    const {taskState:{data}, taskDispatch} = useTaskContext()
    const [taskDetails, setTaskDetails] = useState({id:"", title:"", description:"", date:{start:"", end:""}})
    const [showDeleteTask, setShowDeleteTask] = useState(false)
    const [process, setProcess] = useState(false) //loading when getting the task from backend
    const {taskId} = useParams()
    const navigate = useNavigate()
    const {title, description, tag, date} = taskDetails

    const getTask = async()=>{
        setProcess(true)
        // if the task is not available locally, request from the backend
        let localTask = data.find(task => task.id === taskId)
        if(localTask) {
            setTaskDetails(localTask)
            setProcess(false)
            return
        }

        //task is not available locally
        console.log('fetching task')
    }

    const deleteTask = ()=>{
        taskDispatch({type:_tasks.DELETE_TASK, payload:taskId})
        notify(_toasts.SUCCESS, "Task deleted")
        navigate(_pages.DASHBOARD)
    }

    useEffect(()=>{
        getTask()
    },[])

    return <>
        <div className="w-[90%] max-w-sm my-10 mx-auto">
            {
                process ? <h1>Loading</h1> :

                <>
                    <h1 className="text-skin-black-base text-2xl font-semibold text-center">Task Details</h1>

                    <section className="my-4 bg-skin-white py-4 px-5 rounded-lg">
                        <p className="mb-2 text-xl font-medium">Title</p>
                        <p className="text-skin-black-muted">{title}</p>
                    </section>

                    <section className="my-4 bg-skin-white py-4 px-5 rounded-lg">
                        <p className="mb-2 text-xl font-medium">Description</p>
                        <p className="text-skin-black-muted">{description}</p>
                    </section>

                    <section className="my-4 bg-skin-white py-4 px-5 rounded-lg">
                        <p className="mb-2 text-xl font-medium">Tag</p>
                        <Tag tag={tag}/>
                    </section>

                    <section className="my-4 bg-skin-white py-4 px-5 rounded-lg">
                        <p className="mb-2 text-xl font-medium">Dates</p>
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
                    </section>

                    <div className="flex gap-4 justify-center mt-8">
                        <Button 
                            text="Edit task"
                            onClick={()=>navigate(`${_pages.EDIT_TASK}/${taskId}`)}
                            className="bg-skin-btn-blue"
                            textClassName="text-skin-white-base"
                        /> 

                        <Button 
                            text="Delete task"
                            onClick={()=>setShowDeleteTask(true)}
                            className="bg-skin-btn-red"
                            textClassName="text-skin-white-base"
                        /> 
                    </div>
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


function DeleteTask({isOpen, onClose, deleteTask}){
    return <Modal isOpen={isOpen}>
        <p className="text-2xl font-medium text-center">Delete Task</p>
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