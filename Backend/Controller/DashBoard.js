const User = require('../models/User');

const fetchUserData = async (req,resp) =>{
const {jUserId} = req.user;
try {
    const response = await User.findOne({where:{id:jUserId},attributes:["name"]})
    if(!response) return resp.status(400).json({message:"User not found"});
    return resp.status(200).json({userData:response});
} catch (error) {
    return resp.status(500).json({message:"Internal Server Error"})
}
}

module.exports = fetchUserData;