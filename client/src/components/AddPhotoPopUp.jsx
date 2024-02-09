import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';

export default function AddPhotoPopUp({ setIsOpen }) {
  const [postPhoto, setPostPhoto] = useState(null);

  const closeAddPhoto = () => {
    setIsOpen(false);
  };

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
          setPostPhoto(dataUrl);
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bottom-0 w-full bg-white p-4" style={{ height: '63vh', overflowY: 'auto' }}>
      <div className="flex items-center justify-between py-2 border-b border-gray-200">
        <h1 className="text-lg font-bold">Create New Rate Post</h1>
        <button onClick={closeAddPhoto} className="text-gray-500 hover:text-gray-700">
          <CloseIcon />
        </button>
      </div>
      <div className="p-4">
        <label htmlFor="files" className="block mb-4">
          <input
            type="file"
            id="files"
            name="files"
            className="hidden"
            onChange={handleImageChange}
          />
          <div className="bg-blue-900 text-white font-bold rounded py-2 px-4 cursor-pointer">
            Choose Photo
          </div>
        </label>
        {postPhoto ? (
          <img className="w-full h-56 rounded" src={postPhoto} alt="" />
        ) : (
          <div className="bg-gray-100 border border-gray-300 rounded p-4 text-gray-500 text-center">
            No photo selected
          </div>
        )}
        <div className="mt-2 flex justify-end">
          <input className='border rounded w-full placeholder:text-sm py-2 ' type="text" placeholder='Tell everyone about the picture' />
        </div>
        <div className='mt-2 flex justify-end'>
          <button className='bg-blue-900 p-2 rounded-md text-white font-bold'>Upload</button>
        </div>
      </div>
    </div>
  );
}
