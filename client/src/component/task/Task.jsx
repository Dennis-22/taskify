import { useNavigate } from "react-router-dom";
import { BsCalendarDate } from "react-icons/bs";
import Tag from "./Tag"
import { _pages } from "../../utils/constance";

export default function Task({id, title, description, tag, date}){
  const navigate = useNavigate()

  return <div
    onClick={()=>navigate(`${_pages.TASK_DETAILS}/${id}`)} 
    className="w-[95%] md:w-[90%] md:max-w-xs bg-skin-white p-2 rounded-lg cursor-pointer border border-gray-300 shadow-md hover:shadow-lg"
  >
    <p className="text-xl mb-1">{title}</p>
    <Tag tag={tag}/>
    <div className="my-3">
      <p className="text-skin-black-muted">{description}</p>
      <div className="flex items-center gap-2 mt-2">
        <BsCalendarDate />
        <p className="text-skin-black-muted text-sm">{date.start} - {date.end}</p>
      </div>
    </div>
  </div>
}
