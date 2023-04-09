import ReactDom from 'react-dom'
export default function Modal({children, isOpen, onClose}) {
    if(!isOpen) return null
    return ReactDom.createPortal(
        <div className="bg-[rgba(0,0,0,.7)] h-screen w-screen fixed top-0 bottom-0 flex justify-center items-center">
           <div className="relative bg-skin-white h-[80%] w-[50%] max-w-4xl p-7 overflow-scroll rounded-sm">
                 <button onClick={onClose} className="absolute right-7">
                    Close
                </button>

                <div className="mt-11">
                    {children}
                </div>
            </div>
        </div>,
        document.getElementById('portal')
    ) 
}
