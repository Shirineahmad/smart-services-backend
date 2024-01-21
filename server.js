require("dotenv").config();
const express = require("express");
const cors = require("cors");
const dbConnection = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const countryRoutes = require("./routes/countryRoutes");
const visaRoutes = require("./routes/visaRoutes");
const servicesRoutes = require("./routes/servicesRoutes");
const howToPay = require("./routes/howToPayRoutes");
const exam = require("./routes/examRoutes");
const submissionExam = require("./routes/submissionExamRoutes");
const submissionFlight = require("./routes/submissionFlightRoutes");
const submissionVisa = require("./models/submissionVisaModel");
const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", userRoutes);
app.use("/country", countryRoutes);
app.use("/services", servicesRoutes);
app.use("/visa", visaRoutes);
app.use("/exam", exam);
app.use("/payment", howToPay);
app.use("/submissionExam", submissionExam);
app.use("/submissionFlight", submissionFlight);
app.use("/submissionVisa", submissionVisa);
app.listen(PORT, () => {
   dbConnection();
  console.log(`app listening on port ${PORT}`);
});
