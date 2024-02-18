import User from "../models/user.model.js"
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const getuser  = async(req,res)=>{
  res.json({ user: 10 })


    // req.app.get("users")

  // try {
  //   const users = await User.findById(req.body._id);
  //   if(!users){
  //     return next(errorHandler(404,"User not found"))
  //   }
  //   if(users?.email !== req.body.email){
  //     // return res.status(401);

  //     return next(errorHandler(401,"Email address not valid"))
  //   }
  //   const token = req.cookies.access_token;
  //   if (!token) {
  //     return next(errorHandler(401, 'Unauthorized'));
  //   }
  //   jwt.verify(token,process.env.JWT_SECREC_KEY, (err) => {
  //     if (err) {
  //       return next(errorHandler(401, 'Unauthorized'));
  //     }
  //   });
    
  //   res.status(200).json(users)

  // }catch (error) {
  //   next(error)
  // }
}




export const signout = async(req,res,next)=>{
    try {
        res.clearCookie("access_token").status(200).json({
            message:"Signout successfull"
        })
    } catch (error) {
        next(error)
    }
}