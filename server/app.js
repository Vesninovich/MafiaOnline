const wsserverSetup = require('./wsserver').setup;
const handleEvent = require('./game').handleEvent;

wsserverSetup(handleEvent);