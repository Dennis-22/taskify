import {useLayoutEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import {useUserContext} from '../../context/user/UserContext'
import Input from "../global/Input"
import Button from "../global/Button"
import Loader from "../global/Loader"
import { loginRoute } from "../../utils/api"
import { _pages, _user } from "../../utils/constance"


export default function Login(){
    const {userDispatch, userState:{signedIn}} = useUserContext()
    const [userDetails, setUserDetails] = useState({email:"", password:""})
    const [process, setProcess] = useState({loading:false, error:""})
    const navigate = useNavigate()

    const handleChange = (text, name)=>{
        setProcess((cur)=> ({...cur, error:""})) //remove any error if there is
        setUserDetails((cur) => ({...cur, [name]:text}))
    }

    useLayoutEffect(()=>{
        // when user is already signed in redirect to dashboard
        if(signedIn === true) navigate(_pages.DASHBOARD)
    },[signedIn])

    const handleSubmit = async(e)=>{
        e.preventDefault()
        // check if all inputs are filled
        for(let field in userDetails){
            if(userDetails[field] === "") return setProcess({loading:false, error:`${field} is empty`})
        }
        setProcess({loading:true, error:""})
        try {
            const signUser = await loginRoute(userDetails)
            // store user info to session storage
            sessionStorage.setItem('user', JSON.stringify(signUser.data.data))
            userDispatch({type:_user.SIGN, payload:signUser.data.data})
            // the useLayoutEffect ensures the redirecting to user's dashboard
        } catch (error) {
            console.log(error)
            let errorResponse = error.response && error.response.data.message // if error from the backend
            setProcess({loading:false, error: errorResponse || 'An error occurred please try again'})
        }
    }


    return <form>
        {
            process.error &&
            <div className="my-7 bg-skin-red py-2 rounded-md"> 
                <p className="text-skin-red text-center">{process.error}</p>
            </div>
        }

        <div className="my-7">
            <Input 
                label="Email"
                placeholder="Email"
                type="email"
                value={userDetails.email} 
                handleChange={(text)=>handleChange(text, 'email')}
                className="my-5"
            />

            <Input 
                label="Password"
                placeholder="password"
                type="password"
                value={userDetails.password} 
                handleChange={(text)=>handleChange(text, 'password')}
                className="my-5"
            />
        </div>
        {
            process.loading ? <Loader loading={process.loading}/> :
            <Button 
                text="Log in"
                className="bg-skin-btn-blue mx-auto"
                onClick={handleSubmit}
                textClassName="text-skin-white-base"
            />
        }
    </form>
}