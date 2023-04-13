import { useNavigate, useLocation } from "react-router-dom"
import { useUserContext } from "../../context/user/UserContext"
import Button from "./Button"
import { _pages } from "../../utils/constance"

export default function Header(){
    const {userState:{user, signedIn}} = useUserContext()
    const navigate = useNavigate()
    const location = useLocation()

    const handleLogoPress = ()=>{
        // if user is sign-in move to dash board else move to landing page
        navigate(signedIn ? _pages.DASHBOARD : _pages.HOME)
    }

    // don't show the header on the sign page
    if(location.pathname === _pages.SIGN) return null

    return <div className="px-11 py-5 flex justify-between items-center bg-slate-600 shadow-md">
        <h1 onClick={handleLogoPress} className="text-2xl text-skin-white-base font-bold cursor-pointer">Tasky</h1>

        {
            signedIn ? <UserProfile user={user} navigate={navigate} location={location}/> : 
            
            <Button 
                text="Sign up"
                onClick={()=>navigate(_pages.SIGN)}
                className="bg-skin-white"
                textClassName="text-skin-black-base"
            />
        }
    </div>
}

function UserProfile({user, navigate, location}){

    // don't show the user avatar on the profile page
    if(location.pathname.split('/')[1] === _pages.PROFILE.split('/')[1]) return null

    return <div
        onClick={()=>navigate(`${_pages.PROFILE}/${user.username}`)} 
        className="h-10 w-10 flex justify-center items-center bg-skin-yellow cursor-pointer rounded-full shadow-lg"
    >
        <p className="text-xl font-semibold">{user.username.charAt(0).toUpperCase()}</p>
    </div>
}