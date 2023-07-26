const { io } = require("socket.io-client");

const socket = io("http://localhost:4007/", {
  withCredentials: true,
  extraHeaders: {
    "my-custom-header": "abcd"
  }
}
  );

  module.exports = { socket }