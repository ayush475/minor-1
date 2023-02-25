const express = require("express");
const morgan = require("morgan");
const dotEnv = require("dotenv");
const cors=require('cors');
// getting enviroment variables
dotEnv.config({ path: "./config/.env" });
// import db
const sequelize=require('./config/database');

// get routes
const routeRoutes = require("./routes/routeRoutes");
const modelSchemaRoutes = require("./routes/modelSchemaRoutes");

const authRoutes = require("./routes/authRoutes");
const subjectRoutes = require("./routes/subjectRoutes");
const deviceRoutes = require("./routes/deviceRoutes");
const othersRoutes = require("./routes/othersRoutes");
// const courseSyllabusRoutes = require("./routes/courseSyllabusRoutes");
const userTravelRoutes = require("./routes/userTravelRoutes");
const userRoutes = require("./routes/userRoutes");
const ownerRoutes = require("./routes/ownerRoutes");
const busTravelRoutes = require("./routes/busTravelRoutes");
const errorMiddleware = require("./middlewares/error");
const cookieParser = require("cookie-parser");
const { calculateGpsCoordinatesDistance } = require("./utils/gpsUtils");

const app = express();



const port = process.env.PORT;

// middlewares
app.use(morgan("tiny"));
app.use(express.json());
app.use(cookieParser());
app.use(cors({origin: true, credentials: true, }));

// routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/", routeRoutes);
app.use("/",userRoutes);
app.use("/", modelSchemaRoutes);
app.use("/", ownerRoutes);
app.use("/", authRoutes);
app.use("/", userTravelRoutes);
app.use("/", othersRoutes);
app.use("/", deviceRoutes);
// app.use("/", noteRoutes);
// app.use("/", courseSyllabusRoutes);
// app.use("/", jointRoutes);
app.use("/",busTravelRoutes);


// custom middleware
app.use(errorMiddleware);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
