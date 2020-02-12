import Hypergiant from 'hypergiant';
/**
 * The GameGuard client is used to establish a connection to the server send player info.
 */
export default class GameGuardClient {
    /**
     * A reference to this client's options.
     *
     * @private
     *
     * @property {Options}
     */
    private _options;
    /**
    * A reference to this client's WebSocket connection.
    *
    * @private
    *
    * @property {WebSocket}
    */
    private _socket;
    /**
     * A reference to the ClientData module.
     *
     * @private
     *
     * @property {ClientData}
     */
    private _clientData;
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
     * The signal that is dispatched when the client receives a message from the server.
     *
     * This signal is dispatched with the message that was sent to the client.
     *
     * @private
     *
     * @property {Hypergiant}
     */
    private _messaged;
    /**
     * The signal that is dispatched when the client's connection with the server is ended.
     *
     * This signal is dispatched with the close code and reason.
     *
     * @private
     *
     * @property {Hypergiant}
     */
    private _disconnected;
    /**
     * This client's latency to the server, in milliseconds.
     *
     * @private
     *
     * @property {number}
     */
    private _latency;
    /**
     * @param {Object} [options] The initialization parameters passed to this instance.
     * @param {boolean} [options.secure=false] Indicates whether the websocket will connect to the server with a secure connection or not.
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
     * Initialize the WebSocket connection and all of the events that we need to respond to.
     *
     * @private
     */
    private _boot;
    /**
     * When the WebSocket connection opens, we check to see if they are an existing GameGuard player using cookies
     * and if they are not then they are assigned a new GameGuard player id.
     *
     * @private
     */
    private _onOpen;
    /**
     * When the client receives a message from the player, dispatch a signal with the message that was sent.
     *
     * @private
     *
     * @param {string} message The message Object received from the server.
     */
    private _onMessage;
    /**
     * When the WebSocket connection closes, we end the players connection to the game and notify them why, if a reason
     * was provided.
     *
     * @private
     *
     * @property {Event} ev The WebSocket close event Object.
     */
    private _onClose;
}
