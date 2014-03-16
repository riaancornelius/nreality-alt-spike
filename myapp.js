var express = require('express')
    app = express.createServer(),
    config = require('./config'),
    mongoose = require('mongoose'),
    db = mongoose.connect('mongodb://cloud9:eK93cKuyX8m^@ds033469.mongolab.com:33469/alt-spike'),
    Schema = mongoose.Schema;
 
var Event = new Schema({
    name:String,
    description:String,
    longitude: Number,
    latitude: Number
});

var eventModel = mongoose.model('Event', Event);
 
var event = new eventModel();
 
event.name = 'Helderfontein MTB open';
event.description = 'First annual Helderfontein open MTB event';
event.longitude = 28.027256;
event.latitude = -25.989118;
event.save(function(err) {
  if (err) throw err;
  console.log('Event saved, starting server...');
  app.listen(3000);
}); 
 
app.configure( function() {
    console.log('I will be listening on: ' + config.routes.feed);
});
 
app.get(config.routes.feed, function(req, res) {
    res.contentType('application/json'); 
 
    eventModel.find(function(err, event) {
      if (event != null) {
        console.log('Found the Event:' + event.name);
        res.send(JSON.stringify(event));
      }
    }).limit(1);
});