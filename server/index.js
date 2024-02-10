const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const profileRoute = require('./routes/profile');
const postRoute = require('./routes/post');

/////////////config/////////////////

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
////////////routes//////////////////////////////
app.use('/api/user', authRoutes);
app.use('/api/profile', profileRoute);
app.use('/api/post', postRoute);

//////////////mongoose setup////////////////////
const PORT = 3001 || 5000;

///////////////mongoDB connection///////////////////////////
mongoose.set('strictQuery', true);
mongoose
  .connect(
    "mongodb+srv://dolev6780:lGpMGv9YIoEXCiW4@rateme.gl8vvyw.mongodb.net/",
    {
     
    }
  )
  .then(() => {
    app.listen(PORT, () => {
      console.log("server port", PORT);
    });
  })
  .catch((err) => {
    console.log(err, "err something gone wrong");
  });
