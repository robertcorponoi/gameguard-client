import Eventverse from 'eventverse';
/**
 * The GameGuard client is used to establish a connection to the server send player info.
 */
export default class GameGuardClient extends Eventverse {
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
     * @param {Object} [options] The initialization parameters passed to this instance.
     * @param {boolean} [options.secure=false] Indicates whether the websocket will connect to the server with a secure connection or not.
     */
    constructor(options?: Object);
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
     * TODO:
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
