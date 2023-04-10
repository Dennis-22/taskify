import { useState } from "react"
import { Container } from "../component/global/Layout"
import Input from "../component/global/Input"
import Button from "../component/global/Button"
import Tag from "../component/task/Tag"
import {useTaskContext} from '../context/task/TasksContext'
import { _tasks } from "../utils/constance"

const _tags = [
    {id:'1', tag:'family'},
    {id:'1', tag:'personal'},
    {id:'1', tag:'work'},
]

export default function CreateTask() {
    const {taskDispatch} = useTaskContext()
    const [taskDetails, setTaskDetails] = useState({title:"", description:"", tag:"family", date:{start:"", end:""}})
    
    const handleChange = (text, name)=>{
        setTaskDetails((cur) => ({...cur, [name]:text}))
    }

    const handleDateChange = (e, pos)=>{
        setTaskDetails((cur)=> ({...cur, date:{...cur.date, [pos]:e.target.value}}))
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        taskDispatch({type:_tasks.ADD_TASK, payload:taskDetails})
    }

    return <Container>
        <div className="w-[90%] max-w-sm my-5 mx-auto">
            <h1 className="text-center text-skin-black-base text-xl">Create a task</h1>
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

                    <div className="my-3">
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
                    
                    <div className="my-3">
                        <p className="text-skin-black-muted mb-1">Set date</p>
                        <div className="m-2">
                            <p className="text-skin-black-muted text-sm mb-1">Start at</p>
                            <input type="date" placeholder="start at"
                                className="w-full p-2 border-2 border-skin-border-color"
                                onChange={(e)=>handleDateChange(e, 'start')}
                            />
                        </div>

                        <div className="m-2">
                            <p className="text-skin-black-muted text-sm mb-1">End at</p>
                            <input type="date" placeholder="start at"
                                className="w-full p-2 border-2 border-skin-border-color"
                                onChange={(e)=>handleDateChange(e, 'end')}
                            />
                        </div>
                    </div>
                </div>
                <Button 
                    text="Create task"
                    className="mx-auto bg-skin-btn-blue"
                    onClick={handleSubmit}
                    textClassName="text-skin-white-base"
                />
            </form>
        </div>
    </Container>
}
