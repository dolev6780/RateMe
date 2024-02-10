import React, { useState } from 'react'
import {useUserContext} from '../hooks/useUserContext';
import SignButton from './SignButton';
import {useNavigate} from 'react-router-dom';
import { useSignout } from "../hooks/useSignout";
import { motion } from "framer-motion";
import CircleAvatar from './CircleAvatar';

const variants = {
  open: {
    opacity: 1,
    transition: { duration: 0.5 },
  },
  closed: {
    opacity: 0,
    display: "none",
    transition: { duration: 0.5 },
  },
};
export default function CircleMenu() {
  const { user } = useUserContext();
  const {profile} = useUserContext();
  const [isOpen, setIsOpen] = useState(false);
  const displayName = user?.user?.userName || "";
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
        >
          <CircleAvatar content={circleMenuLetter} img={profile?.profilePic} styleAddons={"border border-blue-900"} />
        </button>
      </div>
      <motion.div
        animate={isOpen ? "open" : "closed"}
        variants={variants}
        className={`absolute w-fit right-2 shadow-md bg-white p-2 px-6 rounded mt-2 grid gap-4`}
      >
        <div
          onClick={() => {
            navigate(`profile/${user?.user._id}`);
            setIsOpen(!isOpen);
          }}
          className="relative w-full grid  justify-center"
        >
          <CircleAvatar
            content={circleMenuLetter}
            img={profile?.profilePic}
            styleAddons={"w-[4rem] h-[4rem] border-2 border-blue-900"}
          />
          <h1 className="font-bold text-center">{displayName}</h1>
        </div>
        <hr className="" />
        <SignButton onClickFunc={signOut} text={"Sign Out"} styleAddons={""} />
      </motion.div>
    </div>
  );
}
