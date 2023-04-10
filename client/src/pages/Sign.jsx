import { useState } from "react"
import SignUp from "../component/sign/SignUp"
import Login from "../component/sign/Login"

const _authTypes = {
    login:'Login',
    signUp:"sign-up"
}

export default function Sign(){
    const [authType, setAuthType] = useState(_authTypes.login)

    return <div className="h-screen flex justify-center items-center py-7">
        <div className="w-[90%] max-w-sm mx-auto">        
            <h1 className="text-center text-skin-black-base text-2xl font-semibold">
                {authType === _authTypes.login ? "Login To Taskify" : "Sign up to Taskify"}
            </h1>

           
            {authType === _authTypes.login ? <Login /> : <SignUp />}
           

            <div className="text-center my-6">
                {
                    authType === _authTypes.login ? 
                    <>
                        <p className="text-skin-black-muted mb-2">Don't have an account ? </p>
                        <button onClick={()=>setAuthType(_authTypes.signUp)}>Create an account</button>
                    </> 
                    :
                    <>
                        <p className="text-skin-black-muted mb-2">Already have an account ? </p>
                        <button onClick={()=>setAuthType(_authTypes.login)}>Sign in to your account</button>
                    </>
                }
            </div>
        </div>

    </div>
}