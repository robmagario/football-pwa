const Event = require('../../models/Event');

module.exports = (app)=>{
  app.post('/api/create/createevent',(req,res,next)=>{
    const{query}=req;
    const{name} = query;
    const {category}=query;
    const newEvent = new Event();
    newEvent.name = name;
    newEvent.slug = name.toLowerCase().replace(/ /g,'-');
    newEvent.category  = category;
    newEvent.save((err, event) => {
      if (err) {
        return res.send({
          success: false,
          message: 'Error: Server error'
        });
      }
      return res.send({
        success: true,
        message: 'Event Created!'
      });
    });
  });
  app.get('/api/event/getevents',(req,res,next)=>{
    Event.find({},(err,events)=>{
      return res.send({
        success:true,
        eventList:events
      })
    });
  })
};
