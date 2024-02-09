import React from 'react'
import AddAPhotoOutlinedIcon from '@mui/icons-material/AddAPhotoOutlined';
import HomeIcon from '@mui/icons-material/Home';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import {useNavigate} from 'react-router-dom';
export default function MobileBottomBar({setIsOpen}) {
    const navigate = useNavigate();

    const openAddPhoto = () => {
      setIsOpen(true)
    }
  return (
    <div className="w-full p-2 shadow-lg shadow-black flex justify-between px-2">
      <button onClick={()=>{navigate('/randomrates')}} className="w-full mx-2 px-2 text-2xl">
        <StarBorderIcon fontSize="inherit" />
      </button>
      <button onClick={()=>{navigate('/')}} className="w-full mx-2 px-2 text-2xl">
        <HomeIcon fontSize="inherit" />
      </button>
      <button onClick={openAddPhoto} className="w-full mx-2 px-2 text-2xl">
        <AddAPhotoOutlinedIcon fontSize="inherit" />
      </button>
    </div>
  );
}
