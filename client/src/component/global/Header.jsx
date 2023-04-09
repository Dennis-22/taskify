import Button from "./Button"

export default function Header(){
    return <div className="px-11 py-5 flex justify-between items-center">
        <h1>Tasky</h1>

        <Button 
            text="Sign up"
        />
    </div>
}