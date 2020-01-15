'use strict'

const path = require('path');
const fastify = require('fastify')({ logger: true });

const GameGuard = require('gameguard');

fastify.register(require('fastify-static'), { root: path.resolve(__dirname) });

const gg = new GameGuard(fastify.server);

gg.players.on('player-connected', (player) => console.log(player));

fastify.get('/', async (request, reply) => reply.sendFile('index.html'));

fastify.listen(3000, (err, address) => {
  if (err) throw err;

  fastify.log.info(`server listening on ${address}`);
});
