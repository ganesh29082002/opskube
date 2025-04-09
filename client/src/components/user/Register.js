import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { register } from '../../apis/AuthApi';
import { showToastMessage } from '../../utility/Alert'
import { CgProfile } from "react-icons/cg";
import { validateForm } from '../../utility/validateForm'
export default function Register() {

  const navigate = useNavigate();
  const [UserInput, setUserInput] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    gender: "",
    married: false,
    image: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    setErrors({});
  }, [])

  const [imageSrc, setImageSrc] = useState(null)
  const onChangeHandler = (e) => {
    const { type, checked } = e.target
    setUserInput({
      ...UserInput,
      [e.target.name]: type === "checkbox" ? checked : e.target.value
    })
    console.log(UserInput, "onChangeHandler")
  }

  const submitForm = async (e) => {
    e.preventDefault()
    const newErrors = validateForm(UserInput);
    setErrors(newErrors);
    try {
      console.log("first dgvdsf", Object.keys(newErrors).length)
      if (Object.keys(newErrors).length === 0) {
        const data = new FormData();

        Object.keys(UserInput).forEach(key => {
          if (key === 'image') {
            data.append(key, UserInput[key]);
          } else {
            data.append(key, UserInput[key]);
          }
        });
        console.log(data, "data")
        console.log("formdatadata);", data)
        const result = await register(data)
        console.log(result, "result")
        if (result?.status == 201) {
          showToastMessage("success", "User Register successfully");
          navigate('/login')
        }
        else if (result?.status == 409) {
          showToastMessage("error", "User already exist");
          return
        } else {
          showToastMessage("error", "Failed to Register user");
          return
        }

      } else {
        showToastMessage("error", "all * field required fields");
        return;
      }
    }
    catch (error) {
      console.log(error)
      showToastMessage("error", "Failed to create user");
      return;
    }

  }

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setUserInput({ ...UserInput, image: file });
    const blob = new Blob([file], { type: file.type });
    const objectURL = URL.createObjectURL(blob);
    setImageSrc(objectURL);
  };


  return (

    <>
      <div className="bg-gray-100 ">
        <div className="w-full max-w-3xl mx-auto p-8">
          <form onSubmit={submitForm}>
            <div className="bg-white p-8 rounded-lg shadow-md border">
              <h1 className="text-2xl font-bold text-gray-800 mb-2 ">Registration</h1>

              <div className="mb-6">

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div>
                      <label htmlFor="first_name" className="block text-gray-700 mb-1">First Name <span className='text-danger'>*</span></label>
                      <input type="text" id="first_name" onChange={onChangeHandler} className="w-full rounded-lg border py-2 px-3 " name='firstName' value={UserInput.firstName} required />
                    </div>
                    <div>
                      <label className="block text-gray-700  mb-1">Last Name <span className='text-danger'>*</span></label>
                      <input type="text" id="last_name" required onChange={onChangeHandler} className="w-full rounded-lg border py-2 px-3 " name='lastName' value={UserInput.lastName} />
                    </div>
                  </div>

                  <div>
                    <div className='flex justify-center w-56'>
                      {
                        imageSrc ? (
                          <img
                            src={imageSrc}
                            alt="Profile Pic"
                            className="rounded-full w-fit h-full"
                          />
                        ) : (
                          <div class="w-24">
                            <CgProfile style={{ fontSize: '100px' }} />
                          </div>
                        )
                      }

                    </div>

                  </div>

                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="first_name" className="block text-gray-700 mb-1"> Email <span className='text-danger'>*</span></label>
                    <input type="text" id="first_name" required onChange={onChangeHandler} className="w-full rounded-lg border py-2 px-3 " name='email' value={UserInput.email} />
                  </div>
                  <div>
                    <label className="block text-gray-700  mb-1">DOB <span className='text-danger'>*</span></label>
                    <input type="date" id="last_name" required onChange={onChangeHandler} className="w-full rounded-lg border py-2 px-3 " name='dob' value={UserInput.dob} />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="first_name" className="block text-gray-700 mb-1"> Password <span className='text-danger'>*</span></label>
                    <input type="text" id="first_name" required onChange={onChangeHandler} className="w-full rounded-lg border py-2 px-3 " name='password' value={UserInput.password} />
                  </div>

                  <div className='flex justify-baseline'>
                    <label class="inline-flex items-center" for="tealCheckBox">
                      <input id="tealCheckBox" required type="checkbox" onChange={onChangeHandler} name='married' class="w-4 h-4 accent-teal-600" checked={UserInput.married} />          <span class="ml-2">Married</span>
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div class="flex gap-2 mt-3">
                    <label for="example1" class="mb-1 block text-sm font-medium text-gray-700">Gender <span className='text-danger'>*</span></label>
                   
                    <div class="inline-flex items-center">
                      <label class="relative flex items-center cursor-pointer" for="html">
                        <input name="gender" required type="radio" onChange={onChangeHandler} value="male" class="" id="html" />      <span class="absolute bg-slate-800 w-3 h-3 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        </span>
                      </label>
                      <label class="ml-2 text-slate-600 cursor-pointer text-sm" for="html">Male</label>
                    </div>

                    <div class="inline-flex items-center">
                      <label class="relative flex items-center cursor-pointer" for="react">
                        <input name="gender" type="radio" onChange={onChangeHandler} value="female" class="" id="react" />
                        <span class="absolute bg-slate-800 w-3 h-3 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        </span>
                      </label>
                      <label class="ml-2 text-slate-600 cursor-pointer text-sm" for="react">Female</label>
                    </div>

                  </div>
                  <div className="mt-4">
                    <div class="">
                      <label for="example1" class="mb-1 block text-sm font-medium text-gray-700">Upload file <span className='text-danger'>*</span></label>
                      <input id="example1" type="file" required onChange={handleFileChange} class="mt-2 block w-full text-sm file:mr-4 file:rounded-md file:border-0 file:bg-teal-500 file:py-2 file:px-4 file:text-sm file:font-semibold file:text-white hover:file:bg-teal-700 focus:outline-none disabled:pointer-events-none disabled:opacity-60" />
                    </div>
                  </div>

                </div>

              </div>

               <div className="mt-8 flex justify-end">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 ">Register </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>


  )
}