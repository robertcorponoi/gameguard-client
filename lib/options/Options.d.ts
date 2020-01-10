/**
 * The options available for an instance of GameGuard client and their default values.
 */
export default class Options {
    /**
     * Indicates whether the websocket will connect to the server with a secure connection or not.
     *
     * @property {boolean}
     *
     * @default false
     */
    secure: boolean;
    /**
     * @param {Object} options The initialization parameters passed to the GameGuard client instance.
     * @param {boolean} [options.secure=false] Indicates whether the websocket will connect to the server with a secure connection or not.
     */
    constructor(options: Object);
}
