import useAuth from "../customHooks/useAuth";
const getToken = ()=>{
    return localStorage.getItem('token') || null; 
}

export const getHeader = () =>{
    const token =getToken();
    return {
        Authorization: `Bearer ${token}`
    }
}