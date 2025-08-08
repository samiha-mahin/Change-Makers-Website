import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './utils/db.js';
import userRoute from './routes/user_route.js';
import dutyRoute from './routes/duty_route.js';
import organizationRoute from './routes/organization_route.js';
import applicationRoute from './routes/application_route.js';
dotenv.config({});

const app = express();

//middlewares
app.use(express.json()); //Parses JSON payloads from request body.
app.use(express.urlencoded({extended:true})); //Parses URL-encoded payloads (e.g., forms).
app.use(cookieParser()); //Parses cookies from incoming HTTP requests

const corsOptions = {
    origin: ' http://localhost:5173',
   // origin: 'https://job-portal-website-front-end-e72p.vercel.app', // Frontend URL
  credentials: true, // Ensures cookies are sent
};
app.use(cors(corsOptions));

app.use("/api/v1/user",userRoute);
app.use("/api/v1/duty",dutyRoute);
app.use("/api/v1/organization",organizationRoute);
app.use("/api/v1/app",applicationRoute);

const PORT = process.env.PORT || 3000;
 app.listen (PORT,()=>{
    connectDB();
    console.log(`Server Running at Port ${PORT}`);
 });