const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const model = require("../Model/users");
const User = model.User;

// kuch technikal problem ki waje se muje auth ko users.js me hi karna pad rha hai bad shi karna saabjji 
//ek bat sun jase signup kara to hash pass store huaa ab login ke type decryp karneg  to compare hoga ji 


// esme dekh jo shhhhh hai na usko or secure banana hai taki tocken strong bane iske lye private publiic key use kar sakta hai tu expore karna sabji 
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