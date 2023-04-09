export default function Layout({children}){
    return <div className="layout">
        {children}
    </div>
}

export function Container({children}){
    return <div className="w-[95%] mx-auto">
        {children}
    </div>
}