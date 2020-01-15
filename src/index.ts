'use strict'

import Eventverse from 'eventverse';

import Message from './message/Message';
import Options from './options/Options';
import ClientData from './data/ClientData';

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
   * @param {Object} [options] The initialization parameters passed to this instance.
   * @param {boolean} [options.secure=false] Indicates whether the websocket will connect to the server with a secure connection or not.
   */
  constructor(options: Object = {}) {
    super();

    this._options = new Options(options);

    this._boot();
  }

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

    // @ts-ignore
    this.emit('open', playerId);
  }

  /**
   * TODO:
   * 
   * @private
   * 
   * @param {string} message The message Object received from the server.
   */
  private _onMessage(message: any) {
    const parsed: any = JSON.parse(message.data);

    const msg: Message = new Message(parsed.type, parsed.content);

    // @ts-ignore
    this.emit('message', msg);
  }

  /**
   * When the WebSocket connection closes, we end the players connection to the game and notify them why, if a reason
   * was provided.
   * 
   * @private
   * 
   * @property {Event} ev The WebSocket close event Object.
   */
  private _onClose(ev: Event) {
    // @ts-ignore
    this.emit('close', ev);
  }
}
