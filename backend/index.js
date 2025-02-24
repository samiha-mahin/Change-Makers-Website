import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();

//middlewares
app.use(express.json()); //Parses JSON payloads from request body.
app.use(express.urlencoded({extended:true})); //Parses URL-encoded payloads (e.g., forms).
app.use(cookieParser()); //Parses cookies from incoming HTTP requests

const corsOptions = {
    origin: 'http://localhost:5172',
   // origin: 'https://job-portal-website-front-end-e72p.vercel.app', // Frontend URL
  credentials: true, // Ensures cookies are sent
};
app.use(cors(corsOptions));

const PORT = 3000;
app.listen (PORT,()=>{
   console.log(`Server Running at Port ${PORT}`);
})