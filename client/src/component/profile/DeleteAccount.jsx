import Modal from "../global/Modal";
import Input from "../global/Input";
import Button from "../global/Button";
export default function DeleteAccount({isOpen, onClose, deleteAccount}){
    return <Modal isOpen={isOpen}>
        <p className="text-xl text-center">Confirm account deletion</p>
        <p className="mt-3 text-skin-black-muted">All your data would be lost, proceed with caution</p>

        <Input 
            label="Enter your email"
            placeholder="Your email"
            className="my-5"
        />

       <div className="flex justify-center gap-4 mt-4">
            <Button 
                text="Delete"
                onClick={deleteAccount}
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