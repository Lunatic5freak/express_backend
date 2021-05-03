const db=require('./../model/index')
const Plan=db.plans;
const jwt=require('jsonwebtoken')

exports.create=async (req,res)=>{
    let cookie=await jwt.verify(req.cookies.token,process.env.SECRET_KEY);
              if(cookie.role==='admin'){
                let plan=new Plan({
                    name:req.body.name,
                    price:req.body.price,
                    validity:req.body.validity
                })
                const plan1=await plan.save()
                res.send(plan1);
              }else{
                  res.send({msg:'unauthorized'})
              }
}

exports.update=async(req,res)=>{
    let cookie=await jwt.verify(req.cookies.token,"supersecret");
                if(cookie.role==='admin'){
                    let id={_id:req.params.id}
                    const plan=await Plan.findOneAndUpdate(id,req.params,{ useFindAndModify: false });
                    res.send(plan);
                }else{
                    res.send({msg:'unauthorized'})
                }
}

exports.delete=async(req,res)=>{
    let cookie=await jwt.verify(req.cookies.token,"supersecret");
    if(cookie.role==='admin'){
        let msg={msg:'deleted'}
        await Plan.findByIdAndRemove({_id:req.params.id});
        res.send(msg);
    }else{
        res.send({msg:'authorized'})
    }
}

exports.findall=async(req,res)=>{
    const plans=await Plan.find({});
    res.send(plans);
}