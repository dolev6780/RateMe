import React, { useEffect, useState } from 'react'
import '../Gradients.css';
import {useNavigate} from 'react-router-dom';
import SignButton from './SignButton';
import {useScreensize} from '../hooks/useScreenSize';
import {useUserContext} from '../hooks/useUserContext';
import { useSignout } from "../hooks/useSignout";
export default function NavBar() {
  const navigate = useNavigate();
  const [isSigned, setIsSigned] = useState(false);
  const {screenSize} = useScreensize();
  const {user} = useUserContext();
  const { signout } = useSignout();
  const displayName = user ? user.user.firstName + " " + user.user.lastName: "";
  useEffect(()=>{
    const checkIfSigned = () => {
      const signed = user ? setIsSigned(true) : setIsSigned(false);
    }
    return checkIfSigned();
  },[user])
  const signOut = () => {
      signout();
      navigate("/");
      window.location.reload();
  }
  return (
    <div className="flex justify-between shadow-md p-4">
      <div>
        <h1
          onClick={() => {
            navigate("/");
          }}
          className="logo-gradient font-bold text-xl cursor-pointer"
        >
          RateMe
        </h1>
        <div>
          <h1 className="text-black">{displayName}</h1>
        </div>
      </div>
      {screenSize.dynamicWidth > 700 ? (
        <div className="flex gap-4">
          {!isSigned ? (
            <div className="flex gap-4">
              <SignButton
                onClickFunc={() => {
                  navigate("/signin");
                }}
                text={"Sign In"}
              />
              <SignButton
                onClickFunc={() => {
                  navigate("/signup");
                }}
                text={"Sign Up"}
              />
            </div>
          ) : (
            <div>
              <SignButton onClickFunc={signOut} text={"Sign Out"} />
            </div>
          )}
        </div>
      ) : (
        <div>
          <button>sad</button>
          <div className={`hidden`}>
            <SignButton
              onClickFunc={() => {
                navigate("/signin");
              }}
              text={"Sign In"}
            />
            <SignButton
              onClickFunc={() => {
                navigate("/signup");
              }}
              text={"Sign Up"}
            />
          </div>
          {isSigned ? <SignButton text={"Sign Out"} /> : ""}
        </div>
      )}
    </div>
  );
}
