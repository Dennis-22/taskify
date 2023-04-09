import { useNavigate, useLocation } from "react-router-dom"
import Button from "./Button"
import { _pages } from "../../utils/constance"

export default function Header(){
    const navigate = useNavigate()
    const location = useLocation()

    // don't show the header on the sign page
    if(location.pathname === _pages.SIGN) return null

    return <div className="px-11 py-5 flex justify-between items-center">
        <h1>Tasky</h1>

        <Button 
            text="Sign up"
            onClick={()=>navigate(_pages.SIGN)}
        />
    </div>
}