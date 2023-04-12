import Modal from "../global/Modal"
import Button from "../global/Button"
export default function LogoutAlert({logOut, isOpen, onClose}){
    return <Modal isOpen={isOpen}>
        <p className="text-lg text-skin-black-base font-medium text-center">Confirm Logout</p>
        <div className="flex justify-center gap-4 mt-6">
            <Button 
                text="Log out"
                onClick={logOut}
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
    </Modal>
}