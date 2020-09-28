'use strict'

/**
 * The options available for an instance of GameGuardClient and their default values.
 */
export default class Options {
  /**
   * Indicates whether the websocket will connect to the server with a secure connection or not.
   * 
   * @property {boolean}
   * 
   * @default false
   */
  useSecure = false;

  /**
   * @param {Object} options The options passed to GameGuardClient on initialization.
   * @param {boolean} [options.useSecure=false] Indicates whether the websocket will connect to the server with a secure connection or not.
   */
  constructor(options: Object) {
    Object.assign(this, options);
  }
}