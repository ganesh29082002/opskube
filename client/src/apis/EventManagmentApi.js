import axios from 'axios'
import {  toast } from 'react-toastify';

import axiosClient from './axiosInstance'


export const fetchEvents = async(data)=>{
    console.log(data ,"Fetch events")
    try {
    const result = await axiosClient.get('/api/v1/events', {params : data})
    console.log(result , "result")
    return result
    } catch (error) {
            toast.success( error.message || "Event Fetch Faild")
      
        console.log(error)
        return error
    }
}

export const fetchAllEvents = async(data)=>{
    console.log(data ,"Fetch fetchAllEvents")
    try {
    const result = await axiosClient.get('/api/v1/all-events', {params : data})
    console.log(result , "result<><><")
    return result
    } catch (error) {
            toast.success( error.message || "Event Fetch Faild")
      
        console.log(error)
        return error
    }
}

export const fetchRegisterEvents = async(data)=>{
    console.log(data ,"Fetch fetchAllEvents")
    try {
    const result = await axiosClient.get('/api/v1/user/rsvp', {params : data})
    console.log(result , "result<><><")
    return result
    } catch (error) {
            toast.success( error.message || "Event Fetch Faild")
      
        console.log(error)
        return error
    }
}


export const createEvent = async(data)=>{
    console.log(data ,"createEvent")
    try {
    const result = await axiosClient.post('/api/v1/event' , data)
    if(result?.status == "SUCCESS"){
        toast.success( result.message || "Event Fetch successfully")
    }
    console.log(result , "result")
    return result
    } catch (error) {
            toast.success( error.message || "Event Fetch Faild")
      
        console.log(error)
        return error
    }
}


export const updateEvent = async(data)=>{
    console.log(data ,"updateEvent")
    try {
    const result = await axiosClient.put(`/api/v1/event/${data._id}` , data)
    if(result?.status == "SUCCESS"){
        toast.success( result.message || "Event Fetch successfully")
    }
    console.log(result , "result")
    return result
    } catch (error) {
            toast.success( error.message || "Event Fetch Faild")
      
        console.log(error)
        return error
    }
}

export const deleteSelectedEvents = async(data)=>{
    console.log("data" , data)
    console.log(data ,"delete selected")
    try {
    const result = await axiosClient.delete(`/api/v1/event` ,   {data:data})
    if(result?.status == 201){
        toast.success( result.message || "Event Fetch successfully")
    }
    console.log(result , "result")
    return result
    } catch (error) {
            toast.success( error.message || "Event Fetch Faild")
      
        console.log(error)
        return error
    }
}

export const rsvpToEvent = async(data)=>{
    console.log(data ,"Fetch fetchAllEvents")
    try {
    const result = await axiosClient.post(`/api/v1/rsvp/${data}` , {userResponse : "yes"})
    console.log(result , "result<><><")
    toast.success( result.message )
    return result
    } catch (error) {
            toast.success( error.message || "Event Fetch Faild")
      
        console.log(error)
        return error
    }
}