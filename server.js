'use strict';

const Hapi = require('hapi');
const mongojs = require('mongojs');

// Create a server with a host and port
const server = new Hapi.Server();
server.connection({
  port: 3000
});

//Connect to db
server.app.db = mongojs('development', ['webinars']);

//Load plugins and start server
server.register([
  require('./routes/webinars')
], (err) => {

  if (err) {
    throw err;
  }

  // Start the server
  server.start((err) => {});

  }
);

module.exports = server;