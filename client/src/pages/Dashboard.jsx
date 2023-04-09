import { useNavigate } from "react-router-dom";
import { CgFolderAdd } from "react-icons/cg";
import { useTaskContext } from "../context/task/TasksContext";
import { Container } from "../component/global/Layout";
import Filter from '../component/task/Filter'
import Button from '../component/global/Button'
import Task from "../component/task/Task";
import { _pages } from "../utils/constance";

export default function Dashboard(){
    const {taskState:{tasks}} = useTaskContext()
    const navigate = useNavigate()
    return <Container>
        <p className="text-skin-black-base text-xl">Good Afternoon username</p>
        <div className="my-6 py-2 px-3 flex justify-between bg-slate-600">
            <Filter />
            <Button 
                text="Create new"
                className="bg-skin-btn-blue"
                textClassName="text-skin-white-base"
                onClick={()=>navigate(_pages.CREATE)}
                icon={<CgFolderAdd className="text-skin-white-base"/>}
            />
        </div>
        <div className="w-[90%] mx-auto flex gap-4 flex-wrap">
            {tasks.map((task, idx) => <Task {...task} key={idx}/>)}
        </div>
    </Container>
}