import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useUserContext } from "../context/user/UserContext"
import {useTaskContext} from '../context/task/TasksContext'
import Input from "../component/global/Input"
import Button from "../component/global/Button"
import Tag from "../component/task/Tag"
import Loader from '../component/global/Loader'
import { notify } from "../component/global/Toast"
import { _pages, _tasks, _toasts } from "../utils/constance"
import { editTaskRoute } from "../utils/api"

const _tags = [
    {id:'1', tag:'family'},
    {id:'1', tag:'personal'},
    {id:'1', tag:'work'},
]

export default function EditTask() {
    const {userState:{user:{accessToken}}} = useUserContext()
    const {taskState:{data}, taskDispatch} = useTaskContext()
    const [taskDetails, setTaskDetails] = useState({title:"", description:"", tag:"", date:{start:"", end:""}})
    const [process, setProcess] = useState({getting:false, editing:false}) //loading
    const {taskId} = useParams()
    const navigate = useNavigate()


    const getTask = async()=>{
        setProcess({getting:true, editing:false})
        // if the task is not available locally, request from the backend
        const localTask = data.find(task => task.id === taskId)
        if(localTask) {
            let {title, description, tag, date} = localTask
            setTaskDetails({title, description, tag, date})
            setProcess({getting:false, editing:false})
            return
        }

        //task is not available locally
        setProcess({getting:true, editing:false})
        try {
            let request = await findATaskRoute(taskId, accessToken)
            const task = request.data.data
            let {title, description, tag, date} = task
            setTaskDetails({title, description, tag, date})
            setProcess({getting:false, editing:false})
        } catch (error) {
            notify(_toasts.ERROR, "Failed to get task")
            navigate(_pages.DASHBOARD)
        }
    }


    const handleChange = (text, name)=>{
        setTaskDetails((cur) => ({...cur, [name]:text}))
    }

    const handleDateChange = (e, field)=>{
        setTaskDetails((cur)=> ({...cur, date:{...cur.date, [field]:e.target.value}}))
    }

    const handleSubmit = async(e)=>{
        e.preventDefault()
       
        // remove empty values so they do not overwrite the ones in the db
        let sendUpdate = taskDetails
        for(let field in sendUpdate){
            if(sendUpdate[field] === "") delete sendUpdate[field]
        }

        setProcess({getting:false, editing:true})
        try {
            await editTaskRoute(taskId, sendUpdate, accessToken)
            taskDispatch({type:_tasks.EDIT_TASK, payload:{data:sendUpdate, id:taskId}})
            notify(_toasts.SUCCESS, "Task updated")
            navigate(_pages.DASHBOARD)
        } catch (error) {
            console.log(error)
            let errorResponse = error.response && error.response.data.message // if error from the backend
            setProcess({getting:false, editing:false})
            notify(_toasts.ERROR, errorResponse || 'An error occurred please try again' )
        }
    }

    useEffect(()=>{
        getTask()
    },[])

    return <div className="w-[90%] max-w-sm my-10 mx-auto">
        <h1 className="text-skin-black-base text-2xl font-semibold text-center">Edit task</h1>

        {
            process.getting ? <Loader className="mt-40"/> :
            <form>
                <div className="my-7">
                    <Input 
                        label="Title"
                        placeholder="Title"
                        value={taskDetails.title} 
                        handleChange={(text)=>handleChange(text, 'title')}
                        className="my-5"
                    />

                    <div className="my-5">
                        <p className="text-gray-500 mb-1">Description</p>
                        <textarea
                            value={taskDetails.description}
                            onChange={(e)=>handleChange(e.target.value, 'description')}
                            className="resize-none w-full h-32 p-2 border-2 border-skin-border-color"
                        >
                        </textarea>
                    </div>

                    <div className="my-5">
                        <p className="text-skin-black-muted mb-1">Select a tag</p>
                        <div className="flex gap-2">
                            {_tags.map((tag, idx) => (<div 
                                key={idx}
                                onClick={()=>setTaskDetails((cur) => ({...cur, tag:tag.tag}))}
                                className={`cursor-pointer ${taskDetails.tag === tag.tag && 'scale-125 mx-2'} hover:scale-110`}
                            >
                                    <Tag {...tag}/>
                                </div>) 
                            )}
                        </div>
                    </div>
                    
                    <div className="my-5">
                        <p className="text-skin-black-muted mb-1">Set date</p>
                        <div className="m-2">
                            <p className="text-skin-black-muted text-sm mb-1">Start at</p>
                            <input type="date" placeholder="start at"
                                value={taskDetails.date.start}
                                className="w-full p-2 border-2 border-skin-border-color"
                                onChange={(e)=>handleDateChange(e, 'start')}
                            />
                        </div>

                        <div className="m-2">
                            <p className="text-skin-black-muted text-sm mb-1">End at</p>
                            <input type="date" placeholder="start at"
                                value={taskDetails.date.end}
                                className="w-full p-2 border-2 border-skin-border-color"
                                onChange={(e)=>handleDateChange(e, 'end')}
                            />
                        </div>
                    </div>
                </div>
                {
                    process.editing ?  <Loader />
                    :
                    <Button 
                        text="Update task"
                        className="mx-auto bg-skin-btn-blue"
                        onClick={handleSubmit}
                        textClassName="text-skin-white-base"
                    />
                }
            </form>
        }

    </div>
    
}
