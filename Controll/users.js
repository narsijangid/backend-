//game starting from here .. jwt ka kam bas itna hota hai ki ek token banata hai or store karat 

const model = require("../Model/users");
const User = model.User;
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');


exports.getAllusers = async (req, res) => {
 

  
  try {
    const users = await User.find()
    res.json(users);
  } catch (error) {
    console.error("Full error object:", error);
   
    
  
}}




exports.Getuser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId).select('-password -token');
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ 
      error: "Server error",
      message: error.message 
    });
  }
};



// -------------------------------------
exports.createuser = async (req, res) => {
  try {
    const user = new User(req.body);
    var token  = jwt.sign({email: req.body.email},'shhhh')

    const hash = bcrypt.hashSync(req.body.password, 10);


    user.token = token;  

    user.password = hash
  
    const savedUser = await user.save();
    
    // Return user data without sensitive information
    res.status(201).json({
      _id: savedUser._id,
      firstName: savedUser.firstName,
      lastName: savedUser.lastName,
      email: savedUser.email,
      createdAt: savedUser.createdAt
    });
    
  } catch (err) {
    console.error("Error creating user:", err);
    
    // Handle duplicate email error
    if (err.code === 11000) {
      return res.status(400).json({ 
        error: "Email already exists",
        field: "email"
      });
    }
    
    // Handle validation errors
    if (err.name === 'ValidationError') {
      const errors = {};
      for (const field in err.errors) {
        errors[field] = err.errors[field].message;
      }
      return res.status(400).json({ 
        error: "Validation failed",
        details: errors 
      });
    }
    
    res.status(500).json({ 
      error: "Server error",
      message: err.message 
    });
  }
};