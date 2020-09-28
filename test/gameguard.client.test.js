'use strict'

import Cookies from 'https://cdn.jsdelivr.net/npm/js-cookie@rc/dist/js.cookie.min.mjs';
import MockGameGuardServer from './MockGameGuardServer.js';
import GameGuardClient from './gameguard-client.js';

let gg;
let mockGameGuardServer;
let lastPlayerId;

// In case Vue devtools are being used we want to add a global so that we don't
// get an error.
mocha.setup({ globals: ['__VUE_DEVTOOLS_TOAST__'] });

/**
 * Before each test we want to initialize a new instance of the GameGuardClient
 * and the MockGameGuardServer.
 */
beforeEach(() => {
  gg = new GameGuardClient();
  mockGameGuardServer = new MockGameGuardServer(gg._socket);
});

/**
 * After each test we want to set the current instance of the GameGuardClient
 * and MockGameGuardServer to null.
 */
afterEach(() => {
  gg = null;
  mockGameGuardServer = null;
});

describe('Connecting', function () {
  it('should create a playerId for a new client', function (done) {
    Cookies.remove('gameguardPlayerId', { path: '' });

    gg.connected.add(playerId => {
      lastPlayerId = playerId;
      chai.expect(playerId).to.not.be.null;
      done();
    });
  });

  it('should save the last player id of the player in a cookie', function (done) {
    gg.connected.add(playerId => {
      chai.expect(playerId).to.equal(lastPlayerId);
      done();
    });
  });

  it('should dispatch a signal when the client connects to the GameGuard server', function (done) {
    const spy = sinon.spy();
    gg.connected.add(spy);

    setTimeout(() => {
      chai.expect(spy.calledOnce).to.be.true;
      gg.connected.removeAll();
      done();
    }, 500);
  });
});

describe('Disconnecting', function () {
  it('should dispatch a signal when the client disconnects from the GameGuard server', function (done) {
    const spy = sinon.spy();
    gg.disconnected.add(spy);

    gg.connected.add(() => {
      mockGameGuardServer.kick();

      setTimeout(() => {
        chai.expect(spy.calledOnce).to.be.true;
        gg.connected.removeAll();
        gg.disconnected.removeAll();
        done();
      }, 500);
    });
  });

  it('should send the client a message when they have been kicked', function (done) {
    gg.disconnected.add(event => {
      chai.expect(event.code).to.equal(4002) && chai.expect(event.reason).to.equal('You have been kicked from the GameGuard server');
      gg.connected.removeAll();
      gg.disconnected.removeAll();
      done();
    });

    gg.connected.add(() => mockGameGuardServer.kick());
  });

  it('should send the client a message when they have been banned', function (done) {
    gg.disconnected.add(event => {
      chai.expect(event.code).to.equal(4003) && chai.expect(event.reason).to.equal('You have been banned from the GameGuard server');
      gg.connected.removeAll();
      gg.disconnected.removeAll();
      done();
    });

    gg.connected.add(() => mockGameGuardServer.ban());
  });
});

describe('Messaging', function () {
  it('should establish a latency with the GameGuard server after a few seconds', function (done) {
    this.timeout(10000);

    setTimeout(() => {
      chai.expect(gg.latency).to.be.greaterThan(0);
      done();
    }, 9000);
  });
});