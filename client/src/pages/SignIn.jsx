import React, { useState } from 'react'
import SignInput from '../components/SignInput';
import {useNavigate} from 'react-router-dom';
import '../Fonts.css';
import SignButton from '../components/SignButton';
import {useSignin} from '../hooks/useSignin';
export default function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const { signin, isLoading, error } = useSignin();

  const checkDetails = () => {
          // Check if any of the required fields is empty
    if (!email || !password) {
      console.log('All fields are required');
      alert('All fields are required');
      return;
    }
    // All checks passed, proceed with the signup
    signin(email, password);
  }
  return (
    <div className="flex justify-center w-full p-4 h-screen">
      <div className="h-fit w-fit border-2 rounded px-10 sm:px-14 md:px-16  py-5 border-blue-600 relative mt-10">
        <h1 className="text-4xl font-bold text-orange-300 sign-title">
          Rate Me
        </h1>
        <h2 className="font-semibold mt-2 text-lg">Sign In</h2>
        <div className="mt-4">
          <SignInput text={"Email Address"} setState={setEmail} />
          <SignInput text={"Password"} setState={setPassword} />
        </div>
        <div className="mt-10">
          <SignButton onClickFunc={checkDetails} text={"Sign In"} styleAddons={"w-[80%]"} />
        </div>
        <div className="mt-4">
          <p className="text-sm">
            Dont have an account yet?,{" "}
            <span
              onClick={() => {
                navigate("/signup");
              }}
              className="hover:underline text-blue-500 font-semibold cursor-pointer"
            >
              Sign Up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
