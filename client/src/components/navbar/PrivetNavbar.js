import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {logoutUser} from '../../redux/features/authSlice'
import { useDispatch , useSelector } from 'react-redux';

export default function PrivetNavbar() {
  const location = useLocation();
  const navigate = useNavigate()
  const dispatch = useDispatch()
  // A function to check if the link is active
  const isActive = (path) => location.pathname === path;
  const {token , loginUserDetails }=useSelector(state => state.auth.loginUser)


  const user = localStorage.getItem('loginUser')
  const obj = JSON.parse(user);
  const LogOut = () => {
    dispatch(logoutUser())
    localStorage.removeItem('token');
    localStorage.removeItem('loginUser');
    navigate("/");
  }

  return (
    <div className="top-0 py-1 lg:py-1 w-full bg-transparent lg:relative z-50 ">
      <nav className="z-10 sticky top-0 left-0 right-0 max-w-4xl xl:max-w-5xl mx-auto px-5 py-1 lg:border-none lg:py-2">
        <div className="flex items-center justify-between">
          <button>
            <div className="flex items-center space-x-2">
              <h2 className="text-black  font-bold text-2xl">
                Hello {`${loginUserDetails?.name} `}
              </h2>
            </div>
          </button>
          <div className="hidden lg:block">
            <ul className="flex space-x-10 text-base text-gray-900">
              <li className={`hover:text-blue-500  underline-offset-4 transition-all duration-200 ease-linear hover:underline ${isActive('/all-events') ? 'text-blue-500 underline font-semibold' : ''}`}>
                <Link to="/all-events"> All Events</Link>
              </li>
              <li className={`hover:text-blue-500  underline-offset-4 transition-all duration-200 ease-linear hover:underline ${isActive('/event-managment') ? 'text-blue-500 underline font-semibold' : ''}`}>
                <Link to="/event-managment"> My Events</Link>
              </li>

              <li className={`hover:text-blue-500  underline-offset-4 transition-all duration-200 ease-linear hover:underline ${isActive('/register-event') ? 'text-blue-500 underline font-semibold' : ''}`}>
                <Link to="/register-event"> Register Event</Link>
              </li>
            </ul>
          </div>
          <div className="hidden lg:flex lg:items-center gap-x-2 text-black">
            <Link className={` hover:text-blue-500 flex items-center   justify-center px-6 py-2.5 font-semibold  ${isActive('/register-event') ? 'text-blue-500 underline underline-offset-4 font-semibold' : ''}`} to="/register-event">
              My Profile
            </Link>
            <button className="flex items-center justify-center rounded-md bg-blue-500 text-white px-6 py-1 font-semibold hover:shadow hover:drop-shadow transition duration-200" onClick={LogOut} >
              Log Out
            </button>
          </div>
          <div className="flex items-center justify-center lg:hidden">
            <button className="focus:outline-none text-slate-200 dark:text-white">
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth={0}
                viewBox="0 0 20 20"
                aria-hidden="true"
                className="text-2xl text-slate-800 dark:text-white focus:outline-none active:scale-110 active:text-red-500"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}