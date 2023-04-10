import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/user/UserContext";
import {Container} from '../component/global/Layout'
import Button from "../component/global/Button";
import LogoutAlert from "../component/profile/LogoutAlert";
import DeleteAccount from "../component/profile/DeleteAccount";
import { _pages, _user } from "../utils/constance";
import Input from "../component/global/Input";

export default function Profile() {
    const {userState:{user}, userDispatch} = useUserContext()
    const [showLogoutAlert, setShowLogoutAlert] = useState(false)
    const [showDeleteAccount, setShowDeleteAccount] = useState(false)
    const navigate = useNavigate()
    const {username, email} = user

    const logOut = ()=>{
        userDispatch({type:_user.LOG_OUT, payload:null})
        navigate(_pages.HOME)
    }

    const deleteAccount = ()=>{

    }

    return <>    
        <Container>
            <div className="w-[90%] md:w-5/12 max-w-sm mx-auto">
                <section className="text-center">
                    <div className="h-20 w-20 flex justify-center items-center mx-auto mb-5 bg-white rounded-full shadow-lg">
                        <p>{username.charAt(0)}</p>
                    </div>
                    
                    <p className="text-xl">{username}</p>
                    <p className="text-lg ">{email}</p>
                </section>

                <section className="my-14">
                    <p className="text-center mb-5">Edit your account</p>
                    <Input 
                        placeholder={username}
                        label="Enter your new username"
                        className="mb-5 w-full"
                    />

                    <Button 
                        text="Update"
                        className="bg-skin-btn-blue mx-auto"
                        textClassName="text-skin-white-base"
                    />
                </section>

                <section>
                    <p className="text-center mb-5">Security</p>
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
                deleteAccount={deleteAccount}
            />

        }
    </>
}