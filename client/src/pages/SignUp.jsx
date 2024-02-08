import React, { useEffect, useState } from 'react';
import SignButton from '../components/SignButton';
import SignInput from '../components/SignInput';
import '../Fonts.css';
import { useNavigate } from 'react-router-dom';
import { useSignup } from '../hooks/useSignup';
import { useUserContext } from '../hooks/useUserContext';

export default function SignUp() {
  const navigate = useNavigate();
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [uname, setUname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cPassword, setCPassword] = useState('');
  const {user} = useUserContext();
  const { signup, error, isLoading } = useSignup();
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);
  const sendDetails = async () => {
    // Check if any of the required fields is empty
    if (!fname || !lname || !email || !password || !cPassword) {
      console.log('All fields are required');
      alert('All fields are required');
      return;
    }

    // Check if the passwords match
    if (password !== cPassword) {
      console.log('Passwords don\'t match');
      alert('Passwords don\'t match');
      return;
    }

    // All checks passed, proceed with the signup
    signup(fname, lname, uname, email, password);
  };

  return (
    <div className="flex justify-center w-full p-4 h-screen">
      <div className="h-fit w-fit border-2 rounded px-12 sm:px-14 md:px-16 py-5 border-blue-600 relative mt-10">
        <h1 className="text-4xl font-bold text-orange-300 sign-title">
          Rate Me
        </h1>
        <h2 className="my-2 font-semibold text-sm">
          Sign Up to start rate & rated
        </h2>
        <div className="mt-4">
          <SignInput text={'First Name'} setState={setFname} />
          <SignInput text={'Last Name'} setState={setLname} />
          <SignInput text={'User Name'} setState={setUname} />
          <SignInput text={'Email Address'} setState={setEmail} />
          <SignInput text={'Password'} setState={setPassword} />
          <SignInput text={'Confirm Password'} setState={setCPassword} />
        </div>
        <div className="mt-10">
          <SignButton onClickFunc={sendDetails} text={'Sign Up'} styleAddons={'w-[80%]'} />
        </div>
        <div className="mt-4">
          <p className="text-sm">
            Already have an account?,{' '}
            <span
              onClick={() => {
                navigate('/signin');
              }}
              className="hover:underline text-blue-500 font-semibold cursor-pointer"
            >
              Sign In
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
