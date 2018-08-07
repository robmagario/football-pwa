const Bet = require('../../models/Bets');

module.exports= (app) => {
  app.post('/api/bets/placebet',(req,res,next)=>{
    const{query}=req;
    const{userID}=query;
    const{eventID}=query;
    const{betAmount}=query;
    const{currentOdds}=query;

    const newBet = new Bet();
    newBet.eventID = eventID;
    newBet.userID = userID;
    newBet.betAmount = betAmount;
    newBet.currentOdds=currentOdds;
    newBet.save((err, bet) => {
      if (err) {
        return res.send({
          success: false,
          message: 'Error: Server error'
        });
      }
      return res.send({
        success: true,
        message: 'Bet Placed!'
      });
    });
  });
};
