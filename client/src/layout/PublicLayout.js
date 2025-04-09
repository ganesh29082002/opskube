import React , {useEffect} from 'react'
import PublicNavBar from '../components/navbar/PublicNavbar'
import { useNavigate } from 'react-router-dom';
export default function PublicLayout({children}) {
  let token = localStorage.getItem('token'); 
  let navigate = useNavigate();
  useEffect(() => {
      if (token) {
          navigate("/Dashboard");
      }
  }, [token, navigate]);

  return (
   <>
   <PublicNavBar/>
   {children}
   </>
  )
}
