const Event = require('../../models/Event');
const Option = require('../../models/Option');

module.exports = (app)=>{
  app.post('/api/create/createoption',(req,res,next)=>{
    const {query}=req;
    const {name} = query;
    const {win} = query;
    const {loss} = query;
    const {thumbnail} = query;
    const {event} = query;
    const newOption = new Option();
    newOption.name = name;
    newOption.win = win;
    newOption.loss = loss;
    newOption.thumbnail = thumbnail;

    Event.findOneAndUpdate({slug:event},{$push:{options:newOption}},null,(err,foundevent)=>{
      if(err){
        return res.send({
          success:false,
          message:'Server Error!'
        });


      }
      if(foundevent===null){
        return res.send({
          success:false,
          message:'No event registered'
        });
      }


      newOption.save((err, event) => {
        if (err) {
          return res.send({
            success: false,
            message: 'Error: Server error'
          });
        }
        else {
          return res.send({
            success: true,
            message: 'Option Created!'
          });
        }
      });
    });




  });

  app.get('/api/event/getoptions',(req,res,next)=>{
    const {query} = req;
    const{eventslug}=query;
    Event.findOne({slug:eventslug},(err,options)=>{
      return res.send({
        success:true,
        optionsList:options.options
      });
    })
  })
};
