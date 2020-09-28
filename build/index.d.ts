import Hypergiant from 'hypergiant';
/**
 * GameGuardClient communicates with the server to manage the player and their
 * data.
 */
export default class GameGuardClient {
    /**
     * The options passed to GameGuardClient on initialization.
     *
     * @private
     *
     * @property {Options}
     */
    private _options;
    /**
    * The GameGuardClient instance WebSocket connection.
    *
    * @private
    *
    * @property {WebSocket}
    */
    private _socket;
    /**
     * The signal that is dispatched when the client is assigned a player id.
     *
     * This signal is dispatched with the id that was assigned to this client.
     *
     * @private
     *
     * @property {Hypergiant}
     */
    private _connected;
    /**
     * The signal that is dispatched when the client receives a message from
     * the GameGuard server.
     *
     * This signal is dispatched with the message that was sent to the client.
     *
     * @property {Hypergiant}
     */
    private _messaged;
    /**
     * The signal that is dispatched when the client's connection with the
     * GameGuard server is ended.
     *
     * This signal is dispatched with the close code and reason.
     *
     * @private
     *
     * @property {Hypergiant}
     */
    private _disconnected;
    /**
     * This client's latency to the GameGuard server, in milliseconds.
     *
     * @private
     *
     * @property {number}
     */
    private _latency;
    /**
     * @param {Object} [options] The initialization parameters passed to this instance.
     * @param {boolean} [options.useSecure=false] Indicates whether the websocket will connect to the server with a secure connection or not.
     */
    constructor(options?: Object);
    /**
     * Returns the connected signal.
     *
     * @returns {Hypergiant}
     */
    get connected(): Hypergiant;
    /**
     * Returns the messaged signal.
     *
     * @returns {Hypergiant}
     */
    get messaged(): Hypergiant;
    /**
     * Returns the disconnected signal.
     *
     * @returns {Hypergiant}
     */
    get disconnected(): Hypergiant;
    /**
     * Returns this client's latency to the server, in milliseconds.
     *
     * @returns {number}
     */
    get latency(): number;
    /**
     * Create the WebSocket connection and attach the methods that respond to the
     * `open`, `message`, and `close` events.
     *
     * @private
     */
    private _connectToServer;
    /**
     * Called when the connection to the GameGuard server is created and it sends
     * the player's id to the server and lastly dispatches the `connected` signal
     * to let the user know that they have successfully connected.
     *
     * @private
     */
    private _onopen;
    /**
     * When the client receives a message from the GameGuard server, we first
     * check to see if it's an internal message that we need to respond to. If
     * it's not a message for us, then we dispatch the `messaged` signal so that
     * the user can respond to the message.
     *
     * @private
     *
     * @param {MessageEvent} message The message event received from the GameGuard server.
     */
    private _onmessage;
    /**
     * When the client's connection to the GameGuard server is closed, we dispatch
     * the `disconnected` signal which could be used by the user to stop the game
     * for the client.
     *
     * @private
     *
     * @property {Event} event The WebSocket close event Object.
     */
    private _onclose;
}
