const { validationResult } = require('express-validator');

const User = require('../models/User');
const Profile = require('../models/Profile');

const updateProfile = async (req, res) => {
  try {
    // Validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { profilePic, firstName, lastName, userName, email, gender, dateOfBirth } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    const profile = await Profile.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (!profile) {
      return res.status(404).json({ error: "Profile not found" });
    }

    // Update user profile with the resized image path
    const updatedProfile = await Profile.findOneAndUpdate(
      { email },
      {
        profilePic,
        firstName,
        lastName,
        userName,
        email,
        gender,
        dateOfBirth,
      },
      { new: true, upsert: true }
    );

    if (!updatedProfile) {
      return res.status(500).json({ error: "Failed to update profile" });
    }

    res.status(201).json(updatedProfile);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { updateProfile };
