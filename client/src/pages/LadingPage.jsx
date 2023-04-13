import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useUserContext } from "../context/user/UserContext"
import { _pages } from "../utils/constance"

export default function LadingPage(){
    const {userState:{signedIn}} = useUserContext()
    const navigate = useNavigate()

    useEffect(()=>{
        if(signedIn === true) navigate(_pages.DASHBOARD)
    },[signedIn])

    return  <div className="px-7 text-center py-11">
        <h1 className="my-12 text-skin-black-base text-4xl font-semibold block leading-normal">
            <span className="block">Get all your task organize</span>
            <span className="block">and accessible anytime anywhere</span>
        </h1>
        
        <button
            onClick={()=>navigate(_pages.SIGN)}
            className="py-3 px-6 bg-skin-btn-blue text-skin-white-base text-lg font-semibold 
            cursor-pointer rounded-3xl shadow-md outline-none border-none"
        >
            Start organizing your tasks now
        </button>
    </div>
}