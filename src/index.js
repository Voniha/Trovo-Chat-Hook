// Trovo imports
const token = require("./functions/getToken");
const socket = require("./functions/websocket");

// Program imports
const intModule = require("./functions/interactiveModule");

// Program Functionality
(async () => intModule.ask())();