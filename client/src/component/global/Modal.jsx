import ReactDom from 'react-dom'
export default function Modal({children, isOpen}) {
    if(!isOpen) return null
    return ReactDom.createPortal(
        <div className="bg-[rgba(0,0,0,.7)] h-screen w-screen fixed top-0 bottom-0 flex justify-center items-center">
           <div className="bg-skin-white w-[90%] max-w-sm p-7 rounded-sm">
                {children}
            </div>
        </div>,
        document.getElementById('portal')
    ) 
}