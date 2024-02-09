import React, { useState } from 'react'
import CircleAvatar from "../components/CircleAvatar";
import {useUserContext} from '../hooks/useUserContext'
import {useNavigate} from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import InputWithIcon from '../components/InputWithIcon';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {useUpdateProfile} from '../hooks/useUpdateProfile';
import Loader from "../components/Loader";
export default function EditProfile() {
    const {user} = useUserContext();
    const { profile } = useUserContext();
    const navigate = useNavigate();
    const [profilePic, setProfilePic] = useState(null);
    const [userName, setUserName] = useState("");
    const [gender, setGender] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const { updateProfile, isLoading, error } = useUpdateProfile();
    const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const img = new Image();
          img.onload = () => {
            const canvas = document.createElement('canvas');
            const MAX_WIDTH = 500; // Maximum width for the resized image
            const MAX_HEIGHT = 500; // Maximum height for the resized image
            let width = img.width;
            let height = img.height;
    
            // Calculate new dimensions while maintaining aspect ratio
            if (width > height) {
              if (width > MAX_WIDTH) {
                height *= MAX_WIDTH / width;
                width = MAX_WIDTH;
              }
            } else {
              if (height > MAX_HEIGHT) {
                width *= MAX_HEIGHT / height;
                height = MAX_HEIGHT;
              }
            }
    
            // Set canvas dimensions and draw the image
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);
    
            // Convert canvas content to base64 data URL
            const dataUrl = canvas.toDataURL('image/jpeg'); // Change format if needed
    
            // Set the resized image as profile picture
            setProfilePic(dataUrl);
          };
          img.src = event.target.result;
        };
        reader.readAsDataURL(file);
      }
    };
    
    const update = () => {
      updateProfile(
        profilePic ? profilePic : profile.profilePic,
        user?.user.firstName,
        user?.user.lastName,
        userName ? userName : profile.userName,
        user.user.email,
        gender ? gender : profile.gender,
        dateOfBirth ? dateOfBirth : profile.dateOfBirth
      );
}
  return (
    <div className="w-full h-screen relative">
      <div>
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
        <div>
          <label htmlFor="files">
            <CircleAvatar
              content={user?.user.userName}
              img={profilePic ? profilePic :profile.profilePic}
              styleAddons={"w-28 h-28"}
            />
            <input
              type="file"
              id="files"
              name="files"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>
        </div>
      </div>
      <div className="p-5">
        <hr className="border-blue-900" />
      </div>
      <div className="p-5 grid gap-4 px-10">
        <input
          disabled
          className="py-1 border-2 w-full border-blue-900 rounded-md px-2"
          type="text"
          defaultValue={profile?.firstName}
        />
        <input
          disabled
          className="py-1 border-2 w-full border-blue-900 rounded-md px-2"
          type="text"
          defaultValue={profile?.lastName}
        />
        <input
          className="py-1 border-2 w-full border-blue-900 rounded-md px-2"
          type="text"
          defaultValue={profile?.userName}
          onChange={(e) => {
            setUserName(e.target.value);
          }}
        />
        <div>
          <button
            onClick={() => {
              setIsOpen(!isOpen);
            }}
            className="py-1 border-2 w-full border-blue-900 rounded-md px-2 text-start flex justify-between"
          >
            {gender !== ""
              ? gender
              : profile?.gender
              ? profile.gender
              : "Gender"}
            {isOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
          </button>
          <div
            className={`${
              isOpen ? "" : "hidden"
            } border-2 border-blue-900 rounded-md mt-2 flex flex-col justify-start w-full`}
          >
            <button
              onClick={() => {
                setGender("Male");
                setIsOpen(false);
              }}
              className="text-start p-2 font-semibold"
            >
              Male
            </button>
            <button
              onClick={() => {
                setGender("Female");
                setIsOpen(false);
              }}
              className="text-start p-2 font-semibold"
            >
              Female
            </button>
            <button
              onClick={() => {
                setGender("Prefere not to say");
                setIsOpen(false);
              }}
              className="text-start p-2 font-semibold"
            >
              Prefere not to say
            </button>
            <button
              onClick={() => {
                setGender("Custom gender");
                setIsOpen(false);
              }}
              className="text-start p-2 font-semibold"
            >
              Custom gender
            </button>
          </div>
          {gender === "Custom gender" ? (
            <InputWithIcon
              placeholder={"Custom gender"}
              type={"text"}
              setState={setGender}
              icon={<ArrowForwardIcon />}
            />
          ) : (
            ""
          )}
        </div>
        <input
          className="py-1 border-2 w-full border-blue-900 rounded-md px-2"
          type="date"
          placeholder="Date of birth"
          value={dateOfBirth || profile?.dateOfBirth || ""}
          onChange={(e) => {
            setDateOfBirth(e.target.value);
          }}
        />
        <button
          onClick={update}
          className="border-2 border-blue-900 rounded-md w-fit m-auto py-1 px-4"
        >
          {isLoading ? <Loader/> : "Update profile"}
        </button>
      </div>
    </div>
  );
}
