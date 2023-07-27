const { io } = require("socket.io-client");
const CONFIG = require('./config.js');

const url = CONFIG.url;

console.log('socket mode url:', url)
if (url.includes("localhost")) {
  console.log('initialize socket')
  socket = io("http://localhost:4007/", {
    withCredentials: true,
    extraHeaders: {
      "my-custom-header": "abcd"
    }
  });
  console.log('socket created')
} else {
  console.log('initialize socket - online')
  console.log('socket url:', url + "/socket.io")
  socket = io(url + "/socket.io", {
    withCredentials: true,
    extraHeaders: {
      "my-custom-header": "abcd"
    }
  });
  console.log('socket created - online')
}

module.exports = { socket }