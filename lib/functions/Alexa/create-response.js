// name: create response
// outputs: 1
// create response template
responseJSON = {
  "version": "1.0",
  "sessionAttributes": {},
  "response": {
    "outputSpeech": {
      "type": "PlainText",
      "text": "I'm sorry I did'nt understand your question"
    },
    "reprompt": {
      "outputSpeech": {
        "type": "PlainText",
        "text": "Can I help you with anything else?"
      }
    },
    "shouldEndSession": false
  }
};

trigger = msg.payload.request.intent.slots.trigger.value;
person = msg.payload.request.intent.slots.person.value;
datatwo = msg.payload.request.intent.slots.datatwo.value;
dataone = msg.payload.request.intent.slots.dataone.value;

if (trigger == "bedroom") {
    responseJSON.response.outputSpeech.text = "The Temperature in "+ person + " " + trigger + " is " + flow.get("temperature") + " degrees";
} else if (trigger == "living room" && dataone == "lights") {
    msg.value1 = trigger;
    msg.value2 = dataone;
    msg.value3 = datatwo;
    responseJSON.response.outputSpeech.text = "Turning the " + trigger + " " + dataone + " " + datatwo; 
}

// add modified payload and headers for response
msg.payload = JSON.stringify(responseJSON,["version","sessionAttributes","supportedHoriscopePeriods","daily","weekly","monthly","response","outputSpeech","type","text","card","title","content","reprompt","shouldEndSession"]);
msg.headers = { "Content-Type": "application/json;charset=UTF-8","Content-Length":"" };

return msg;