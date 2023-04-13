import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/user/UserContext";
import {Container} from '../component/global/Layout'
import Button from "../component/global/Button";
import LogoutAlert from "../component/profile/LogoutAlert";
import DeleteAccount from "../component/profile/DeleteAccount";
import Input from "../component/global/Input";
import Loader from "../component/global/Loader";
import { notify } from "../component/global/Toast"
import { _pages, _toasts, _user } from "../utils/constance";
import { editUserRoute } from "../utils/api";

export default function Profile() {
    const {userState:{user}, userDispatch} = useUserContext()
    const [showLogoutAlert, setShowLogoutAlert] = useState(false)
    const [showDeleteAccount, setShowDeleteAccount] = useState(false)
    const [updateDetails, setUpdateDetails] = useState({username:"", password:""})
    const [process, setProcess] = useState(false) //loading when updating profile
    const navigate = useNavigate()
    const {username, email, accessToken} = user

    const logOut = ()=>{
        sessionStorage.removeItem('user')
        userDispatch({type:_user.LOG_OUT, payload:null})
        navigate(_pages.HOME)
    }

    const updateProfile = async()=>{
        if(!updateDetails.username && !updateDetails.password) return notify(_toasts.ERROR, "Provide username or password to update")
        let sendUpdate = updateDetails

        // remove the empty values so they don't overwrite whats in the database 
        for(let field in sendUpdate){
            if(sendUpdate[field] === "") delete sendUpdate[field]
        }
        setProcess(true)
        try {
            let request = await editUserRoute(sendUpdate, accessToken)
            let response = request.data.data
            if(response.hasOwnProperty('username')){
                // username was update 
                userDispatch({type:_user.UPDATE_USERNAME, payload:response.username})
            }
            setUpdateDetails({username:"", password:""})
            setProcess(false)
            notify(_toasts.SUCCESS, "Profile updated")
        } catch (error) {
            setProcess(false)
            notify(_toasts.ERROR, "Failed to update profile")
        }
        // console.log(updateDetails.username)
    }

    return <>    
        <Container>
            <div className="w-[90%] md:w-5/12 max-w-sm mx-auto my-10">
                <section className="text-center">
                    <div className="h-20 w-20 flex justify-center items-center mx-auto mb-5 bg-white rounded-full shadow-lg">
                        <p>{username.charAt(0).toUpperCase()}</p>
                    </div>
                    
                    <p className="text-xl text-skin-black-base font-medium">{username}</p>
                    <p className="text-lg text-skin-black-base font-medium">{email}</p>
                </section>

                <section className="my-14">
                    <p className="mb-5 text-lg text-skin-black-base">Edit your account</p>
                    <Input 
                        placeholder="username"
                        label="Enter your new username"
                        value={updateDetails.username}
                        handleChange={(text)=> setUpdateDetails((cur) => ({...cur, username:text}))}
                        className="mb-5 w-full"
                    />

                    <Input 
                        placeholder="New password"
                        label="Enter your password username"
                        value={updateDetails.password}
                        handleChange={(text)=> setUpdateDetails((cur) => ({...cur, password:text}))}
                        className="mb-5 w-full"
                    />
                    {
                        process ? <Loader /> :
                        <Button 
                            text="Update"
                            className="bg-skin-btn-blue mx-auto"
                            textClassName="text-skin-white-base"
                            onClick={updateProfile}
                        />
                    }
                </section>

                <section>
                    <p className="mb-5 text-skin-black-base text-lg text-center">Security</p>
                    <div className="flex gap-4 justify-center">
                        <Button 
                            text="Logout"
                            onClick={()=>setShowLogoutAlert(true)}
                            className="bg-slate-600"
                            textClassName="text-skin-white-base"
                        /> 

                        <Button 
                            text="Delete account"
                            onClick={()=>setShowDeleteAccount(true)}
                            className="bg-skin-btn-red"
                            textClassName="text-skin-white-base"
                        /> 
                    </div>
                </section>
            </div>

        </Container>

        {showLogoutAlert && <LogoutAlert 
                logOut={logOut} 
                isOpen={showLogoutAlert} 
                onClose={()=>setShowLogoutAlert(false)}
            />
        }

        {showDeleteAccount && <DeleteAccount 
                onClose={()=>setShowDeleteAccount(false)}
                isOpen={showDeleteAccount}
            />

        }
    </>
}