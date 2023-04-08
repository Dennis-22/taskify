
export default function Button({text, role, className, textClassName}){
    return <button 
        role={role || "button"}
        className={`button ${className}`}
    >
        <span className={`${textClassName}`}>{text}</span>
    </button>
}