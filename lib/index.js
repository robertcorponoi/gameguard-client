'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _hypergiant = _interopRequireDefault(require("hypergiant"));

var _Message = _interopRequireDefault(require("./message/Message"));

var _Options = _interopRequireDefault(require("./options/Options"));

var _ClientData = _interopRequireDefault(require("./data/ClientData"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * The GameGuard client is used to establish a connection to the server send player info.
 */
var GameGuardClient =
/*#__PURE__*/
function () {
  /**
   * A reference to this client's options.
   * 
   * @private
   * 
   * @property {Options}
   */

  /**
  * A reference to this client's WebSocket connection.
  * 
  * @private
  * 
  * @property {WebSocket}
  */

  /**
   * A reference to the ClientData module.
   * 
   * @private
   * 
   * @property {ClientData}
   */

  /**
   * The signal that is dispatched when the client is assigned a player id.
   *
   * This signal is dispatched with the id that was assigned to this client.
   *
   * @private
   * * @property {Hypergiant}
   */

  /**
   * The signal that is dispatched when the client receives a message from the server.
   *
   * This signal is dispatched with the message that was sent to the client.
   *
   * @private
   *
   * @property {Hypergiant}
   */

  /**
   * The signal that is dispatched when the client's connection with the server is ended.
   *
   * This signal is dispatched with the close code and reason.
   *
   * @private
   *
   * @property {Hypergiant}
   */

  /**
   * This client's latency to the server, in milliseconds.
   * 
   * @private
   * 
   * @property {number}
   */

  /**
   * @param {Object} [options] The initialization parameters passed to this instance.
   * @param {boolean} [options.secure=false] Indicates whether the websocket will connect to the server with a secure connection or not.
   */
  function GameGuardClient() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, GameGuardClient);

    _defineProperty(this, "_options", void 0);

    _defineProperty(this, "_socket", void 0);

    _defineProperty(this, "_clientData", new _ClientData["default"]());

    _defineProperty(this, "_connected", new _hypergiant["default"]());

    _defineProperty(this, "_messaged", new _hypergiant["default"]());

    _defineProperty(this, "_disconnected", new _hypergiant["default"]());

    _defineProperty(this, "_latency", 0);

    this._options = new _Options["default"](options);

    this._boot();
  }
  /**
   * Returns the connected signal.
   *
   * @returns {Hypergiant}
   */


  _createClass(GameGuardClient, [{
    key: "_boot",

    /**
     * Initialize the WebSocket connection and all of the events that we need to respond to.
     * 
     * @private
     */
    value: function _boot() {
      var _this = this;

      var wsProtocol = this._options.secure ? 'wss' : 'ws';
      this._socket = new WebSocket("".concat(wsProtocol, "://").concat(window.location.host, "/"));

      this._socket.addEventListener('open', function () {
        return _this._onOpen();
      });

      this._socket.addEventListener('message', function (message) {
        return _this._onMessage(message);
      });

      this._socket.addEventListener('close', function (ev) {
        return _this._onClose(ev);
      });
    }
    /**
     * When the WebSocket connection opens, we check to see if they are an existing GameGuard player using cookies
     * and if they are not then they are assigned a new GameGuard player id.
     * 
     * @private
     */

  }, {
    key: "_onOpen",
    value: function _onOpen() {
      var playerId = this._clientData.getPlayerId();

      var message = new _Message["default"]('player-connected', playerId);

      this._socket.send(message.buffer);

      this.connected.dispatch(playerId);
    }
    /**
     * When the client receives a message from the player, dispatch a signal with the message that was sent.
     * 
     * @private
     * 
     * @param {string} message The message Object received from the server.
     */

  }, {
    key: "_onMessage",
    value: function _onMessage(message) {
      var _this2 = this;

      message.data.text().then(function (text) {
        var messageParsed = JSON.parse(text);
        var msg = new _Message["default"](messageParsed.type, messageParsed.contents);

        switch (msg.type) {
          case 'latency-ping':
            var latencyMessage = new _Message["default"]('latency-pong', msg.contents);

            _this2._socket.send(latencyMessage.buffer);

            break;

          case 'latency':
            _this2._latency = parseFloat(msg.contents);
            break;

          default:
            _this2.messaged.dispatch(msg);

        }
      });
    }
    /**
     * When the WebSocket connection closes, we end the players connection to the game and notify them why, if a reason
     * was provided.
     * 
     * @private
     * 
     * @property {Event} ev The WebSocket close event Object.
     */

  }, {
    key: "_onClose",
    value: function _onClose(ev) {
      this.disconnected.dispatch({
        code: ev.code,
        reason: ev.reason
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6WyJHYW1lR3VhcmRDbGllbnQiLCJvcHRpb25zIiwiQ2xpZW50RGF0YSIsIkh5cGVyZ2lhbnQiLCJfb3B0aW9ucyIsIk9wdGlvbnMiLCJfYm9vdCIsIndzUHJvdG9jb2wiLCJzZWN1cmUiLCJfc29ja2V0IiwiV2ViU29ja2V0Iiwid2luZG93IiwibG9jYXRpb24iLCJob3N0IiwiYWRkRXZlbnRMaXN0ZW5lciIsIl9vbk9wZW4iLCJtZXNzYWdlIiwiX29uTWVzc2FnZSIsImV2IiwiX29uQ2xvc2UiLCJwbGF5ZXJJZCIsIl9jbGllbnREYXRhIiwiZ2V0UGxheWVySWQiLCJNZXNzYWdlIiwic2VuZCIsImJ1ZmZlciIsImNvbm5lY3RlZCIsImRpc3BhdGNoIiwiZGF0YSIsInRleHQiLCJ0aGVuIiwibWVzc2FnZVBhcnNlZCIsIkpTT04iLCJwYXJzZSIsIm1zZyIsInR5cGUiLCJjb250ZW50cyIsImxhdGVuY3lNZXNzYWdlIiwiX2xhdGVuY3kiLCJwYXJzZUZsb2F0IiwibWVzc2FnZWQiLCJkaXNjb25uZWN0ZWQiLCJjb2RlIiwicmVhc29uIiwiX2Nvbm5lY3RlZCIsIl9tZXNzYWdlZCIsIl9kaXNjb25uZWN0ZWQiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O0FBRUE7O0FBRUE7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7OztBQUVBOzs7SUFHcUJBLGU7OztBQUNuQjs7Ozs7Ozs7QUFTQTs7Ozs7Ozs7QUFTQTs7Ozs7Ozs7QUFTQTs7Ozs7Ozs7O0FBVUE7Ozs7Ozs7Ozs7QUFXQTs7Ozs7Ozs7OztBQVdBOzs7Ozs7OztBQVNBOzs7O0FBSUEsNkJBQWtDO0FBQUEsUUFBdEJDLE9BQXNCLHVFQUFKLEVBQUk7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUEseUNBL0NBLElBQUlDLHNCQUFKLEVBK0NBOztBQUFBLHdDQXJDRCxJQUFJQyxzQkFBSixFQXFDQzs7QUFBQSx1Q0ExQkYsSUFBSUEsc0JBQUosRUEwQkU7O0FBQUEsMkNBZkUsSUFBSUEsc0JBQUosRUFlRjs7QUFBQSxzQ0FOUCxDQU1POztBQUNoQyxTQUFLQyxRQUFMLEdBQWdCLElBQUlDLG1CQUFKLENBQVlKLE9BQVosQ0FBaEI7O0FBRUEsU0FBS0ssS0FBTDtBQUNEO0FBRUQ7Ozs7Ozs7Ozs7QUE0QkE7Ozs7OzRCQUtnQjtBQUFBOztBQUNkLFVBQU1DLFVBQWtCLEdBQUcsS0FBS0gsUUFBTCxDQUFjSSxNQUFkLEdBQXVCLEtBQXZCLEdBQStCLElBQTFEO0FBRUEsV0FBS0MsT0FBTCxHQUFlLElBQUlDLFNBQUosV0FBaUJILFVBQWpCLGdCQUFpQ0ksTUFBTSxDQUFDQyxRQUFQLENBQWdCQyxJQUFqRCxPQUFmOztBQUVBLFdBQUtKLE9BQUwsQ0FBYUssZ0JBQWIsQ0FBOEIsTUFBOUIsRUFBc0M7QUFBQSxlQUFNLEtBQUksQ0FBQ0MsT0FBTCxFQUFOO0FBQUEsT0FBdEM7O0FBRUEsV0FBS04sT0FBTCxDQUFhSyxnQkFBYixDQUE4QixTQUE5QixFQUF5QyxVQUFDRSxPQUFEO0FBQUEsZUFBYSxLQUFJLENBQUNDLFVBQUwsQ0FBZ0JELE9BQWhCLENBQWI7QUFBQSxPQUF6Qzs7QUFFQSxXQUFLUCxPQUFMLENBQWFLLGdCQUFiLENBQThCLE9BQTlCLEVBQXVDLFVBQUNJLEVBQUQ7QUFBQSxlQUFRLEtBQUksQ0FBQ0MsUUFBTCxDQUFjRCxFQUFkLENBQVI7QUFBQSxPQUF2QztBQUNEO0FBRUQ7Ozs7Ozs7Ozs4QkFNa0I7QUFDaEIsVUFBTUUsUUFBZ0IsR0FBRyxLQUFLQyxXQUFMLENBQWlCQyxXQUFqQixFQUF6Qjs7QUFFQSxVQUFNTixPQUFnQixHQUFHLElBQUlPLG1CQUFKLENBQVksa0JBQVosRUFBZ0NILFFBQWhDLENBQXpCOztBQUVBLFdBQUtYLE9BQUwsQ0FBYWUsSUFBYixDQUFrQlIsT0FBTyxDQUFDUyxNQUExQjs7QUFFQSxXQUFLQyxTQUFMLENBQWVDLFFBQWYsQ0FBd0JQLFFBQXhCO0FBQ0Q7QUFFRDs7Ozs7Ozs7OzsrQkFPbUJKLE8sRUFBYztBQUFBOztBQUMvQkEsTUFBQUEsT0FBTyxDQUFDWSxJQUFSLENBQWFDLElBQWIsR0FDR0MsSUFESCxDQUNRLFVBQUNELElBQUQsRUFBa0I7QUFDdEIsWUFBTUUsYUFBYSxHQUFHQyxJQUFJLENBQUNDLEtBQUwsQ0FBV0osSUFBWCxDQUF0QjtBQUVBLFlBQU1LLEdBQVksR0FBRyxJQUFJWCxtQkFBSixDQUFZUSxhQUFhLENBQUNJLElBQTFCLEVBQWdDSixhQUFhLENBQUNLLFFBQTlDLENBQXJCOztBQUVBLGdCQUFRRixHQUFHLENBQUNDLElBQVo7QUFDRSxlQUFLLGNBQUw7QUFDRSxnQkFBTUUsY0FBYyxHQUFHLElBQUlkLG1CQUFKLENBQVksY0FBWixFQUE0QlcsR0FBRyxDQUFDRSxRQUFoQyxDQUF2Qjs7QUFFQSxZQUFBLE1BQUksQ0FBQzNCLE9BQUwsQ0FBYWUsSUFBYixDQUFrQmEsY0FBYyxDQUFDWixNQUFqQzs7QUFDQTs7QUFDRixlQUFLLFNBQUw7QUFDRSxZQUFBLE1BQUksQ0FBQ2EsUUFBTCxHQUFnQkMsVUFBVSxDQUFDTCxHQUFHLENBQUNFLFFBQUwsQ0FBMUI7QUFDQTs7QUFDRjtBQUNFLFlBQUEsTUFBSSxDQUFDSSxRQUFMLENBQWNiLFFBQWQsQ0FBdUJPLEdBQXZCOztBQVZKO0FBWUQsT0FsQkg7QUFtQkQ7QUFFRDs7Ozs7Ozs7Ozs7NkJBUWlCaEIsRSxFQUFnQjtBQUMvQixXQUFLdUIsWUFBTCxDQUFrQmQsUUFBbEIsQ0FBMkI7QUFBRWUsUUFBQUEsSUFBSSxFQUFFeEIsRUFBRSxDQUFDd0IsSUFBWDtBQUFpQkMsUUFBQUEsTUFBTSxFQUFFekIsRUFBRSxDQUFDeUI7QUFBNUIsT0FBM0I7QUFDRDs7O3dCQS9GMkI7QUFBRSxhQUFPLEtBQUtDLFVBQVo7QUFBeUI7QUFFdkQ7Ozs7Ozs7O3dCQUsyQjtBQUFFLGFBQU8sS0FBS0MsU0FBWjtBQUF3QjtBQUVyRDs7Ozs7Ozs7d0JBSytCO0FBQUUsYUFBTyxLQUFLQyxhQUFaO0FBQTRCO0FBRTdEOzs7Ozs7Ozt3QkFLc0I7QUFBRSxhQUFPLEtBQUtSLFFBQVo7QUFBdUIiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCdcclxuXHJcbmltcG9ydCBIeXBlcmdpYW50IGZyb20gJ2h5cGVyZ2lhbnQnO1xyXG5cclxuaW1wb3J0IE1lc3NhZ2UgZnJvbSAnLi9tZXNzYWdlL01lc3NhZ2UnO1xyXG5pbXBvcnQgT3B0aW9ucyBmcm9tICcuL29wdGlvbnMvT3B0aW9ucyc7XHJcbmltcG9ydCBDbGllbnREYXRhIGZyb20gJy4vZGF0YS9DbGllbnREYXRhJztcclxuXHJcbi8qKlxyXG4gKiBUaGUgR2FtZUd1YXJkIGNsaWVudCBpcyB1c2VkIHRvIGVzdGFibGlzaCBhIGNvbm5lY3Rpb24gdG8gdGhlIHNlcnZlciBzZW5kIHBsYXllciBpbmZvLlxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZUd1YXJkQ2xpZW50IHtcclxuICAvKipcclxuICAgKiBBIHJlZmVyZW5jZSB0byB0aGlzIGNsaWVudCdzIG9wdGlvbnMuXHJcbiAgICogXHJcbiAgICogQHByaXZhdGVcclxuICAgKiBcclxuICAgKiBAcHJvcGVydHkge09wdGlvbnN9XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfb3B0aW9uczogT3B0aW9ucztcclxuXHJcbiAgLyoqXHJcbiAgKiBBIHJlZmVyZW5jZSB0byB0aGlzIGNsaWVudCdzIFdlYlNvY2tldCBjb25uZWN0aW9uLlxyXG4gICogXHJcbiAgKiBAcHJpdmF0ZVxyXG4gICogXHJcbiAgKiBAcHJvcGVydHkge1dlYlNvY2tldH1cclxuICAqL1xyXG4gIHByaXZhdGUgX3NvY2tldCE6IFdlYlNvY2tldDtcclxuXHJcbiAgLyoqXHJcbiAgICogQSByZWZlcmVuY2UgdG8gdGhlIENsaWVudERhdGEgbW9kdWxlLlxyXG4gICAqIFxyXG4gICAqIEBwcml2YXRlXHJcbiAgICogXHJcbiAgICogQHByb3BlcnR5IHtDbGllbnREYXRhfVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX2NsaWVudERhdGE6IENsaWVudERhdGEgPSBuZXcgQ2xpZW50RGF0YSgpO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgc2lnbmFsIHRoYXQgaXMgZGlzcGF0Y2hlZCB3aGVuIHRoZSBjbGllbnQgaXMgYXNzaWduZWQgYSBwbGF5ZXIgaWQuXHJcbiAgICpcclxuICAgKiBUaGlzIHNpZ25hbCBpcyBkaXNwYXRjaGVkIHdpdGggdGhlIGlkIHRoYXQgd2FzIGFzc2lnbmVkIHRvIHRoaXMgY2xpZW50LlxyXG4gICAqXHJcbiAgICogQHByaXZhdGVcclxuICAgKiAqIEBwcm9wZXJ0eSB7SHlwZXJnaWFudH1cclxuICAgKi9cclxuICBwcml2YXRlIF9jb25uZWN0ZWQ6IEh5cGVyZ2lhbnQgPSBuZXcgSHlwZXJnaWFudCgpO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgc2lnbmFsIHRoYXQgaXMgZGlzcGF0Y2hlZCB3aGVuIHRoZSBjbGllbnQgcmVjZWl2ZXMgYSBtZXNzYWdlIGZyb20gdGhlIHNlcnZlci5cclxuICAgKlxyXG4gICAqIFRoaXMgc2lnbmFsIGlzIGRpc3BhdGNoZWQgd2l0aCB0aGUgbWVzc2FnZSB0aGF0IHdhcyBzZW50IHRvIHRoZSBjbGllbnQuXHJcbiAgICpcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqXHJcbiAgICogQHByb3BlcnR5IHtIeXBlcmdpYW50fVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX21lc3NhZ2VkOiBIeXBlcmdpYW50ID0gbmV3IEh5cGVyZ2lhbnQoKTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIHNpZ25hbCB0aGF0IGlzIGRpc3BhdGNoZWQgd2hlbiB0aGUgY2xpZW50J3MgY29ubmVjdGlvbiB3aXRoIHRoZSBzZXJ2ZXIgaXMgZW5kZWQuXHJcbiAgICpcclxuICAgKiBUaGlzIHNpZ25hbCBpcyBkaXNwYXRjaGVkIHdpdGggdGhlIGNsb3NlIGNvZGUgYW5kIHJlYXNvbi5cclxuICAgKlxyXG4gICAqIEBwcml2YXRlXHJcbiAgICpcclxuICAgKiBAcHJvcGVydHkge0h5cGVyZ2lhbnR9XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfZGlzY29ubmVjdGVkOiBIeXBlcmdpYW50ID0gbmV3IEh5cGVyZ2lhbnQoKTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhpcyBjbGllbnQncyBsYXRlbmN5IHRvIHRoZSBzZXJ2ZXIsIGluIG1pbGxpc2Vjb25kcy5cclxuICAgKiBcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqIFxyXG4gICAqIEBwcm9wZXJ0eSB7bnVtYmVyfVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX2xhdGVuY3k6IG51bWJlciA9IDA7XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gVGhlIGluaXRpYWxpemF0aW9uIHBhcmFtZXRlcnMgcGFzc2VkIHRvIHRoaXMgaW5zdGFuY2UuXHJcbiAgICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5zZWN1cmU9ZmFsc2VdIEluZGljYXRlcyB3aGV0aGVyIHRoZSB3ZWJzb2NrZXQgd2lsbCBjb25uZWN0IHRvIHRoZSBzZXJ2ZXIgd2l0aCBhIHNlY3VyZSBjb25uZWN0aW9uIG9yIG5vdC5cclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcihvcHRpb25zOiBPYmplY3QgPSB7fSkge1xyXG4gICAgdGhpcy5fb3B0aW9ucyA9IG5ldyBPcHRpb25zKG9wdGlvbnMpO1xyXG5cclxuICAgIHRoaXMuX2Jvb3QoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgdGhlIGNvbm5lY3RlZCBzaWduYWwuXHJcbiAgICpcclxuICAgKiBAcmV0dXJucyB7SHlwZXJnaWFudH1cclxuICAgKi9cclxuICBnZXQgY29ubmVjdGVkKCk6IEh5cGVyZ2lhbnQgeyByZXR1cm4gdGhpcy5fY29ubmVjdGVkOyB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgdGhlIG1lc3NhZ2VkIHNpZ25hbC5cclxuICAgKlxyXG4gICAqIEByZXR1cm5zIHtIeXBlcmdpYW50fVxyXG4gICAqL1xyXG4gIGdldCBtZXNzYWdlZCgpOiBIeXBlcmdpYW50IHsgcmV0dXJuIHRoaXMuX21lc3NhZ2VkOyB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgdGhlIGRpc2Nvbm5lY3RlZCBzaWduYWwuXHJcbiAgICpcclxuICAgKiBAcmV0dXJucyB7SHlwZXJnaWFudH1cclxuICAgKi9cclxuICBnZXQgZGlzY29ubmVjdGVkKCk6IEh5cGVyZ2lhbnQgeyByZXR1cm4gdGhpcy5fZGlzY29ubmVjdGVkOyB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgdGhpcyBjbGllbnQncyBsYXRlbmN5IHRvIHRoZSBzZXJ2ZXIsIGluIG1pbGxpc2Vjb25kcy5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gICAqL1xyXG4gIGdldCBsYXRlbmN5KCk6IG51bWJlciB7IHJldHVybiB0aGlzLl9sYXRlbmN5OyB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEluaXRpYWxpemUgdGhlIFdlYlNvY2tldCBjb25uZWN0aW9uIGFuZCBhbGwgb2YgdGhlIGV2ZW50cyB0aGF0IHdlIG5lZWQgdG8gcmVzcG9uZCB0by5cclxuICAgKiBcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX2Jvb3QoKSB7XHJcbiAgICBjb25zdCB3c1Byb3RvY29sOiBzdHJpbmcgPSB0aGlzLl9vcHRpb25zLnNlY3VyZSA/ICd3c3MnIDogJ3dzJztcclxuXHJcbiAgICB0aGlzLl9zb2NrZXQgPSBuZXcgV2ViU29ja2V0KGAke3dzUHJvdG9jb2x9Oi8vJHt3aW5kb3cubG9jYXRpb24uaG9zdH0vYCk7XHJcblxyXG4gICAgdGhpcy5fc29ja2V0LmFkZEV2ZW50TGlzdGVuZXIoJ29wZW4nLCAoKSA9PiB0aGlzLl9vbk9wZW4oKSk7XHJcblxyXG4gICAgdGhpcy5fc29ja2V0LmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCAobWVzc2FnZSkgPT4gdGhpcy5fb25NZXNzYWdlKG1lc3NhZ2UpKTtcclxuXHJcbiAgICB0aGlzLl9zb2NrZXQuYWRkRXZlbnRMaXN0ZW5lcignY2xvc2UnLCAoZXYpID0+IHRoaXMuX29uQ2xvc2UoZXYpKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZW4gdGhlIFdlYlNvY2tldCBjb25uZWN0aW9uIG9wZW5zLCB3ZSBjaGVjayB0byBzZWUgaWYgdGhleSBhcmUgYW4gZXhpc3RpbmcgR2FtZUd1YXJkIHBsYXllciB1c2luZyBjb29raWVzXHJcbiAgICogYW5kIGlmIHRoZXkgYXJlIG5vdCB0aGVuIHRoZXkgYXJlIGFzc2lnbmVkIGEgbmV3IEdhbWVHdWFyZCBwbGF5ZXIgaWQuXHJcbiAgICogXHJcbiAgICogQHByaXZhdGVcclxuICAgKi9cclxuICBwcml2YXRlIF9vbk9wZW4oKSB7XHJcbiAgICBjb25zdCBwbGF5ZXJJZDogc3RyaW5nID0gdGhpcy5fY2xpZW50RGF0YS5nZXRQbGF5ZXJJZCgpO1xyXG5cclxuICAgIGNvbnN0IG1lc3NhZ2U6IE1lc3NhZ2UgPSBuZXcgTWVzc2FnZSgncGxheWVyLWNvbm5lY3RlZCcsIHBsYXllcklkKTtcclxuXHJcbiAgICB0aGlzLl9zb2NrZXQuc2VuZChtZXNzYWdlLmJ1ZmZlcik7XHJcblxyXG4gICAgdGhpcy5jb25uZWN0ZWQuZGlzcGF0Y2gocGxheWVySWQpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogV2hlbiB0aGUgY2xpZW50IHJlY2VpdmVzIGEgbWVzc2FnZSBmcm9tIHRoZSBwbGF5ZXIsIGRpc3BhdGNoIGEgc2lnbmFsIHdpdGggdGhlIG1lc3NhZ2UgdGhhdCB3YXMgc2VudC5cclxuICAgKiBcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlIFRoZSBtZXNzYWdlIE9iamVjdCByZWNlaXZlZCBmcm9tIHRoZSBzZXJ2ZXIuXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfb25NZXNzYWdlKG1lc3NhZ2U6IGFueSkge1xyXG4gICAgbWVzc2FnZS5kYXRhLnRleHQoKVxyXG4gICAgICAudGhlbigodGV4dDogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgY29uc3QgbWVzc2FnZVBhcnNlZCA9IEpTT04ucGFyc2UodGV4dCk7XHJcblxyXG4gICAgICAgIGNvbnN0IG1zZzogTWVzc2FnZSA9IG5ldyBNZXNzYWdlKG1lc3NhZ2VQYXJzZWQudHlwZSwgbWVzc2FnZVBhcnNlZC5jb250ZW50cyk7XHJcblxyXG4gICAgICAgIHN3aXRjaCAobXNnLnR5cGUpIHtcclxuICAgICAgICAgIGNhc2UgJ2xhdGVuY3ktcGluZyc6XHJcbiAgICAgICAgICAgIGNvbnN0IGxhdGVuY3lNZXNzYWdlID0gbmV3IE1lc3NhZ2UoJ2xhdGVuY3ktcG9uZycsIG1zZy5jb250ZW50cyk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLl9zb2NrZXQuc2VuZChsYXRlbmN5TWVzc2FnZS5idWZmZXIpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIGNhc2UgJ2xhdGVuY3knOlxyXG4gICAgICAgICAgICB0aGlzLl9sYXRlbmN5ID0gcGFyc2VGbG9hdChtc2cuY29udGVudHMpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIHRoaXMubWVzc2FnZWQuZGlzcGF0Y2gobXNnKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogV2hlbiB0aGUgV2ViU29ja2V0IGNvbm5lY3Rpb24gY2xvc2VzLCB3ZSBlbmQgdGhlIHBsYXllcnMgY29ubmVjdGlvbiB0byB0aGUgZ2FtZSBhbmQgbm90aWZ5IHRoZW0gd2h5LCBpZiBhIHJlYXNvblxyXG4gICAqIHdhcyBwcm92aWRlZC5cclxuICAgKiBcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqIFxyXG4gICAqIEBwcm9wZXJ0eSB7RXZlbnR9IGV2IFRoZSBXZWJTb2NrZXQgY2xvc2UgZXZlbnQgT2JqZWN0LlxyXG4gICAqL1xyXG4gIHByaXZhdGUgX29uQ2xvc2UoZXY6IENsb3NlRXZlbnQpIHtcclxuICAgIHRoaXMuZGlzY29ubmVjdGVkLmRpc3BhdGNoKHsgY29kZTogZXYuY29kZSwgcmVhc29uOiBldi5yZWFzb24gfSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==