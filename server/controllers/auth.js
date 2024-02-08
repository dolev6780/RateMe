const bcrypt = require ("bcrypt");
const jwt = require ("jsonwebtoken");
const User = require('../models/User');
const Profile = require('../models/Profile');
////////////sign up///////////////////
const signup = async (req, res) => {
  try {
    const { firstName, lastName, userName, email, password } = req.body;
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    console.log(firstName);
    const newUser = new User({
      firstName,
      lastName,
      userName,
      email,
      password: passwordHash,
    });
    const newProfile = new Profile({
      firstName,
      lastName,
      userName,
      email,
    });
    
    const savedUser = await newUser.save();
    console.log("in");
    const savedProfile = await newProfile.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({error: err.massage});
  }
};


////////////////signin///////////////
const signin = async (req, res) => {
  try {
    const { email, password} = req.body;
    const user = await User.findOne({email: email});
    const profile = await Profile.findOne({email: email});
    console.log(profile);
    if(!user) return res.status(400).json({msg: "User does not exist"});
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) return res.status(400).json({msg: "unvalid credentials"});
    const token = jwt.sign({ id: user._id }, "secretstringveryverymuch");
    delete user.password;
    res.status(200).json({token, user,profile });
  } catch (err) {
    res.status(500).json({error: err.massage});
  }
}

module.exports = {signin, signup};