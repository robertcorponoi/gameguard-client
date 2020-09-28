'use strict'

/**
 * Mocks some of the functionality of the GameGuard server for some of the
 * tests since we can't use GameGuard server from the teset files.
 */
export default class MockGameGuardServer {
  /**
   * @param {WebSocket} ws A reference to the client's WebSocket connection.
   */
  constructor(ws) {
    /**
     * A reference to the client's WebSocket connection.
     * 
     * @property {ws}
     */
    this.ws = ws;
  }

  /**
   * Simulates the player being kicked from the server.
   */
  kick() {
    this.ws.close(4002, 'You have been kicked from the GameGuard server');
  }

  /**
   * Simulates the player being banned from the server.
   */
  ban() {
    this.ws.close(4003, 'You have been banned from the GameGuard server');
  }
}
