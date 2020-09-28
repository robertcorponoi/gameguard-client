'use strict'

import Cookies from 'js-cookie';
import Message from './Message';

/**
* Encodes a message from a message object to an ArrayBuffer.
* 
* @param {Message} message The message to encode.
* 
* @returns {ArrayBuffer} Returns the message as an ArrayBuffer.
*/
export function messageToBuffer(message: Message): ArrayBuffer {
  const encoder = new TextEncoder();
  const { type, contents, timestamp } = message;

  const stringified = JSON.stringify({ type, contents, timestamp });
  return encoder.encode(stringified);
}

/**
 * Checks to see if a player is an existing player by checking for a cookie
 * containing their player id. If no existing player id is found, then a new
 * one is created for the player.
 * 
 * @returns {string} Returns an existing or new player id.
 */
export function getPlayerId(): string {
  const existingPlayerId = Cookies.get('gameguardPlayerId');
  if (existingPlayerId) return existingPlayerId;

  const newPlayerId = generatePlayerId();
  Cookies.set('gameguardPlayerId', newPlayerId, { expires: 365, path: '' });
  return newPlayerId;
}

/**
 * Generates a v4 compliant uuid to use for player ids.
 * 
 * This is based off the answer from: https://stackoverflow.com/a/2117523/4274475
 * 
 * @returns {string} Returns a valid v4 uuid.
 */
function generatePlayerId(): string {
  // @ts-ignore
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}