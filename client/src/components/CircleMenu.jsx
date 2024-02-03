import React, { useState } from 'react'
import {useUserContext} from '../hooks/useUserContext';
import SignButton from './SignButton';
import {useNavigate} from 'react-router-dom';
import { useSignout } from "../hooks/useSignout";
import { motion } from "framer-motion";

const variants = {
  open: {
    opacity: 1,
    //transition: { duration: 0.5 },
  },
  closed: {
    opacity: 0,
    //transition: { duration: 0.5 },
  },
};
export default function CircleMenu() {
  const {user} = useUserContext();
  const [isOpen, setIsOpen] = useState(false);
  const displayName = user ? user.user.firstName + " " + user.user.lastName: "";
  const circleMenuLetter = displayName.charAt(0).toUpperCase();
  const navigate = useNavigate();
  const { signout } = useSignout();
  const signOut = () => {
    signout();
    navigate("/");
    window.location.reload();
}
  return (
    <div>
      <div>
        <button
          onClick={() => {
            setIsOpen(!isOpen);
          }}
          className="bg-gray-400 py-2 px-4 rounded-full text-white font-bold"
        >
          {circleMenuLetter}
        </button>
      </div>
      <motion.div
        animate={isOpen ? "open" : "closed"}
        variants={variants}
        className={`absolute w-fit right-2 shadow-md bg-gray-300 p-2 pl-10 rounded mt-2 grid gap-4`}
      >
        <div
          onClick={() => {
            navigate(`profile/${user.user._id}`);
            setIsOpen(!isOpen);
          }}
          dir="rtl"
          className="relative w-full grid justify-center"
        >
          <div className="bg-gray-400 py-4 px-6 rounded-full w-fit text-white font-bold mr-2">
            {circleMenuLetter}
          </div>
          <h1 className="font-bold">{displayName}</h1>
        </div>
        <hr className="" />
        <SignButton onClickFunc={signOut} text={"Sign Out"} styleAddons={""} />
      </motion.div>
    </div>
  );
}
