import toast, { Toaster } from 'react-hot-toast';
import { _toasts} from '../../utils/constance'

// error, success, loading 
const toastOptions = {
  duration:3000,
  position:'bottom-left'
}


// export const notify = () => toast.loading('Here is your toast.', {
//   if()
// });

export const notify = (status, text)=>{
  if(status === _toasts.SUCCESS) return toast.success(text, toastOptions)
  if(status === _toasts.ERROR) return toast.error(text, toastOptions)
  if(status === _toasts.WARNING) return toast.warn(text, toastOptions)
}

export default function Toast(){
  return <Toaster />
};