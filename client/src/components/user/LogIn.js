import React, { useState } from 'react'
import { login, loginWithGoogle } from '../../apis/AuthApi';
import { Link, useNavigate } from 'react-router-dom';
import { showToastMessage } from '../../utility/Alert'
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import {loginUser} from '../../redux/features/authSlice'
import { useDispatch } from 'react-redux';
export default function LogIn() {
  const [UserInput, setUserInput] = useState({
    email: "",
    password: ""
  });

  const dispatch = useDispatch()
  const navigate = useNavigate();
  //  login success 
  const handleLoginSuccess = async (response) => {
    console.log(response, "handleLoginSuccess")
    const { credential } = response;
    try {
      const loginResponse = await loginWithGoogle({ token: credential });
      const { data } = loginResponse;

      if (loginResponse.status === 200 && data.token !== undefined && Object.keys(data.token).length) {
        console.log("Login successful", data);
        await localStorage.setItem('loginUser', JSON.stringify(data.user));
       await localStorage.setItem('token', data.token);
        showToastMessage("success", "User Log In successfully");
        navigate('/dashboard')
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  // login failure 
  const handleLoginFailure = (error) => {
    console.log('Login failed', error);
    showToastMessage("error", "Invalid email or password");
    return;
  };
  //  on change handler function 
  const onChangeHandler = (e) => {
    setUserInput({
      ...UserInput,
      [e.target.name]: e.target.value
    })
  }

  //  login form
  const submitForm1 = async (e) => {
    e.preventDefault()
    console.log("first submit")
    const result = await login(UserInput)
    console.log(result, "submitForm1")

    if (result?.data?.success) {
      dispatch(loginUser(result?.data))
      await localStorage.setItem("token", result?.data?.token)
      localStorage.setItem("loginUser", JSON.stringify(result?.data?.user))
      showToastMessage("success", "User Log In successfully");
      navigate('/dashboard')
    } else {
      showToastMessage("error", "Invalid email or password");
      return;
    }
  }

  return (
    <>
      <div class="h-screen bg-gray-100 p-4 md:p-10 lg:p-22">
        <div class="max-w-sm bg-white rounded-lg overflow-hidden shadow-lg mx-auto ">
          <div class="p-2">
            <h2 class="text-2xl font-bold text-gray-800 ">Welcome Back!</h2>
            <p class="text-gray-700 mb-6">Please sign in to your account</p>
            <form onSubmit={submitForm1}>
              <div class="mb-4">
                <label class="block text-gray-700 font-bold mb-2" for="username"  >
                  Email
                </label>
                <input class="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" name="email" onChange={onChangeHandler} />              </div>
              <div class="mb-6">
                <label class="block text-gray-700 font-bold mb-2" for="password">
                  Password
                </label>
                <input class="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" name='password' placeholder="Password" onChange={onChangeHandler} />
              </div>
              <div class="flex items-center justify-between">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  sign in
                </button>
                <Link class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
                  Forgot Password?
                </Link>
              </div>
            </form>

            <hr className=' m-3 text-center'></hr>

            {/* login with google  */}
            <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID}>
              <GoogleLogin
                onSuccess={handleLoginSuccess}
                onError={handleLoginFailure}
              />
            </GoogleOAuthProvider>

            <hr className=' m-3 text-center'></hr>
            <hr className=' m-3 text-center'></hr>
            <div className='flex justify-center mb-2 mt-2' >
              <Link class=" justify-center text-center font-bold text-sm  " type="button" to="/register">
                Don't Have Account? <span className='text-blue-500 hover:text-blue-800'> Register Here </span>
              </Link>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}