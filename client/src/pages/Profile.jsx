import React from 'react'
import CircleAvatar from "../components/CircleAvatar";
import {useUserContext} from '../hooks/useUserContext'
import EditIcon from '@mui/icons-material/Edit';
import {useNavigate} from 'react-router-dom';
export default function Profile() {
    const {user} = useUserContext();
    const {profile} = useUserContext();
    const displayName = user.user.firstName.charAt(0).toUpperCase() + user.user.firstName.substring(1) + " " + user.user.lastName;
    const navigate = useNavigate();
    return (
    <div className="w-full h-screen relative">
      <div dir='rtl'>
      <button
      onClick={()=>{
        navigate(`/editprofile/${user?.user._id}`);
      }}
      className='relative top-6 right-6 border-2 p-1 rounded-xl border-blue-900'><EditIcon/></button>
      </div>
      <div className="grid justify-center w-full h-fit mt-14">
        <CircleAvatar content={user.user.userName} img={profile.profilePic} styleAddons={"w-28 h-28"} />
        <h1 className="font-bold mt-2 text-center text-xl">{displayName}</h1>
      </div>
      <div className='p-5'>
        <hr className="border-blue-900" />
      </div>
      <div className='p-5'>Rates</div>
    </div>
  );
}
