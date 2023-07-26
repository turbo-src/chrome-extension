const { io } = require("socket.io-client");
const CONFIG = require('./config.js');

const url = CONFIG.url;

// get url
console.log('socket mode url:', url)
if (url === "http://localhost:4000/graphql" || url === "http://localhost:4006/graphql") {
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

  console.log('socket url:', url + ":4007")
  socket = io(url + ":4007", {
    withCredentials: true,
    extraHeaders: {
      "my-custom-header": "abcd"
    }
  });
  console.log('socket created - online')
}

module.exports = { socket }