'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _hypergiant = _interopRequireDefault(require("hypergiant"));

var _Message = _interopRequireDefault(require("./Message"));

var _Options = _interopRequireDefault(require("./Options"));

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * GameGuardClient communicates with the server to manage the player and their 
 * data.
 */
var GameGuardClient = /*#__PURE__*/function () {
  /**
   * The options passed to GameGuardClient on initialization.
   * 
   * @private
   * 
   * @property {Options}
   */

  /**
  * The GameGuardClient instance WebSocket connection.
  * 
  * @private
  * 
  * @property {WebSocket}
  */

  /**
   * The signal that is dispatched when the client is assigned a player id.
   *
   * This signal is dispatched with the id that was assigned to this client.
   *
   * @private
   * 
   * @property {Hypergiant}
   */

  /**
   * The signal that is dispatched when the client receives a message from 
   * the GameGuard server.
   *
   * This signal is dispatched with the message that was sent to the client.
   *
   * @property {Hypergiant}
   */

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

  /**
   * This client's latency to the GameGuard server, in milliseconds.
   * 
   * @private
   * 
   * @property {number}
   */

  /**
   * @param {Object} [options] The initialization parameters passed to this instance.
   * @param {boolean} [options.useSecure=false] Indicates whether the websocket will connect to the server with a secure connection or not.
   */
  function GameGuardClient() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, GameGuardClient);

    _defineProperty(this, "_options", void 0);

    _defineProperty(this, "_socket", void 0);

    _defineProperty(this, "_connected", new _hypergiant["default"]());

    _defineProperty(this, "_messaged", new _hypergiant["default"]());

    _defineProperty(this, "_disconnected", new _hypergiant["default"]());

    _defineProperty(this, "_latency", 0);

    this._options = new _Options["default"](options);

    this._connectToServer();
  }
  /**
   * Returns the connected signal.
   *
   * @returns {Hypergiant}
   */


  _createClass(GameGuardClient, [{
    key: "_connectToServer",

    /**
     * Create the WebSocket connection and attach the methods that respond to the
     * `open`, `message`, and `close` events.
     * 
     * @private
     */
    value: function _connectToServer() {
      var _this = this;

      // If the `useSecure` option is set to true when we need to make sure that
      // the `wss` protocol is used.
      var wsProtocol = this._options.useSecure ? 'wss' : 'ws'; // Create the WebSocket connection by combining the protocol from above
      // with the current page (since it's where the game should be).

      this._socket = new WebSocket("".concat(wsProtocol, "://").concat(window.location.host, "/")); // Define the methods that should run when the `open`, `message`, and
      // `close` events are emitted.

      this._socket.addEventListener('open', function () {
        return _this._onopen();
      });

      this._socket.addEventListener('message', function (message) {
        return _this._onmessage(message);
      });

      this._socket.addEventListener('close', function (event) {
        return _this._onclose(event);
      });
    }
    /**
     * Called when the connection to the GameGuard server is created and it sends
     * the player's id to the server and lastly dispatches the `connected` signal
     * to let the user know that they have successfully connected.
     * 
     * @private
     */

  }, {
    key: "_onopen",
    value: function _onopen() {
      // Get the existing player id if there is a cookie set, otherwise we create
      // a new player id.
      var playerId = (0, _utils.getPlayerId)(); // Create the player-connected message that the GameGuard server expects to
      // receive and send it with the player's id.

      var message = new _Message["default"]('player-connected', playerId);

      this._socket.send((0, _utils.messageToBuffer)(message)); // Finally we dispatch the `connected` signal with the player's id.


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

  }, {
    key: "_onmessage",
    value: function _onmessage(message) {
      var _this2 = this;

      message.data.text().then(function (text) {
        // Decode the message from an ArrayBuffer to a Message object.
        var parsed = JSON.parse(text);
        var messageDecoded = new _Message["default"](parsed.type, parsed.contents);

        switch (messageDecoded.type) {
          case 'latency-ping':
            // The GameGuard server has sent a request for a timestamp from the GameGuardClient.
            // This is used to create a get a roundtrip timestamp so that we can get the latency
            // from the GameGuard server to the client.
            var latencyPongMessage = new _Message["default"]('latency-pong', messageDecoded.contents);

            _this2._socket.send((0, _utils.messageToBuffer)(latencyPongMessage));

            break;

          case 'latency':
            // The GameGuard server has sent over the roundtrip latency so we can assign it to
            // the `latency` property to be used by the client.
            _this2._latency = parseFloat(messageDecoded.contents);
            break;

          default:
            // Lastly, the message is not internal and is meant for the client so we pass it on
            // over to them to handle it.
            _this2.messaged.dispatch(messageDecoded);

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

  }, {
    key: "_onclose",
    value: function _onclose(event) {
      this.disconnected.dispatch({
        code: event.code,
        reason: event.reason
      });
    }
  }, {
    key: "connected",
    get: function get() {
      return this._connected;
    }
    /**
     * Returns the messaged signal.
     *
     * @returns {Hypergiant}
     */

  }, {
    key: "messaged",
    get: function get() {
      return this._messaged;
    }
    /**
     * Returns the disconnected signal.
     *
     * @returns {Hypergiant}
     */

  }, {
    key: "disconnected",
    get: function get() {
      return this._disconnected;
    }
    /**
     * Returns this client's latency to the server, in milliseconds.
     * 
     * @returns {number}
     */

  }, {
    key: "latency",
    get: function get() {
      return this._latency;
    }
  }]);

  return GameGuardClient;
}();

exports["default"] = GameGuardClient;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6WyJHYW1lR3VhcmRDbGllbnQiLCJvcHRpb25zIiwiSHlwZXJnaWFudCIsIl9vcHRpb25zIiwiT3B0aW9ucyIsIl9jb25uZWN0VG9TZXJ2ZXIiLCJ3c1Byb3RvY29sIiwidXNlU2VjdXJlIiwiX3NvY2tldCIsIldlYlNvY2tldCIsIndpbmRvdyIsImxvY2F0aW9uIiwiaG9zdCIsImFkZEV2ZW50TGlzdGVuZXIiLCJfb25vcGVuIiwibWVzc2FnZSIsIl9vbm1lc3NhZ2UiLCJldmVudCIsIl9vbmNsb3NlIiwicGxheWVySWQiLCJNZXNzYWdlIiwic2VuZCIsImNvbm5lY3RlZCIsImRpc3BhdGNoIiwiZGF0YSIsInRleHQiLCJ0aGVuIiwicGFyc2VkIiwiSlNPTiIsInBhcnNlIiwibWVzc2FnZURlY29kZWQiLCJ0eXBlIiwiY29udGVudHMiLCJsYXRlbmN5UG9uZ01lc3NhZ2UiLCJfbGF0ZW5jeSIsInBhcnNlRmxvYXQiLCJtZXNzYWdlZCIsImRpc2Nvbm5lY3RlZCIsImNvZGUiLCJyZWFzb24iLCJfY29ubmVjdGVkIiwiX21lc3NhZ2VkIiwiX2Rpc2Nvbm5lY3RlZCJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7QUFFQTs7QUFFQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7O0FBRUE7Ozs7SUFJcUJBLGU7QUFDbkI7Ozs7Ozs7O0FBU0E7Ozs7Ozs7O0FBU0E7Ozs7Ozs7Ozs7QUFXQTs7Ozs7Ozs7O0FBVUE7Ozs7Ozs7Ozs7O0FBWUE7Ozs7Ozs7O0FBU0E7Ozs7QUFJQSw2QkFBa0M7QUFBQSxRQUF0QkMsT0FBc0IsdUVBQUosRUFBSTs7QUFBQTs7QUFBQTs7QUFBQTs7QUFBQSx3Q0FyQ2IsSUFBSUMsc0JBQUosRUFxQ2E7O0FBQUEsdUNBM0JkLElBQUlBLHNCQUFKLEVBMkJjOztBQUFBLDJDQWZWLElBQUlBLHNCQUFKLEVBZVU7O0FBQUEsc0NBTmYsQ0FNZTs7QUFDaEMsU0FBS0MsUUFBTCxHQUFnQixJQUFJQyxtQkFB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O0FBQTRCO0FBRTdEOzs7Ozs7Ozt3QkFLc0I7QUFBRSxhQUFPLEtBQUtSLFFBQVo7QUFBdUIiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCdcclxuXHJcbmltcG9ydCBIeXBlcmdpYW50IGZyb20gJ2h5cGVyZ2lhbnQnO1xyXG5cclxuaW1wb3J0IE1lc3NhZ2UgZnJvbSAnLi9NZXNzYWdlJztcclxuaW1wb3J0IE9wdGlvbnMgZnJvbSAnLi9PcHRpb25zJztcclxuaW1wb3J0IHsgZ2V0UGxheWVySWQsIG1lc3NhZ2VUb0J1ZmZlciB9IGZyb20gJy4vdXRpbHMnO1xyXG5cclxuLyoqXHJcbiAqIEdhbWVHdWFyZENsaWVudCBjb21tdW5pY2F0ZXMgd2l0aCB0aGUgc2VydmVyIHRvIG1hbmFnZSB0aGUgcGxheWVyIGFuZCB0aGVpciBcclxuICogZGF0YS5cclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVHdWFyZENsaWVudCB7XHJcbiAgLyoqXHJcbiAgICogVGhlIG9wdGlvbnMgcGFzc2VkIHRvIEdhbWVHdWFyZENsaWVudCBvbiBpbml0aWFsaXphdGlvbi5cclxuICAgKiBcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqIFxyXG4gICAqIEBwcm9wZXJ0eSB7T3B0aW9uc31cclxuICAgKi9cclxuICBwcml2YXRlIF9vcHRpb25zOiBPcHRpb25zO1xyXG5cclxuICAvKipcclxuICAqIFRoZSBHYW1lR3VhcmRDbGllbnQgaW5zdGFuY2UgV2ViU29ja2V0IGNvbm5lY3Rpb24uXHJcbiAgKiBcclxuICAqIEBwcml2YXRlXHJcbiAgKiBcclxuICAqIEBwcm9wZXJ0eSB7V2ViU29ja2V0fVxyXG4gICovXHJcbiAgcHJpdmF0ZSBfc29ja2V0ITogV2ViU29ja2V0O1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgc2lnbmFsIHRoYXQgaXMgZGlzcGF0Y2hlZCB3aGVuIHRoZSBjbGllbnQgaXMgYXNzaWduZWQgYSBwbGF5ZXIgaWQuXHJcbiAgICpcclxuICAgKiBUaGlzIHNpZ25hbCBpcyBkaXNwYXRjaGVkIHdpdGggdGhlIGlkIHRoYXQgd2FzIGFzc2lnbmVkIHRvIHRoaXMgY2xpZW50LlxyXG4gICAqXHJcbiAgICogQHByaXZhdGVcclxuICAgKiBcclxuICAgKiBAcHJvcGVydHkge0h5cGVyZ2lhbnR9XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfY29ubmVjdGVkID0gbmV3IEh5cGVyZ2lhbnQoKTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIHNpZ25hbCB0aGF0IGlzIGRpc3BhdGNoZWQgd2hlbiB0aGUgY2xpZW50IHJlY2VpdmVzIGEgbWVzc2FnZSBmcm9tIFxyXG4gICAqIHRoZSBHYW1lR3VhcmQgc2VydmVyLlxyXG4gICAqXHJcbiAgICogVGhpcyBzaWduYWwgaXMgZGlzcGF0Y2hlZCB3aXRoIHRoZSBtZXNzYWdlIHRoYXQgd2FzIHNlbnQgdG8gdGhlIGNsaWVudC5cclxuICAgKlxyXG4gICAqIEBwcm9wZXJ0eSB7SHlwZXJnaWFudH1cclxuICAgKi9cclxuICBwcml2YXRlIF9tZXNzYWdlZCA9IG5ldyBIeXBlcmdpYW50KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBzaWduYWwgdGhhdCBpcyBkaXNwYXRjaGVkIHdoZW4gdGhlIGNsaWVudCdzIGNvbm5lY3Rpb24gd2l0aCB0aGUgXHJcbiAgICogR2FtZUd1YXJkIHNlcnZlciBpcyBlbmRlZC5cclxuICAgKlxyXG4gICAqIFRoaXMgc2lnbmFsIGlzIGRpc3BhdGNoZWQgd2l0aCB0aGUgY2xvc2UgY29kZSBhbmQgcmVhc29uLlxyXG4gICAqXHJcbiAgICogQHByaXZhdGVcclxuICAgKlxyXG4gICAqIEBwcm9wZXJ0eSB7SHlwZXJnaWFudH1cclxuICAgKi9cclxuICBwcml2YXRlIF9kaXNjb25uZWN0ZWQgPSBuZXcgSHlwZXJnaWFudCgpO1xyXG5cclxuICAvKipcclxuICAgKiBUaGlzIGNsaWVudCdzIGxhdGVuY3kgdG8gdGhlIEdhbWVHdWFyZCBzZXJ2ZXIsIGluIG1pbGxpc2Vjb25kcy5cclxuICAgKiBcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqIFxyXG4gICAqIEBwcm9wZXJ0eSB7bnVtYmVyfVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX2xhdGVuY3kgPSAwO1xyXG5cclxuICAvKipcclxuICAgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdIFRoZSBpbml0aWFsaXphdGlvbiBwYXJhbWV0ZXJzIHBhc3NlZCB0byB0aGlzIGluc3RhbmNlLlxyXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMudXNlU2VjdXJlPWZhbHNlXSBJbmRpY2F0ZXMgd2hldGhlciB0aGUgd2Vic29ja2V0IHdpbGwgY29ubmVjdCB0byB0aGUgc2VydmVyIHdpdGggYSBzZWN1cmUgY29ubmVjdGlvbiBvciBub3QuXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3Iob3B0aW9uczogT2JqZWN0ID0ge30pIHtcclxuICAgIHRoaXMuX29wdGlvbnMgPSBuZXcgT3B0aW9ucyhvcHRpb25zKTtcclxuICAgIHRoaXMuX2Nvbm5lY3RUb1NlcnZlcigpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJucyB0aGUgY29ubmVjdGVkIHNpZ25hbC5cclxuICAgKlxyXG4gICAqIEByZXR1cm5zIHtIeXBlcmdpYW50fVxyXG4gICAqL1xyXG4gIGdldCBjb25uZWN0ZWQoKTogSHlwZXJnaWFudCB7IHJldHVybiB0aGlzLl9jb25uZWN0ZWQ7IH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJucyB0aGUgbWVzc2FnZWQgc2lnbmFsLlxyXG4gICAqXHJcbiAgICogQHJldHVybnMge0h5cGVyZ2lhbnR9XHJcbiAgICovXHJcbiAgZ2V0IG1lc3NhZ2VkKCk6IEh5cGVyZ2lhbnQgeyByZXR1cm4gdGhpcy5fbWVzc2FnZWQ7IH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJucyB0aGUgZGlzY29ubmVjdGVkIHNpZ25hbC5cclxuICAgKlxyXG4gICAqIEByZXR1cm5zIHtIeXBlcmdpYW50fVxyXG4gICAqL1xyXG4gIGdldCBkaXNjb25uZWN0ZWQoKTogSHlwZXJnaWFudCB7IHJldHVybiB0aGlzLl9kaXNjb25uZWN0ZWQ7IH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJucyB0aGlzIGNsaWVudCdzIGxhdGVuY3kgdG8gdGhlIHNlcnZlciwgaW4gbWlsbGlzZWNvbmRzLlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtudW1iZXJ9XHJcbiAgICovXHJcbiAgZ2V0IGxhdGVuY3koKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX2xhdGVuY3k7IH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlIHRoZSBXZWJTb2NrZXQgY29ubmVjdGlvbiBhbmQgYXR0YWNoIHRoZSBtZXRob2RzIHRoYXQgcmVzcG9uZCB0byB0aGVcclxuICAgKiBgb3BlbmAsIGBtZXNzYWdlYCwgYW5kIGBjbG9zZWAgZXZlbnRzLlxyXG4gICAqIFxyXG4gICAqIEBwcml2YXRlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfY29ubmVjdFRvU2VydmVyKCkge1xyXG4gICAgLy8gSWYgdGhlIGB1c2VTZWN1cmVgIG9wdGlvbiBpcyBzZXQgdG8gdHJ1ZSB3aGVuIHdlIG5lZWQgdG8gbWFrZSBzdXJlIHRoYXRcclxuICAgIC8vIHRoZSBgd3NzYCBwcm90b2NvbCBpcyB1c2VkLlxyXG4gICAgY29uc3Qgd3NQcm90b2NvbDogc3RyaW5nID0gdGhpcy5fb3B0aW9ucy51c2VTZWN1cmUgPyAnd3NzJyA6ICd3cyc7XHJcblxyXG4gICAgLy8gQ3JlYXRlIHRoZSBXZWJTb2NrZXQgY29ubmVjdGlvbiBieSBjb21iaW5pbmcgdGhlIHByb3RvY29sIGZyb20gYWJvdmVcclxuICAgIC8vIHdpdGggdGhlIGN1cnJlbnQgcGFnZSAoc2luY2UgaXQncyB3aGVyZSB0aGUgZ2FtZSBzaG91bGQgYmUpLlxyXG4gICAgdGhpcy5fc29ja2V0ID0gbmV3IFdlYlNvY2tldChgJHt3c1Byb3RvY29sfTovLyR7d2luZG93LmxvY2F0aW9uLmhvc3R9L2ApO1xyXG5cclxuICAgIC8vIERlZmluZSB0aGUgbWV0aG9kcyB0aGF0IHNob3VsZCBydW4gd2hlbiB0aGUgYG9wZW5gLCBgbWVzc2FnZWAsIGFuZFxyXG4gICAgLy8gYGNsb3NlYCBldmVudHMgYXJlIGVtaXR0ZWQuXHJcbiAgICB0aGlzLl9zb2NrZXQuYWRkRXZlbnRMaXN0ZW5lcignb3BlbicsICgpID0+IHRoaXMuX29ub3BlbigpKTtcclxuICAgIHRoaXMuX3NvY2tldC5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgbWVzc2FnZSA9PiB0aGlzLl9vbm1lc3NhZ2UobWVzc2FnZSkpO1xyXG4gICAgdGhpcy5fc29ja2V0LmFkZEV2ZW50TGlzdGVuZXIoJ2Nsb3NlJywgZXZlbnQgPT4gdGhpcy5fb25jbG9zZShldmVudCkpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2FsbGVkIHdoZW4gdGhlIGNvbm5lY3Rpb24gdG8gdGhlIEdhbWVHdWFyZCBzZXJ2ZXIgaXMgY3JlYXRlZCBhbmQgaXQgc2VuZHNcclxuICAgKiB0aGUgcGxheWVyJ3MgaWQgdG8gdGhlIHNlcnZlciBhbmQgbGFzdGx5IGRpc3BhdGNoZXMgdGhlIGBjb25uZWN0ZWRgIHNpZ25hbFxyXG4gICAqIHRvIGxldCB0aGUgdXNlciBrbm93IHRoYXQgdGhleSBoYXZlIHN1Y2Nlc3NmdWxseSBjb25uZWN0ZWQuXHJcbiAgICogXHJcbiAgICogQHByaXZhdGVcclxuICAgKi9cclxuICBwcml2YXRlIF9vbm9wZW4oKSB7XHJcbiAgICAvLyBHZXQgdGhlIGV4aXN0aW5nIHBsYXllciBpZCBpZiB0aGVyZSBpcyBhIGNvb2tpZSBzZXQsIG90aGVyd2lzZSB3ZSBjcmVhdGVcclxuICAgIC8vIGEgbmV3IHBsYXllciBpZC5cclxuICAgIGNvbnN0IHBsYXllcklkID0gZ2V0UGxheWVySWQoKTtcclxuXHJcbiAgICAvLyBDcmVhdGUgdGhlIHBsYXllci1jb25uZWN0ZWQgbWVzc2FnZSB0aGF0IHRoZSBHYW1lR3VhcmQgc2VydmVyIGV4cGVjdHMgdG9cclxuICAgIC8vIHJlY2VpdmUgYW5kIHNlbmQgaXQgd2l0aCB0aGUgcGxheWVyJ3MgaWQuXHJcbiAgICBjb25zdCBtZXNzYWdlOiBNZXNzYWdlID0gbmV3IE1lc3NhZ2UoJ3BsYXllci1jb25uZWN0ZWQnLCBwbGF5ZXJJZCk7XHJcbiAgICB0aGlzLl9zb2NrZXQuc2VuZChtZXNzYWdlVG9CdWZmZXIobWVzc2FnZSkpO1xyXG5cclxuICAgIC8vIEZpbmFsbHkgd2UgZGlzcGF0Y2ggdGhlIGBjb25uZWN0ZWRgIHNpZ25hbCB3aXRoIHRoZSBwbGF5ZXIncyBpZC5cclxuICAgIHRoaXMuY29ubmVjdGVkLmRpc3BhdGNoKHBsYXllcklkKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZW4gdGhlIGNsaWVudCByZWNlaXZlcyBhIG1lc3NhZ2UgZnJvbSB0aGUgR2FtZUd1YXJkIHNlcnZlciwgd2UgZmlyc3RcclxuICAgKiBjaGVjayB0byBzZWUgaWYgaXQncyBhbiBpbnRlcm5hbCBtZXNzYWdlIHRoYXQgd2UgbmVlZCB0byByZXNwb25kIHRvLiBJZlxyXG4gICAqIGl0J3Mgbm90IGEgbWVzc2FnZSBmb3IgdXMsIHRoZW4gd2UgZGlzcGF0Y2ggdGhlIGBtZXNzYWdlZGAgc2lnbmFsIHNvIHRoYXRcclxuICAgKiB0aGUgdXNlciBjYW4gcmVzcG9uZCB0byB0aGUgbWVzc2FnZS5cclxuICAgKiBcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSB7TWVzc2FnZUV2ZW50fSBtZXNzYWdlIFRoZSBtZXNzYWdlIGV2ZW50IHJlY2VpdmVkIGZyb20gdGhlIEdhbWVHdWFyZCBzZXJ2ZXIuXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfb25tZXNzYWdlKG1lc3NhZ2U6IE1lc3NhZ2VFdmVudCkge1xyXG4gICAgbWVzc2FnZS5kYXRhLnRleHQoKS50aGVuKCh0ZXh0OiBzdHJpbmcpID0+IHtcclxuICAgICAgLy8gRGVjb2RlIHRoZSBtZXNzYWdlIGZyb20gYW4gQXJyYXlCdWZmZXIgdG8gYSBNZXNzYWdlIG9iamVjdC5cclxuICAgICAgY29uc3QgcGFyc2VkID0gSlNPTi5wYXJzZSh0ZXh0KTtcclxuICAgICAgY29uc3QgbWVzc2FnZURlY29kZWQgPSBuZXcgTWVzc2FnZShwYXJzZWQudHlwZSwgcGFyc2VkLmNvbnRlbnRzKTtcclxuXHJcbiAgICAgIHN3aXRjaCAobWVzc2FnZURlY29kZWQudHlwZSkge1xyXG4gICAgICAgIGNhc2UgJ2xhdGVuY3ktcGluZyc6XHJcbiAgICAgICAgICAvLyBUaGUgR2FtZUd1YXJkIHNlcnZlciBoYXMgc2VudCBhIHJlcXVlc3QgZm9yIGEgdGltZXN0YW1wIGZyb20gdGhlIEdhbWVHdWFyZENsaWVudC5cclxuICAgICAgICAgIC8vIFRoaXMgaXMgdXNlZCB0byBjcmVhdGUgYSBnZXQgYSByb3VuZHRyaXAgdGltZXN0YW1wIHNvIHRoYXQgd2UgY2FuIGdldCB0aGUgbGF0ZW5jeVxyXG4gICAgICAgICAgLy8gZnJvbSB0aGUgR2FtZUd1YXJkIHNlcnZlciB0byB0aGUgY2xpZW50LlxyXG4gICAgICAgICAgY29uc3QgbGF0ZW5jeVBvbmdNZXNzYWdlID0gbmV3IE1lc3NhZ2UoJ2xhdGVuY3ktcG9uZycsIG1lc3NhZ2VEZWNvZGVkLmNvbnRlbnRzKTtcclxuICAgICAgICAgIHRoaXMuX3NvY2tldC5zZW5kKG1lc3NhZ2VUb0J1ZmZlcihsYXRlbmN5UG9uZ01lc3NhZ2UpKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgJ2xhdGVuY3knOlxyXG4gICAgICAgICAgLy8gVGhlIEdhbWVHdWFyZCBzZXJ2ZXIgaGFzIHNlbnQgb3ZlciB0aGUgcm91bmR0cmlwIGxhdGVuY3kgc28gd2UgY2FuIGFzc2lnbiBpdCB0b1xyXG4gICAgICAgICAgLy8gdGhlIGBsYXRlbmN5YCBwcm9wZXJ0eSB0byBiZSB1c2VkIGJ5IHRoZSBjbGllbnQuXHJcbiAgICAgICAgICB0aGlzLl9sYXRlbmN5ID0gcGFyc2VGbG9hdChtZXNzYWdlRGVjb2RlZC5jb250ZW50cyk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgLy8gTGFzdGx5LCB0aGUgbWVzc2FnZSBpcyBub3QgaW50ZXJuYWwgYW5kIGlzIG1lYW50IGZvciB0aGUgY2xpZW50IHNvIHdlIHBhc3MgaXQgb25cclxuICAgICAgICAgIC8vIG92ZXIgdG8gdGhlbSB0byBoYW5kbGUgaXQuXHJcbiAgICAgICAgICBcclxuICAgICAgICAgIHRoaXMubWVzc2FnZWQuZGlzcGF0Y2gobWVzc2FnZURlY29kZWQpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZW4gdGhlIGNsaWVudCdzIGNvbm5lY3Rpb24gdG8gdGhlIEdhbWVHdWFyZCBzZXJ2ZXIgaXMgY2xvc2VkLCB3ZSBkaXNwYXRjaFxyXG4gICAqIHRoZSBgZGlzY29ubmVjdGVkYCBzaWduYWwgd2hpY2ggY291bGQgYmUgdXNlZCBieSB0aGUgdXNlciB0byBzdG9wIHRoZSBnYW1lXHJcbiAgICogZm9yIHRoZSBjbGllbnQuXHJcbiAgICogXHJcbiAgICogQHByaXZhdGVcclxuICAgKiBcclxuICAgKiBAcHJvcGVydHkge0V2ZW50fSBldmVudCBUaGUgV2ViU29ja2V0IGNsb3NlIGV2ZW50IE9iamVjdC5cclxuICAgKi9cclxuICBwcml2YXRlIF9vbmNsb3NlKGV2ZW50OiBDbG9zZUV2ZW50KSB7XHJcbiAgICB0aGlzLmRpc2Nvbm5lY3RlZC5kaXNwYXRjaCh7IGNvZGU6IGV2ZW50LmNvZGUsIHJlYXNvbjogZXZlbnQucmVhc29uIH0pO1xyXG4gIH1cclxufVxyXG4iXX0=