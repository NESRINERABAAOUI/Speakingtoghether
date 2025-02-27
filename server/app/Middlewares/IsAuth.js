const jwt = require('jsonwebtoken');
const jwtSecretKey  = process.env;
module.exports = (req, res) =>{
    const tokenHeaderKey = "jwt-token";
    const authToken = req.headers[tokenHeaderKey];
    try {
      const verified = jwt.verify(authToken, jwtSecretKey);
      if (verified) {
        return res
          .status(200)
          .json({ status: "logged in", message: "success" });
        
      } else {
        // Access Denied
        return res.status(401).json({ status: "invalid auth", message: "error" });
      }
    } catch (error) {
      // Access Denied
      return res.status(401).json({ status: "invalid auth", message: "exception" });
    }




   /*try {
       const token = req.headers.authorization.split(' ')[1];
       console.log("isAuth token"+token);
       const decodedToken = jwt.verify(token,jwtSecretKey);
       console.log("decode token : "+decodedToken);
       const userId = decodedToken.userId;
       req.auth = {
           userId: userId
       };
	next();
   } catch(error) {
    console.log(error);
       res.status(401).json({ error });
   }*/
};

