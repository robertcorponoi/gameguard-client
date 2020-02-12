'use strict'

import Hypergiant from 'hypergiant';

import Message from './message/Message';
import Options from './options/Options';
import ClientData from './data/ClientData';

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
  private _options: Options;

  /**
  * A reference to this client's WebSocket connection.
  * 
  * @private
  * 
  * @property {WebSocket}
  */
  private _socket!: WebSocket;

  /**
   * A reference to the ClientData module.
   * 
   * @private
   * 
   * @property {ClientData}
   */
  private _clientData: ClientData = new ClientData();

  /**
   * The signal that is dispatched when the client is assigned a player id.
   *
   * This signal is dispatched with the id that was assigned to this client.
   *
   * @private
   *
   * @property {Hypergiant}
   */
  private _connected: Hypergiant = new Hypergiant();

  /**
   * The signal that is dispatched when the client receives a message from the server.
   *
   * This signal is dispatched with the message that was sent to the client.
   *
   * @private
   *
   * @property {Hypergiant}
   */
  private _messaged: Hypergiant = new Hypergiant();

  /**
   * The signal that is dispatched when the client's connection with the server is ended.
   *
   * This signal is dispatched with the close code and reason.
   *
   * @private
   *
   * @property {Hypergiant}
   */
  private _disconnected: Hypergiant = new Hypergiant();

  /**
   * This client's latency to the server, in milliseconds.
   * 
   * @private
   * 
   * @property {number}
   */
  private _latency: number = 0;

  /**
   * @param {Object} [options] The initialization parameters passed to this instance.
   * @param {boolean} [options.secure=false] Indicates whether the websocket will connect to the server with a secure connection or not.
   */
  constructor(options: Object = {}) {
    this._options = new Options(options);

    this._boot();
  }

  /**
   * Returns the connected signal.
   *
   * @returns {Hypergiant}
   */
  get connected(): Hypergiant { return this._connected; }

  /**
   * Returns the messaged signal.
   *
   * @returns {Hypergiant}
   */
  get messaged(): Hypergiant { return this._messaged; }

  /**
   * Returns the disconnected signal.
   *
   * @returns {Hypergiant}
   */
  get disconnected(): Hypergiant { return this._disconnected; }

  /**
   * Returns this client's latency to the server, in milliseconds.
   * 
   * @returns {number}
   */
  get latency(): number { return this._latency; }

  /**
   * Initialize the WebSocket connection and all of the events that we need to respond to.
   * 
   * @private
   */
  private _boot() {
    const wsProtocol: string = this._options.secure ? 'wss' : 'ws';

    this._socket = new WebSocket(`${wsProtocol}://${window.location.host}/`);

    this._socket.addEventListener('open', () => this._onOpen());

    this._socket.addEventListener('message', (message) => this._onMessage(message));

    this._socket.addEventListener('close', (ev) => this._onClose(ev));
  }

  /**
   * When the WebSocket connection opens, we check to see if they are an existing GameGuard player using cookies
   * and if they are not then they are assigned a new GameGuard player id.
   * 
   * @private
   */
  private _onOpen() {
    const playerId: string = this._clientData.getPlayerId();

    const message: Message = new Message('player-connected', playerId);

    this._socket.send(message.stringify());

    this.connected.dispatch(playerId);
  }

  /**
   * When the client receives a message from the player, dispatch a signal with the message that was sent.
   * 
   * @private
   * 
   * @param {string} message The message Object received from the server.
   */
  private _onMessage(message: any) {
    const parsed: any = JSON.parse(message.data);

    const msg: Message = new Message(parsed.type, parsed.contents);

    switch (msg.type) {
      case 'latency-ping':
        const latencyMessage = new Message('latency-pong', msg.contents);

        this._socket.send(latencyMessage.stringify());
        break;
      case 'latency':
        this._latency = parseFloat(msg.contents);
      default:
        this.messaged.dispatch(msg);
    }
  }

  /**
   * When the WebSocket connection closes, we end the players connection to the game and notify them why, if a reason
   * was provided.
   * 
   * @private
   * 
   * @property {Event} ev The WebSocket close event Object.
   */
  private _onClose(ev: CloseEvent) {
    this.disconnected.dispatch({ code: ev.code, reason: ev.reason });
  }
}
