const db=require('./../model/index')
const User=db.users;
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

exports.login=async(req,res)=>{
    const userid=req.body.userid
                const password=req.body.password
                console.log(userid)
                console.log(password)
                const user=await User.findOne({email:userid});
                if(user){
                    let match=await bcrypt.compare(password,user.password);
                    if(match){
                        let token=jwt.sign({email:user.email,role:user.role},process.env.SECRET_KEY);
                        await User.update({_id:user._id},{$set:{token:token}})
                        let user1={email:user.email,role:user.role};
                        res.cookie('token',token).send(user1);
                    }else{
                        res.send(msg);
                    }
                }else{
                    let msg={msg:"invalid credentials"}
                    res.send(msg);
                }
}

exports.logout=async(req,res)=>{
    const token=await jwt.verify(req.cookies.token,process.env.SECRET_KEY);
                const user=await User.findOneAndUpdate({email:token.email},{$set:{token:'null'}});
                res.clearCookie('token').send({msg:"logged out succesfully"})
}