import React, { useState } from 'react'
import CircleAvatar from "../components/CircleAvatar";
import {useUserContext} from '../hooks/useUserContext'
import {useNavigate} from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
export default function EditProfile() {
    const {user} = useUserContext();
    const displayName = user.user.firstName.charAt(0).toUpperCase() + user.user.firstName.substring(1) + " " + user.user.lastName;
    const navigate = useNavigate();
    const [profilePic, setProfilePic] = useState();
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [userName, setUserName] = useState("");
    const [gender, setGender] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
  return (
    <div className="w-full h-screen relative">
      <div >
        <button
          onClick={() => {
            navigate(`/profile/${user?.user._id}`);
          }}
          className="relative top-6 left-6 border-2 p-1 rounded-xl border-blue-900"
        >
          <ArrowBackIcon />
        </button>
      </div>
      <div className="grid justify-center w-full h-fit mt-14">
        <p className="absolute">change to file input to choose profile pic</p>
        <CircleAvatar content={"D"} styleAddons={"w-28 h-28"} />
      </div>
      <div className="p-5">
        <hr className="border-blue-900" />
      </div>
      <div className="p-5 grid gap-4 px-10">
        <input
          className="py-1 border-2 w-full border-blue-900 rounded-md px-2"
          type="text"
          defaultValue={user?.user.firstName}
          onChange={(e) => {
            setFname(e.target.value);
          }}
        />
        <input
          className="py-1 border-2 w-full border-blue-900 rounded-md px-2"
          type="text"
          defaultValue={user?.user.lastName}
          onChange={(e) => {
            setLname(e.target.value);
          }}
        />
        <input
          className="py-1 border-2 w-full border-blue-900 rounded-md px-2"
          type="text"
          defaultValue={"userName"}
          onChange={(e) => {
            setUserName(e.target.value);
          }}
        />
        <input
          className="py-1 border-2 w-full border-blue-900 rounded-md px-2"
          type="text"
          placeholder="gender"
          onChange={(e) => {
            setGender(e.target.value);
          }}
        />
        <input
          className="py-1 border-2 w-full border-blue-900 rounded-md px-2"
          type="text"
          placeholder="Date of birth"
          onChange={(e) => {
            setDateOfBirth(e.target.value);
          }}
        />
        <button className="border-2 border-blue-900 rounded-md w-fit m-auto py-1 px-4">
          Update profile
        </button>
      </div>
    </div>
  );
}
