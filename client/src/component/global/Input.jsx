
export default function Input({label, type, icon, value, handleChange, placeholder, className}){
    return <div className={`${className} rounded-lg`}>
        {label && <p className="mb-1 text-skin-black-muted">{label}</p>}
        <div className="flex items-center gap-2 bg-white p-2 rounded-md border-2 border-skin-border-color">
            {icon && icon}
            <input
                type={type || "text"}
                placeholder={placeholder} 
                value={value} 
                onChange={(e)=>handleChange(e.target.value)}
                className="flex-1 outline-none border-none"
            />
        </div>
    </div>
}