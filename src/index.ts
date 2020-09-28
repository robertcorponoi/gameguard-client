'use strict'

import Hypergiant from 'hypergiant';

import Message from './Message';
import Options from './Options';
import { getPlayerId, messageToBuffer } from './utils';

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
  private _options: Options;

  /**
  * The GameGuardClient instance WebSocket connection.
  * 
  * @private
  * 
  * @property {WebSocket}
  */
  private _socket!: WebSocket;

  /**
   * The signal that is dispatched when the client is assigned a player id.
   *
   * This signal is dispatched with the id that was assigned to this client.
   *
   * @private
   * 
   * @property {Hypergiant}
   */
  private _connected = new Hypergiant();

  /**
   * The signal that is dispatched when the client receives a message from 
   * the GameGuard server.
   *
   * This signal is dispatched with the message that was sent to the client.
   *
   * @property {Hypergiant}
   */
  private _messaged = new Hypergiant();

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
  private _disconnected = new Hypergiant();

  /**
   * This client's latency to the GameGuard server, in milliseconds.
   * 
   * @private
   * 
   * @property {number}
   */
  private _latency = 0;

  /**
   * @param {Object} [options] The initialization parameters passed to this instance.
   * @param {boolean} [options.useSecure=false] Indicates whether the websocket will connect to the server with a secure connection or not.
   */
  constructor(options: Object = {}) {
    this._options = new Options(options);
    this._connectToServer();
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
   * Create the WebSocket connection and attach the methods that respond to the
   * `open`, `message`, and `close` events.
   * 
   * @private
   */
  private _connectToServer() {
    // If the `useSecure` option is set to true when we need to make sure that
    // the `wss` protocol is used.
    const wsProtocol: string = this._options.useSecure ? 'wss' : 'ws';

    // Create the WebSocket connection by combining the protocol from above
    // with the current page (since it's where the game should be).
    this._socket = new WebSocket(`${wsProtocol}://${window.location.host}/`);

    // Define the methods that should run when the `open`, `message`, and
    // `close` events are emitted.
    this._socket.addEventListener('open', () => this._onopen());
    this._socket.addEventListener('message', message => this._onmessage(message));
    this._socket.addEventListener('close', event => this._onclose(event));
  }

  /**
   * Called when the connection to the GameGuard server is created and it sends
   * the player's id to the server and lastly dispatches the `connected` signal
   * to let the user know that they have successfully connected.
   * 
   * @private
   */
  private _onopen() {
    // Get the existing player id if there is a cookie set, otherwise we create
    // a new player id.
    const playerId = getPlayerId();

    // Create the player-connected message that the GameGuard server expects to
    // receive and send it with the player's id.
    const message: Message = new Message('player-connected', playerId);
    this._socket.send(messageToBuffer(message));

    // Finally we dispatch the `connected` signal with the player's id.
    this.connected.dispatch(playerId);
  }

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
  private _onmessage(message: MessageEvent) {
    message.data.text().then((text: string) => {
      // Decode the message from an ArrayBuffer to a Message object.
      const parsed = JSON.parse(text);
      const messageDecoded = new Message(parsed.type, parsed.contents);

      switch (messageDecoded.type) {
        case 'latency-ping':
          // The GameGuard server has sent a request for a timestamp from the GameGuardClient.
          // This is used to create a get a roundtrip timestamp so that we can get the latency
          // from the GameGuard server to the client.
          const latencyPongMessage = new Message('latency-pong', messageDecoded.contents);
          this._socket.send(messageToBuffer(latencyPongMessage));
          break;
        case 'latency':
          // The GameGuard server has sent over the roundtrip latency so we can assign it to
          // the `latency` property to be used by the client.
          this._latency = parseFloat(messageDecoded.contents);
          break;
        default:
          // Lastly, the message is not internal and is meant for the client so we pass it on
          // over to them to handle it.
          
          this.messaged.dispatch(messageDecoded);
      }
    });
  }

  /**
   * When the client's connection to the GameGuard server is closed, we dispatch
   * the `disconnected` signal which could be used by the user to stop the game
   * for the client.
   * 
   * @private
   * 
   * @property {Event} event The WebSocket close event Object.
   */
  private _onclose(event: CloseEvent) {
    this.disconnected.dispatch({ code: event.code, reason: event.reason });
  }
}
