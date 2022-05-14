const bcrypt = require("bcryptjs");
const User = require("../modals/User.js");
const jwt = require("jsonwebtoken");


const register = async (req,res,next)=> {
    try {
        const {username , email, password , confirm_password } = req.body;
        const user = await User.findOne({email:email});
        if(user){
            res.status(400).json("Email Allready Exists..")
        }else{
            if(username && email && password && confirm_password){
                if(password === confirm_password){
                    const savedUser = new User(req.body)
                    await savedUser.save();
                    res.status(201).json(savedUser)
                }else{
                    res.status(400).json("Password And Confirm_Password does't match" )
                }
            }else{
                res.status(400).json("All Fields All Required")
            }
        }

    } catch (error) {
        next(error)
    }
}

const login = async (req,res,next) => {
    try {
        const {username,  password } = req.body;
        if(username && password){
            const user = await User.findOne({username:username});
            if(user != null){
                const isMatch = await bcrypt.compare(password , user.password)
                if(user.username === username && isMatch){
                    const token = jwt.sign({id:user._id, isAdmin:user.isAdmin},process.env.JWT)
                    const { password ,isAdmin ,...others } = user._doc
                    res.cookie("access_token", token ,{
                        httpOnly: true,
                    }).status(200).json({user:others});
                }else{
                    res.json("Wrong Credentials");
                }
            }else{
               res.json("You Are Not Registered User");
            }

        }else{
            res.status(400).json("All Fields All Required");
        }
    } catch (error) {
        next(error)
    }
}

module.exports = { register , login }