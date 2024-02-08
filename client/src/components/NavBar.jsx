import React, { useEffect, useState } from 'react'
import '../Gradients.css';
import {useNavigate} from 'react-router-dom';
import SignButton from './SignButton';
import {useScreensize} from '../hooks/useScreenSize';
import {useUserContext} from '../hooks/useUserContext';
import { useSignout } from "../hooks/useSignout";
import CircleMenu from '../components/CircleMenu';
export default function NavBar() {
  const navigate = useNavigate();
  const [isSigned, setIsSigned] = useState(false);
  const {screenSize} = useScreensize();
  const {user} = useUserContext();
 
  useEffect(()=>{
    const checkIfSigned = () => {
      const signed = user ? setIsSigned(true) : setIsSigned(false);
    }
    return checkIfSigned();
  },[user])

  return (
    <div className="flex justify-between items-center shadow-md p-4">
      <div>
        <h1
          onClick={() => {
            navigate("/");
          }}
          className="logo-gradient font-bold text-xl cursor-pointer"
        >
          RateMe
        </h1>
      </div>
      <div className="flex gap-4">
        {!isSigned ? (
          <div className="flex gap-4">
            <SignButton
              onClickFunc={() => {
                navigate("/signin");
              }}
              text={"Sign In"}
            />
          </div>
        ) : (
          <div className='z-10'>
            <CircleMenu />
          </div>
        )}
      </div>
    </div>
  );
}
