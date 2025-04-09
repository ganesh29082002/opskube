import {  toast } from 'react-toastify';
export const showToastMessage = (type , messages) => {
    if(type == 'success')toast.success(messages)
    if(type == 'error')toast.error(messages)
    if(type == 'info')toast.info(messages)

  };