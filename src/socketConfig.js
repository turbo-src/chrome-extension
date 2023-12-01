const { io } = require("socket.io-client");
const CONFIG = require('./config.js');

const url = CONFIG.url;

let socket;

module.exports = { socket }
