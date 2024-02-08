const User = require('../models/User');
const Profile = require('../models/Profile');

const updateProfile = async (req, res) => {
      try {
        const {profilePic,  firstName, lastName, userName, email, gender, dateOfbirth } = req.body;
        console.log(firstName, lastName, userName);
        // Find user by email
        const user = await User.findOne({ email: fields.email });
        const profile = await Profile.findOne({ email: fields.email });

        if (!user || !profile) {
          return res.status(404).json({ error: "User not found" });
        }

        // Assuming you have a userId available in req.user representing the authenticated user
        const userEmail = user.email;
        const profileEmail = profile.email;

        // Resize and save the profile picture

        // Update user profile with the resized image path
        const updatedProfile = await Profile.findOneAndUpdate(
          { email: profileEmail },
          {
            profilePic,
            firstName,
            lastName,
            userName,
            email,
            gender,
            dateOfbirth,
          },
          { new: true, upsert: true }
        );

        res.status(201).json(updatedProfile);
      } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = { updateProfile };
