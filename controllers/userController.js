
const User = require("../models/userModel");
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword=await bcrypt.hash(password,10)
    const isExistingUser = await User.findOne({ username: username});
    if (isExistingUser) {
      return res.status(400).json({ msg: "username already exists" });
    }
    const newUserCreated = await User.create({
      username,
      password:hashedPassword,
    });

    res
      .status(200)
      .json({ user: newUserCreated, message: "User registered successfully" });
  } catch (error) {
    console.log(error);
  }
};

const login =async(req,res)=>{

  
const {username,password}=req.body
   const dbUser = await User.findOne({username:username})
   
if(dbUser){
  const isPasswordMatched=await bcrypt.compare(password,dbUser.password)

  if(isPasswordMatched===true){
    const payload={username:username}
    const jwtToken= jwt.sign(payload,"MY_SECRET_TOKEN")
 return res.status(200).send({jwtToken})
}else{
  return res.status(400).send("Invalid Password")
}
}else{
  return res.status(400).send("Invalid User")
}
}
module.exports = { register,login};
