import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import Input from "../global/Input";

export default function Filter() {
    const [keyword, setKeyword] = useState('')
    
    const handleChange = (text)=>{
        setKeyword(text)
    }

    return <div className="bg-orange-600">
        <Input 
            placeholder="Search a task" 
            value={keyword} 
            handleChange={handleChange}
            icon={<BsSearch className="text-skin-black-muted"/>}
        />
    </div>
}
