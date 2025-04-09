import { useState } from 'react'
import { useSelector } from 'react-redux'
const useAuth = () => {
    const {token , loginUserDetails }=useSelector(state => state.auth.loginUser)
    return {
        token:{Authorization: `Bearer ${token}` }, loginUserDetails
    }
}

export default useAuth