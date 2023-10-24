const { io } = require("socket.io-client");
const CONFIG = require('./config.js');

const url = CONFIG.url;

console.log('socket mode url:', url)
let socket;
if (url.includes("localhost")) {
  console.log('initialize socket')
  socket = io("http://localhost:4007/", {
    path: '/vote-client/socket.io',
    transportOptions: {
      polling: {
        extraHeaders: {
          'my-custom-header': 'abcd'
        }
      }
    },
    transports: ['websocket'], // <---- Add this line
    secure: false,  // ensure secure connection
  });
  console.log('socket created')
} else {
  //console.log('initialize socket - online')
  //console.log('socket url:', url + "vote-client/socket.io")
  //socket = io(url, {
  //  path: '/vote-client/socket.io',
  //  transportOptions: {
  //    polling: {
  //      extraHeaders: {
  //        'my-custom-header': 'abcd'
  //      }
  //    }
  //  },
  //  transports: ['websocket'], // <---- Add this line
  //  secure: true,  // ensure secure connection
  //  rejectUnauthorized: false  // ignore self-signed certificates
  //});

  ////socket = io(url, {
  ////  path: '/socket.io',
  ////  transportOptions: {
  ////    polling: {
  ////      extraHeaders: {
  ////        'my-custom-header': 'abcd'
  ////      }
  ////    }
  ////  },
  ////  secure: true,  // ensure secure connection
  ////  rejectUnauthorized: false  // ignore self-signed certificates
  ////});

  //socket.on('connect', () => {
  //  console.log('Socket connection established');
  //});

  //socket.on('connect_error', (error) => {
  //  console.error('Socket connection error:', error);
  //});

  //socket.on('disconnect', (reason) => {
  //  console.log('Socket disconnected:', reason);
  //});
}

module.exports = { socket }
