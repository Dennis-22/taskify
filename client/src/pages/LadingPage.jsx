import Header from "../component/global/Header"
import Button from "../component/global/Button"
export default function LadingPage(){
    return <>
        <Header />    
        <div className="text-center py-11">
            <h1 className="my-12 font-semibold text-4xl block leading-normal">
                <span className="block">Get all your task organize</span>
                <span className="block">and well presented to you</span>
            </h1>
            <Button 
                text="Sign up"
            />
        </div>
    </> 
}