import jwt from'jsonwebtoken';


const authMiddleware=(req,res,next)=>{
      try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token,process.env.SECRET)
        req.body.userId=decodedToken.userId;
        next();
      } catch (error) {
        res.status(500).json(error.message)
      }
}

export default authMiddleware;