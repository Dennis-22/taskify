import { useLayoutEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import {useUserContext} from '../../context/user/UserContext'
import Input from "../global/Input"
import Button from "../global/Button"
import { signUpRoute } from "../../utils/api"
import { _user, _pages } from "../../utils/constance"

export default function SignUp(){
    const {userDispatch, userState:{signedIn}} = useUserContext()
    const [userDetails, setUserDetails] = useState({email:"", username: "", password:"", confirmPassword:""})
    const [process, setProcess] = useState({loading:false, error:""})
    const navigate = useNavigate()
    
    const handleChange = (text, name)=>{
        setProcess((cur)=> ({...cur, error:""})) //remove any error if there is
        setUserDetails((cur) => ({...cur, [name]:text}))
    }

    const handleSubmit = async(e)=>{
        e.preventDefault()
        // check if all inputs are filled
        for(let field in userDetails){
            if(userDetails[field] === "") return setProcess({loading:false, error:`${field} is empty`})
        }
        if(userDetails.password !== userDetails.confirmPassword) return setProcess({loading:false, error:"Password does not match with confirm password"})

        setProcess({loading:true, error:""})

        try {
            const registerUser = await signUpRoute(userDetails)
            userDispatch({type:_user.SIGN, payload:registerUser.data.data})
        } catch (error) {
            console.log(error)
            let errorResponse = error.response && error.response.data.message // if error from the backend
            setProcess({loading:false, error: errorResponse || 'An error occurred please try again'})
        }
    }

    useLayoutEffect(()=>{
        // when user is already signed in redirect to dashboard
        if(signedIn === true) navigate(_pages.DASHBOARD)
    },[signedIn])

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
                value={userDetails.email} 
                handleChange={(text)=>handleChange(text, 'email')}
                className="my-5"
            />

            <Input 
                label="Username"
                placeholder="username"
                value={userDetails.username} 
                handleChange={(text)=>handleChange(text, 'username')}
                className="my-5"
            />

            <Input 
                label="Password"
                placeholder="password"
                value={userDetails.password} 
                handleChange={(text)=>handleChange(text, 'password')}
                className="my-5"
            />

            <Input 
                label="Confirm Password"
                placeholder="Confirm password"
                value={userDetails.confirmPassword} 
                handleChange={(text)=>handleChange(text, 'confirmPassword')}
                className="my-5"
            />
        </div>
        <Button 
            text="Sign up"
            className="bg-skin-btn-blue mx-auto"
            onClick={handleSubmit}
            textClassName="text-skin-white-base"
        />
    </form>
}