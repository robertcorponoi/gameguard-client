'use strict'

const path = require('path');
const fastify = require('fastify')({ logger: true });

// Require the GameGuard server.
const GameGuard = require('gameguard');

// Create a new instance of GameGuard server by passing in the Fastify server
// instance.
const gameguard = new GameGuard(fastify.server);

// We use the current folder to serve the game and the js-cookies module so
// that we can use it in the tests.
fastify.register(require('fastify-static'), { root: path.resolve(__dirname) });
// fastify.register(require('fastify-static'), { root: path.resolve(__dirname, '..', 'node_modules', 'js-cookie'), prefix: '/cookie/', decorateReply: false });

// Serve the test html page at the root.
fastify.get('/', async (request, reply) => reply.sendFile('index.html'));

// Have the Fastify server listen on port 3000.
fastify.listen(3000, (err, address) => {
  if (err) throw err;
  fastify.log.info(`server listening on ${address}`);
});
