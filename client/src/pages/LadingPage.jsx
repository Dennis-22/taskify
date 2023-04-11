import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useUserContext } from "../context/user/UserContext"
import Button from "../component/global/Button"
import { _pages } from "../utils/constance"

export default function LadingPage(){
    const {userState:{signedIn}} = useUserContext()
    const navigate = useNavigate()

    useEffect(()=>{
        if(signedIn === true) navigate(_pages.DASHBOARD)
    },[signedIn])

    return  <div className="text-center py-11">
        <h1 className="my-12 font-semibold text-4xl block leading-normal">
            <span className="block">Get all your task organize</span>
            <span className="block">and well presented to you</span>
        </h1>
        <Button 
            text="Sign up"
        />
    </div>
}