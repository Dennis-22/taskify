import { useNavigate } from "react-router-dom";
import { MdOutlineDescription } from "react-icons/md";
import { BsCalendarDate } from "react-icons/bs";
import Tag from "./Tag"
import { _pages } from "../../utils/constance";

export default function Task({id, title, description, tag, date}){
  const navigate = useNavigate()

  return <div
    onClick={()=>navigate(`${_pages.TASK_DETAILS}/${id}`)} 
    className="w-[95%] md:w-[90%] md:max-w-xs bg-skin-white p-2 rounded-lg cursor-pointer border border-gray-300 shadow"
  >
    <p className="mb-1 text-xl text-skin-black-base font-medium">{title}</p>
    <Tag tag={tag}/>
    <div className="my-3">
      <div className="flex gap-2 items-center">
        <MdOutlineDescription className="text-skin-black-base text-[18px]"/>
        <p className="text-skin-black-muted">{description}</p>
      </div>
      <div className="flex items-center gap-2 mt-2">
        <BsCalendarDate className="text-skin-black-base"/>
        <p className="text-skin-black-muted text-sm">{date.start} - {date.end}</p>
      </div>
    </div>
  </div>
}
