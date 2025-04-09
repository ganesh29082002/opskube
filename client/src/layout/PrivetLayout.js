import React , {useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import PrivetNavbar from '../components/navbar/PrivetNavbar';
import { useSelector } from 'react-redux';
export default function PrivetLayout({children}) {
 
  const {token , loginUserDetails }=useSelector(state => state.auth.loginUser)
  console.log(token  , "token ")
  let navigate = useNavigate();
  useEffect(() => {
      if (!token) {
          navigate("/");
      }
  }, [token]);
  return (
    <>
    <PrivetNavbar/>
    {children}
    </>
  )
}
