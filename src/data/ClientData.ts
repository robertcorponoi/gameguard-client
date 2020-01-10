'use strict'

import cookies from './cookies';
import uuid from '../utils/uuid';

/**
 * Provides methods to set, get, and work with data stored on the client side in cookies.
 */
export default class ClientData {
  /**
   * Gets the GameGuard player id from the current player, if it doesn't exist then a player id will be assigned to the player and returned.
   * 
   * @returns {string} Returns the player id.
   */
  getPlayerId(): string {
    let playerId: string = cookies.get('gameguardPlayerId');

    if (!playerId) {
      playerId = uuid.v4();

      cookies.set('gameguardPlayerId', playerId);
    }

    return playerId;
  }
}