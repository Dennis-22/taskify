import { useState } from "react"
import Input from "../global/Input"
import Button from "../global/Button"

export default function SignUp(){
    const [userDetails, setUserDetails] = useState({email:"", username: "", password:"", confirmPassword:""})
    const [process, setProcess] = useState({loading:false, error:""})
    
    const handleChange = (text, name)=>{
        setProcess((cur)=> ({...cur, error:""})) //remove any error if there is
        setUserDetails((cur) => ({...cur, [name]:text}))
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        setProcess((cur)=> ({...cur, error:"This is an error"}))
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
                placeholder="Email"
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