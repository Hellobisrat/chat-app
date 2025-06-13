import User from "../model/User";
import authMiddleware from "../middleware/authMiddleware.js";


export const loggedUser = async(req,res)=>{
  const id = req.body.userId;
  try {
    const user = await User.findOne({_id:id}).select("-password")
    if(!user){
      return res.status(404).json({message:"User not found"})
    }
    res.status(200).json({message:"User retrieved successfully",user})
  } catch (error) {
     res.status(500).json({message:"Failed to retrieve user"})
  }
 
  
}

export const getAllUser = async(req,res)=>{
  try {
    const allUsers = await User.find({ _id: { $ne: req.body.userId } });
    res.status(200).json({ message: 'Users retrieved successfully', allUsers });
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve users' });
  }

}