import { BsCalendarDate } from "react-icons/bs";
import Tag from "./Tag"
export default function Task({title, description, tag, date}){
  return <div className="w-[22%] bg-skin-white p-2 rounded-lg cursor-pointer border border-gray-300 shadow-md hover:shadow-lg">
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
