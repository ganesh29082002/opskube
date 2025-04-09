import axios from 'axios'
import {  toast } from 'react-toastify';

import axiosClient from './axiosInstance'
import { postData } from './AxiosApiCall'

export const register = async(data)=>{
    console.log(data ,"register")
    try {
    const result = await axiosClient.post('/api/v1/register' , data  )
    if(result?.status == 201){
        toast.success( result.message || "User Register successfully")
    }
    console.log(result , "result")
    return result
    } catch (error) {
            toast.success( error.message || "User Register Faild")
      
        console.log(error)
        return error
    }
}

export const login = async(data)=>{
    try {
    const result = await axiosClient.post('/api/v1/login' , data)
    console.log(result , "result")
    if(result?.status == "SUCCESS"){
        toast.success( result.message || "User Login successfully")
    }
    return result
    } catch (error) {
        console.log(error)
        return error.message
    }
}

export const loginWithGoogle = async(data)=>{
    try {
    const result = await postData('/api/loginWithGoogle/v1' , data)
    return result
  
    } catch (error) {
        console.log(error)
    }
}

