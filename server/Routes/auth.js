const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const UserModel = require('../model/UserSchema')

//register the user

router.post('/register', async (req,res) => {
    const { name,email,password } = req.body;
    if(!name || !email || !password){
        return res.json({message:"please fil all fields"})
    }
    const user = await UserModel.findOne({email})
    if(user){
        return res.json({message:"email already exist"})
    }
    const hashPassword = await bcrypt.hash(password,10)
    const newUser = new UserModel({name,email,password:hashPassword})
    await newUser.save()
    return res.json({message:"user register successfully"})
})

// login the user

router.post('/login' , async (req,res) => {
    const { email,password } = req.body;
    if( !email || !password){
        return res.json({message:"please fil all fields"})
    }
    const user = await UserModel.findOne({email})
    if(!user){
        return res.json({message:"email not found"})
    }
    const validPassword = await bcrypt.compare(password,user.password)
    if(!validPassword){
        return res.json({message:"incorrect password"})
    }

    const token = jwt.sign({ id: user._id, role: user.role }, "Secret Key");

    res.cookie("token",token);
    return res.json({message:"logined",id:user._id, role:user.role})
})


// User Panel 
const verifyUser = (req,res,next) => {
    const token = req.cookies.token;
    if(!token){
       console.log("token is mising");
       return res.json("token is missing")
    } else {
        jwt.verify(token,"Secret Key", (err,decoded) => {
            if(err){
                console.log("token error");
                return res.json("error with token")
            } else{ 
                // console.log("Decoded:", decoded);
            if(decoded.role == "admin"){
                console.log("this is  admin");
                  res.json("admin")
                next(); 
            }  
            else if(decoded.role == "recruiter"){
                console.log("this is  recruiter ");
                 res.json("recruiter")
                next();
            } 
            else if (decoded.role == "user"){
                 console.log("this is user");
                 res.json("user")
                next();
            } else{
                 console.log("error with decoded");
                 res.json("error with decoded");
            }
        }
       }) 
    }
  }
  router.get('/dashboard', verifyUser, (req,res) => {
    res.json("success")
  })

  

//   get single user 
router.get('/user', verifyToken, async (req, res) => {
    try {
      const user = await UserModel.findById(req.userId, { name: 2, email: 1,role:1, _id: 1 });
      res.json({ name: user.name, email: user.email,role:user.role,id:user._id });
    } catch (error) {
        console.log("backend error");
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });





//fetch all the users stakeholders
router.get('/stakeholders', async (req,res) => {
    UserModel.find({})
    .then((users) =>{
        return res.json(users)
    })
    .catch(err => console.log(err))
})

//logout the user
router.get('/logout',  (req,res) => {
    res.clearCookie('token')
    return res.json({message:"token removed"})
})

module.exports = router