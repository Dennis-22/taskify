import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import {useTaskContext} from '../context/task/TasksContext'
import Input from "../component/global/Input"
import Button from "../component/global/Button"
import Tag from "../component/task/Tag"
import { notify } from "../component/global/Toast"
import { _pages, _tasks, _toasts } from "../utils/constance"

const _tags = [
    {id:'1', tag:'family'},
    {id:'1', tag:'personal'},
    {id:'1', tag:'work'},
]

export default function EditTask() {
    const {taskState:{data}, taskDispatch} = useTaskContext()
    const [taskDetails, setTaskDetails] = useState({title:"", description:"", tag:"", date:{start:"", end:""}})
    const [process, setProcess] = useState(false) //loading
    const {taskId} = useParams()
    const navigate = useNavigate()


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


    const handleChange = (text, name)=>{
        setTaskDetails((cur) => ({...cur, [name]:text}))
    }

    const handleDateChange = (e, pos)=>{
        setTaskDetails((cur)=> ({...cur, date:{...cur.date, [pos]:e.target.value}}))
    }

    const handleSubmit = async(e)=>{
        e.preventDefault()
        // check if all values are provided
        if(!taskDetails.title) return notify(_toasts.ERROR, "Give the task a title")
        if(!taskDetails.description) return notify(_toasts.ERROR, "Give the task a description")
        if(!taskDetails.tag) return notify(_toasts.ERROR, "Select a tag fot the task")
        if(!taskDetails.date.start) return notify(_toasts.ERROR, "Select when the task should start")
        if(!taskDetails.date.end) return notify(_toasts.ERROR, "Select when the task should end")
        
        setProcess(true)
        try {
            
            taskDispatch({type:_tasks.ADD_TASK, payload:taskDetails})
            navigate(_pages.DASHBOARD)
        } catch (error) {
            console.log(error)
            let errorResponse = error.response && error.response.data.message // if error from the backend
            setProcess(false)
            notify(_toasts.ERROR, errorResponse || 'An error occurred please try again' )
        }
    }

    useEffect(()=>{
        getTask()
    },[])

    return <div className="w-[90%] max-w-sm my-10 mx-auto">
        <h1 className="text-center text-skin-black-base text-xl">Edit task</h1>
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
                process ? <h1>Loading</h1> :
                <Button 
                    text="Create task"
                    className="mx-auto bg-skin-btn-blue"
                    onClick={handleSubmit}
                    textClassName="text-skin-white-base"
                />
            }
        </form>
    </div>
    
}