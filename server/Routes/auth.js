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


 

  const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
      console.log('No token found');
      return res.status(401).json({ message: 'Unauthorized' });
    }
    jwt.verify(token, 'Secret Key', (err, decoded) => {
      if (err) {
        console.error('Error verifying token:', err);
        return res.status(401).json({ message: 'Invalid token' });
      }
      console.log('Decoded token:', decoded);
      req.userId = decoded.id;
      req.userRole = decoded.role;
      next();
    });
  };

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



//fetch all the users 
router.get('/allusers', async (req,res) => {
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


// Add Friend Route
router.post('/addfriend', verifyToken, async (req, res) => {
  const { friendId } = req.body;
  console.log("a ki aay",friendId)
  try {
      const user = await UserModel.findById(req.userId);
      console.log(user);
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      // Check if friendId is already in the friends list
      if (user.friends.includes(friendId)) {
          return res.status(400).json({ message: 'Friend already added' });
      }

      // Add friendId to the user's friends list
      user.friends.push(friendId);
      await user.save();

      return res.json({ message: 'Friend added successfully', friends: user.friends });
  } catch (error) {
      console.error('Error adding friend:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Get friends of the logged-in user
router.get('/friends', verifyToken, async (req, res) => {
  try {
      const user = await UserModel.findById(req.userId).populate('friends', 'name email');
      res.json(user.friends);
  } catch (error) {
      console.error('Error fetching friends:', error);
      res.status(500).json({ message: 'Internal Server Error' });
  }
});




module.exports = router