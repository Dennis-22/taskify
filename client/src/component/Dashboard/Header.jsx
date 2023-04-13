import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { CgFolderAdd } from "react-icons/cg";
import { useUserContext } from "../../context/user/UserContext";
import { useTaskContext } from "../../context/task/TasksContext";
import Input from "../global/Input"
import Button from "../global/Button"
import { _tasks, _pages } from "../../utils/constance";

const hours = new Date().getHours()
function greetUser(username){
    if(hours < 12) return `Good morning ${username}`
    if(hours >= 12 && hours < 17) return `Good afternoon ${username}`
    if(hours >= 17) return `Good evening ${username}`
}

export default function Header(){
    const {userState:{user:{username}}} = useUserContext()
    const {taskDispatch} = useTaskContext()
    const [keyword, setKeyword] = useState('')
    const navigate = useNavigate()
    
    const handleChange = (text)=>{
        setKeyword(text)
        taskDispatch({type:_tasks.SEARCH, payload:text})
    }
    
    return <section className="my-6">
        <p className="mb-3 text-skin-black-base text-xl font-semibold">{greetUser(username)}</p>
        <div className="py-2 px-3 flex justify-between flex-col sm:flex-row gap-5 sm:gap-0 
            bg-skin-white rounded-lg shadow-lg">
            <Input 
                placeholder="Search a task by title" 
                value={keyword} 
                handleChange={handleChange}
                icon={<BsSearch className="text-skin-black-muted"/>}
            />
            <Button 
                text="Create new"
                className="bg-skin-btn-blue w-fit"
                textClassName="text-skin-white-base"
                onClick={()=>navigate(_pages.CREATE_TASK)}
                icon={<CgFolderAdd className="text-skin-white-base"/>}
            />
        </div>
    </section>
}