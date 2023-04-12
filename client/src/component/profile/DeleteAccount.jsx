import { useState } from "react";
import { useUserContext } from "../../context/user/UserContext";
import Modal from "../global/Modal";
import Input from "../global/Input";
import Button from "../global/Button";
import Loader from '../global/Loader'
import { notify } from "../global/Toast";
import { _toasts } from "../../utils/constance";
import { deleteUserRoute } from "../../utils/api";

export default function DeleteAccount({isOpen, onClose}){
    const {userDispatch, userState:{user:{email, accessToken}}} = useUserContext()
    const [verifyEmail, setVerifyEmail] = useState('')
    const [process, setProcess] = useState({deleting:false, error:""})
    
    const handleChange = (text)=>{
        setVerifyEmail(text)
        setProcess({loading:false, error:""})
    }

    const handleDelete = async()=>{
        if(!verifyEmail) return setProcess({deleting:false, error:"Enter your email to delete"})
        if(verifyEmail !== email) return setProcess({deleting:false, error:"Email is incorrect"})
        
        try {
            await deleteUserRoute(accessToken)
            sessionStorage.removeItem('user')
            userDispatch({type:_user.LOG_OUT, payload:null})
        } catch (error) {
            console.log(error)
            notify(_toasts.ERROR, "Failed to delete profile")
        }
    }

    return <Modal isOpen={isOpen}>
        <p className="text-xl text-center">
            {process.deleting ? "Deleting your account" : "Confirm account deletion"}
        </p>

        {
            process.deleting ? <Loader className="my-20"/> :

            <>
                <p className="mt-3 text-skin-black-muted font-medium">All your data would be lost, proceed with caution</p>
            
                {process.error && 
                    <div className="my-4 bg-skin-red py-2 rounded-md"> 
                        <p className="text-skin-red text-center">{process.error}</p>
                    </div>
                }

                <Input 
                    label="Enter your email"
                    placeholder="Your email"
                    className="my-5"
                    value={verifyEmail}
                    handleChange={(text)=>handleChange(text)}
                />

            <div className="flex justify-center gap-4 mt-4">
                    <Button 
                        text="Delete"
                        onClick={handleDelete}
                        className="bg-skin-btn-blue"
                        textClassName="text-skin-white-base"
                    />
                    <Button 
                        text="Cancel"
                        onClick={onClose}
                        className="bg-skin-btn-red"
                        textClassName="text-skin-white-base"
                    />
                </div>
            </>
        }

    </Modal>
}