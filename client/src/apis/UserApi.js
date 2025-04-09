import axios from 'axios'
import { getData, postData, putData } from './AxiosApiCall'
import axiosClient from './axiosInstance'

export const createUser = async(data , token)=>{
    console.log(data ,"register")
    try {
    const result = await axiosClient.post('/api/v1/createUser' , data)
    console.log(result , "result")
    return result.data
    } catch (error) {
        console.log(error)
    }
}


export const updateuser = async(data , token)=>{
    console.log(data ,"register")
    try {
    const result = await putData(`/api/updateUser/v1/`, data , token)
    console.log(result , "result")
    return result
    } catch (error) {
        console.log(error)
    }
}


export const fetchAllUser = async( pageNumber,pageLimit ,data , token)=>{
    try {
    const result = await getData(`/api/fetchUser/v1/${pageNumber}/${pageLimit}/${data}/` , token)
    console.log(result , "result")
    return result
    } catch (error) {
        console.log(error)
        return error.message
    }
}



export const fetchUserDetails = async(data ,token)=>{
    try {
    const result = await getData(`/api/fetchUserById/v1/${data}` , token)
    console.log(result , "result")
    return result
    return result
    } catch (error) {
        console.log(error)
        return error.message
    }
}