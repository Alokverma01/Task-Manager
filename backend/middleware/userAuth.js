const jwt = require("jsonwebtoken");
const { userModel } = require("../models/userModel");

        const userAuth = async(req, res , next) => {
            const {token} = req.cookies;

            if(!token){
                return res.json({success: false, message: "Not Authorized. Login Again"});  
            }
            try {
                const tokenDecode  = jwt.verify(token , process.env.JWT_SECRET);
                const user = await userModel.findById(tokenDecode.id);
                if(tokenDecode.id){
                    req.userId = tokenDecode.id
                }else {
                    return res.json({success : false, message : "Not Authorized. Login Again"});
                }
                if(!user){
                    return res.json({success: false, message: "user not fount"})
                }
                req.user = user;    
                next();
            } catch (error) {
                return res.json({success: false, message: error.message})
            }

        }

        module.exports = {
            userAuth
        }