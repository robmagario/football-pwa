const User =require('../../models/User');
const Deposit = require('../../models/Deposit');

module.exports = (app)=>{
  app.post('/api/deposit/depositrequest',(req,res,next)=>{
    const{query} = req;
    const {userid} = query;
    const {amount} = query;
    const{advice}=query;

    const newDeposit = new Deposit();
    newDeposit.user = userid;
    newDeposit.amount = amount;
    newDeposit.advice = advice;

    newDeposit.save((err,deposit)=>{
      if(err){
        return res.send({
          success:false,
          message:"Server Error"
        })
      }
      return res.send({
        success:true,
        message:"Deposit Request Sent",
        deposit:deposit
      })
    })

  });
  app.post('/api/deposit/confirmdeposit',(req,res,next)=>{
    const{query} = req;
    const {depositID} = query;
    Deposit.findOneAndUpdate({_id:depositID},{$set:{confirmed:true}},function(err,deposit){
      if(err){
        return res.send({
          success:false,
          message:"No such deposit request"
        })
      }
      User.findOneAndUpdate({_id:deposit.user},{$inc:{bankAmount:deposit.amount}},{new:true},function(err,deposit){
        if(err){
          return res.send({
            success:false,
            message:"No such user"
          })
        }
        return res.send({
          success:true,
          message:"Deposit Confirmed"
        })
      });
    });
    });

    app.get('/api/deposit/getdepositrequests',(req,res,next)=>{
      Deposit.find({},(err,deposits)=>{
        return res.send({
          success:true,
          depositList:deposits
        })
      });
    });


};
