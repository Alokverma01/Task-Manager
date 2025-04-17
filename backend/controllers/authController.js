const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const {userModel} =  require("../models/userModel.js")
const { validateUser, createTodoSchema, updateTodoSchema } = require("../validations/validateUser.js")

// new user registration

const register = async(req, res) => {
    const validatedData = validateUser.parse(req.body);
    const {name, email, password} = req.body;
    if(!name || !email || !password) {
        return res.json({success : false, message : 'Missing Details'});
    }
    try {

        // checking existing user 
        const existingUser = await userModel.findOne({email});
        if(existingUser){
            return res.json({success: false, message : "User already Exists"});
        }

        // hash the password
        const hashedPassword = await bcrypt.hash(validatedData.password, 10);
        validatedData.password = hashedPassword;
        
        // Create new user with hashed password

        const user =  new userModel(validatedData);;
        await user.save();

        const token = jwt.sign({id: user._id},
                      process.env.JWT_SECRET,
                      {expiresIn: '7d'});   

                      res.cookie('token', token, {
                        httpOnly: true,
                        secure: process.env.NODE_ENV === 'production',
                        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
                        maxAge: 7 * 24 * 60 * 60 * 1000
                    });

                    return res.json({success: true});

    } catch (error) {
            return res.json({success: false, message : error.message})
    }
}

// user login

const login = async(req, res) => {
    const { email, password } = req.body;

    if(!email || !password){
        return res.json({success: false, message: 'Email and password are required'})
    }
    try {
        const user = await userModel.findOne({email});
        if(!user){
            return res.json({success: false, message: 'Invalid Email'})
        }
        const isMatch = await  bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.json({success: false, message: 'Invalid Password'})
        }
        const token = jwt.sign({id: user._id}, 
                                process.env.JWT_SECRET,
                                { expiresIn: '7d'});
        res.cookie('token' , token, {
            httpOnly : true,
            secure : process.env.NODE_ENV === 'production',
            sameSite : process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge : 7 * 24 * 60 * 60 * 1000
        });

        return res.json({success: true});
    
    } catch (error) {
        return res.json({success:  false , message: error.message});
    }
}



//  user logout

const logOut = async(req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        })
        
        return res.json({ success : true, message: "Logout Successfully"})
    } catch (error) {
        return res.json({success: false, message: error.message});        
    }
}

// check if user is Authenticated

const isAuthenticated = async (req, res) => {
    try {
        return res.json({success:  true});
    } catch (error) {
        return res.json({success: false, message: error,message})
    }
}

module.exports = {
    register,
    login,
    logOut,
    isAuthenticated,
}