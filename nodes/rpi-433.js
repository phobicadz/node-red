module.exports = function(RED) {
    
    var rpi = require('rpi-433'),
	rfEmitter = rpi.emitter({
		pin:0,
		pulseLength:350
	});
    
    function sendCode(config)
    {
        RED.nodes.createNode(this,config);
        var node = this;
        this.on('input', function(msg) {
           
	rfSend = rpi.emitter;

        var returnMessage;
           
	rfEmitter.sendCode(msg.payload, 2, function(error, stdout) {   //Send 1234 
  		if(!error) {	
			node.send(stdout); //Should display 1234
        		msg.payload = stdout;
			console.log(stdout);
		} else {
			node.send(error);
			msg.payload = error;
			console.log(error);
			}
    });
          
           node.send(msg.payload);
      });
    }
    
    RED.nodes.registerType('rpi433',sendCode);
}
