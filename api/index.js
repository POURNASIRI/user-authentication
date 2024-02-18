import express from  "express"
import mongoose from "mongoose"
import dotenv from 'dotenv'
import signUpUser  from "./routes/auth.route.js"
import signInUser  from "./routes/auth.route.js"
import users from './routes/user.route.js'
import cookieParser from 'cookie-parser'
import User from "./models/user.model.js"

import jwt from "jsonwebtoken";
import { errorHandler } from "./utils/error.js"


dotenv.config()
const app = express()
app.use(express.json())



mongoose.connect(process.env.MONGO)
.then(()=>{
    console.log("Connect to MongoDB database")
})
.catch((err)=>{
    console.log(err)
})

app.listen(3000, ()=>{
    console.log('server is runing on port 3000')
})


async function authMiddleware(req, res, next) {
    const users = await User.findById(req.body._id);

    // req.app.set("user", users)

    if(!users){
      return next(errorHandler(404,"User not found"))
    }

    if(users?.email !== req.body.email){
      return next(errorHandler(401,"Email address not valid"))
    }

    const token = req.cookies.access_token;

    if (!token) {
      return next(errorHandler(401, 'Unauthorized'));
    }

    // const statusCode = err.statusCode || 500,
    // message = err.message || "Internal Server Error"
    // res.status(statusCode).json({
    //     success: false,
    //     message,
    //     statusCode
    // })
    

    jwt.verify(token,process.env.JWT_SECREC_KEY, (err) => {
        if (err) {
          return next(errorHandler(401, 'Unauthorized'));
        }
      });

    next();
}


app.use(cookieParser())
app.use('/api/auth', signUpUser)
app.use('/api/auth', signInUser)
app.use('/api/user/', authMiddleware ,users)







// create middleware to handle errors

app.use((err,req, res, next)=>{
    const statusCode = err.statusCode || 500,
    message = err.message || "Internal Server Error"
    res.status(statusCode).json({
        success: false,
        message,
        statusCode
    })

    next();
})