import Message from './Message';
/**
* Encodes a message from a message object to an ArrayBuffer.
*
* @param {Message} message The message to encode.
*
* @returns {ArrayBuffer} Returns the message as an ArrayBuffer.
*/
export declare function messageToBuffer(message: Message): ArrayBuffer;
/**
 * Checks to see if a player is an existing player by checking for a cookie
 * containing their player id. If no existing player id is found, then a new
 * one is created for the player.
 *
 * @returns {string} Returns an existing or new player id.
 */
export declare function getPlayerId(): string;
