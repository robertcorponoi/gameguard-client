'use strict'

/**
 * The structure of a message sent between the GameGuardClient and GameGuard.
 */
export default class Message {
  /**
   * The type of message the message is.
   * 
   * @property {string}
   */
  type: string;

  /**
   * The contents of the message.
   * 
   * @property {string}
   */
  contents: string;

  /**
   * The timestamp of when the message was created.
   * 
   * @property {number}
   */
  timestamp: number;

  /**
   * @param {string} type The type of message that is being sent.
   * @param {string} contents The actual contents of the message.
   */
  constructor(type: string, contents: string) {
    this.type = type;
    this.contents = contents;
    this.timestamp = + new Date();
  }
}
