// import { FaShoppingCart } from "react-icons/fa";

export default function Button({text, icon, role, className, textClassName, onClick}){
    return <button 
        role={role || "button"}
        className={`button flex items-center gap-2 ${className}`}
        onClick={onClick}
    >
        {icon && icon}
        <span className={`${textClassName}`}>{text}</span>
        {/* <FaShoppingCart className='cart-basket'/> */}
    </button>
}