require("dotenv").config();
const { initializeApp }= require("firebase/app");
const { getAnalytics } = require("firebase/analytics");
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
const dbConnection=require("./config/db")
const {firebaseConfig}=require("./config/firebase")
const express = require("express");
const cors = require("cors");

const app = express();
const initiliatizeFirebase = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.listen(PORT, () => {
   dbConnection();
  console.log(`app listening on port ${PORT}`);
});
