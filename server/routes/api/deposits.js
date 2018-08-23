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
    });

  });
  app.post('/api/deposit/confirmdeposit',(req,res,next)=>{
    const {query}=req;
    const{depositID,transID}=query;
    Deposit.find({transactionID:transID},(err,prevdeposits)=>{
      if(err){
        return res.send({
          success:false,
          message:"Server Error"
        });
      }
      Deposit.find({_id:depositID},(err,deposit)=>{
        if(prevdeposits.length>0){
          Deposit.findOneAndUpdate({_id:depositID},{$set:{status:"Rejected"}},(err,deposit)=>{
            return res.send({
              success:false,
              message:"Rejected"
            });
          });
        }
        else{
          Deposit.findOneAndUpdate({_id:depositID},{$set:{status:"Confirmed",transactionID:transID}},(err,deposit)=>{
            User.findOneAndUpdate({_id:deposit.user},{$inc:{bankAmount:deposit.amount}},(err,user)=>{
              return res.send({
                success:true,
                message:"Deposit Confirmed",
                deposit:deposit,
                user:user
              })
            });

          });

        }
      })
    })
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
