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
   *
   * @property {Hypergiant}
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

  }, {
    key: "_onMessage",
    value: function _onMessage(message) {
      var parsed = JSON.parse(message.data);
      var msg = new _Message["default"](parsed.type, parsed.contents);

      switch (msg.type) {
        case 'latency-ping':
          var latencyMessage = new _Message["default"]('latency-pong', msg.contents);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6WyJHYW1lR3VhcmRDbGllbnQiLCJvcHRpb25zIiwiQ2xpZW50RGF0YSIsIkh5cGVyZ2lhbnQiLCJfb3B0aW9ucyIsIk9wdGlvbnMiLCJfYm9vdCIsIndzUHJvdG9jb2wiLCJzZWN1cmUiLCJfc29ja2V0IiwiV2ViU29ja2V0Iiwid2luZG93IiwibG9jYXRpb24iLCJob3N0IiwiYWRkRXZlbnRMaXN0ZW5lciIsIl9vbk9wZW4iLCJtZXNzYWdlIiwiX29uTWVzc2FnZSIsImV2IiwiX29uQ2xvc2UiLCJwbGF5ZXJJZCIsIl9jbGllbnREYXRhIiwiZ2V0UGxheWVySWQiLCJNZXNzYWdlIiwic2VuZCIsInN0cmluZ2lmeSIsImNvbm5lY3RlZCIsImRpc3BhdGNoIiwicGFyc2VkIiwiSlNPTiIsInBhcnNlIiwiZGF0YSIsIm1zZyIsInR5cGUiLCJjb250ZW50cyIsImxhdGVuY3lNZXNzYWdlIiwiX2xhdGVuY3kiLCJwYXJzZUZsb2F0IiwibWVzc2FnZWQiLCJkaXNjb25uZWN0ZWQiLCJjb2RlIiwicmVhc29uIiwiX2Nvbm5lY3RlZCIsIl9tZXNzYWdlZCIsIl9kaXNjb25uZWN0ZWQiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O0FBRUE7O0FBRUE7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7OztBQUVBOzs7SUFHcUJBLGU7OztBQUNuQjs7Ozs7Ozs7QUFTQTs7Ozs7Ozs7QUFTQTs7Ozs7Ozs7QUFTQTs7Ozs7Ozs7OztBQVdBOzs7Ozs7Ozs7O0FBV0E7Ozs7Ozs7Ozs7QUFXQTs7Ozs7Ozs7QUFTQTs7OztBQUlBLDZCQUFrQztBQUFBLFFBQXRCQyxPQUFzQix1RUFBSixFQUFJOztBQUFBOztBQUFBOztBQUFBOztBQUFBLHlDQWhEQSxJQUFJQyxzQkFBSixFQWdEQTs7QUFBQSx3Q0FyQ0QsSUFBSUMsc0JBQUosRUFxQ0M7O0FBQUEsdUNBMUJGLElBQUlBLHNCQUFKLEVBMEJFOztBQUFBLDJDQWZFLElBQUlBLHNCQUFKLEVBZUY7O0FBQUEsc0NBTlAsQ0FNTzs7QUFDaEMsU0FBS0MsUUFBTCxHQUFnQixJQUFJQyxtQkFBSixDQUFZSixPQUFaLENBQWhCOztBQUVBLFNBQUtLLEtBQUw7QUFDRDtBQUVEOzs7Ozs7Ozs7O0FBNEJBOzs7Ozs0QkFLZ0I7QUFBQTs7QUFDZCxVQUFNQyxVQUFrQixHQUFHLEtBQUtILFFBQUwsQ0FBY0ksTUFBZCxHQUF1QixLQUF2QixHQUErQixJQUExRDtBQUVBLFdBQUtDLE9BQUwsR0FBZSxJQUFJQyxTQUFKLFdBQWlCSCxVQUFqQixnQkFBaUNJLE1BQU0sQ0FBQ0MsUUFBUCxDQUFnQkMsSUFBakQsT0FBZjs7QUFFQSxXQUFLSixPQUFMLENBQWFLLGdCQUFiLENBQThCLE1BQTlCLEVBQXNDO0FBQUEsZUFBTSxLQUFJLENBQUNDLE9BQUwsRUFBTjtBQUFBLE9BQXRDOztBQUVBLFdBQUtOLE9BQUwsQ0FBYUssZ0JBQWIsQ0FBOEIsU0FBOUIsRUFBeUMsVUFBQ0UsT0FBRDtBQUFBLGVBQWEsS0FBSSxDQUFDQyxVQUFMLENBQWdCRCxPQUFoQixDQUFiO0FBQUEsT0FBekM7O0FBRUEsV0FBS1AsT0FBTCxDQUFhSyxnQkFBYixDQUE4QixPQUE5QixFQUF1QyxVQUFDSSxFQUFEO0FBQUEsZUFBUSxLQUFJLENBQUNDLFFBQUwsQ0FBY0QsRUFBZCxDQUFSO0FBQUEsT0FBdkM7QUFDRDtBQUVEOzs7Ozs7Ozs7OEJBTWtCO0FBQ2hCLFVBQU1FLFFBQWdCLEdBQUcsS0FBS0MsV0FBTCxDQUFpQkMsV0FBakIsRUFBekI7O0FBRUEsVUFBTU4sT0FBZ0IsR0FBRyxJQUFJTyxtQkFBSixDQUFZLGtCQUFaLEVBQWdDSCxRQUFoQyxDQUF6Qjs7QUFFQSxXQUFLWCxPQUFMLENBQWFlLElBQWIsQ0FBa0JSLE9BQU8sQ0FBQ1MsU0FBUixFQUFsQjs7QUFFQSxXQUFLQyxTQUFMLENBQWVDLFFBQWYsQ0FBd0JQLFFBQXhCO0FBQ0Q7QUFFRDs7Ozs7Ozs7OzsrQkFPbUJKLE8sRUFBYztBQUMvQixVQUFNWSxNQUFXLEdBQUdDLElBQUksQ0FBQ0MsS0FBTCxDQUFXZCxPQUFPLENBQUNlLElBQW5CLENBQXBCO0FBRUEsVUFBTUMsR0FBWSxHQUFHLElBQUlULG1CQUFKLENBQVlLLE1BQU0sQ0FBQ0ssSUFBbkIsRUFBeUJMLE1BQU0sQ0FBQ00sUUFBaEMsQ0FBckI7O0FBRUEsY0FBUUYsR0FBRyxDQUFDQyxJQUFaO0FBQ0UsYUFBSyxjQUFMO0FBQ0UsY0FBTUUsY0FBYyxHQUFHLElBQUlaLG1CQUFKLENBQVksY0FBWixFQUE0QlMsR0FBRyxDQUFDRSxRQUFoQyxDQUF2Qjs7QUFFQSxlQUFLekIsT0FBTCxDQUFhZSxJQUFiLENBQWtCVyxjQUFjLENBQUNWLFNBQWYsRUFBbEI7O0FBQ0E7O0FBQ0YsYUFBSyxTQUFMO0FBQ0UsZUFBS1csUUFBTCxHQUFnQkMsVUFBVSxDQUFDTCxHQUFHLENBQUNFLFFBQUwsQ0FBMUI7O0FBQ0Y7QUFDRSxlQUFLSSxRQUFMLENBQWNYLFFBQWQsQ0FBdUJLLEdBQXZCO0FBVEo7QUFXRDtBQUVEOzs7Ozs7Ozs7Ozs2QkFRaUJkLEUsRUFBZ0I7QUFDL0IsV0FBS3FCLFlBQUwsQ0FBa0JaLFFBQWxCLENBQTJCO0FBQUVhLFFBQUFBLElBQUksRUFBRXRCLEVBQUUsQ0FBQ3NCLElBQVg7QUFBaUJDLFFBQUFBLE1BQU0sRUFBRXZCLEVBQUUsQ0FBQ3VCO0FBQTVCLE9BQTNCO0FBQ0Q7Ozt3QkEzRjJCO0FBQUUsYUFBTyxLQUFLQyxVQUFaO0FBQXlCO0FBRXZEOzs7Ozs7Ozt3QkFLMkI7QUFBRSxhQUFPLEtBQUtDLFNBQVo7QUFBd0I7QUFFckQ7Ozs7Ozs7O3dCQUsrQjtBQUFFLGFBQU8sS0FBS0MsYUFBWjtBQUE0QjtBQUU3RDs7Ozs7Ozs7d0JBS3NCO0FBQUUsYUFBTyxLQUFLUixRQUFaO0FBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnXHJcblxyXG5pbXBvcnQgSHlwZXJnaWFudCBmcm9tICdoeXBlcmdpYW50JztcclxuXHJcbmltcG9ydCBNZXNzYWdlIGZyb20gJy4vbWVzc2FnZS9NZXNzYWdlJztcclxuaW1wb3J0IE9wdGlvbnMgZnJvbSAnLi9vcHRpb25zL09wdGlvbnMnO1xyXG5pbXBvcnQgQ2xpZW50RGF0YSBmcm9tICcuL2RhdGEvQ2xpZW50RGF0YSc7XHJcblxyXG4vKipcclxuICogVGhlIEdhbWVHdWFyZCBjbGllbnQgaXMgdXNlZCB0byBlc3RhYmxpc2ggYSBjb25uZWN0aW9uIHRvIHRoZSBzZXJ2ZXIgc2VuZCBwbGF5ZXIgaW5mby5cclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVHdWFyZENsaWVudCB7XHJcbiAgLyoqXHJcbiAgICogQSByZWZlcmVuY2UgdG8gdGhpcyBjbGllbnQncyBvcHRpb25zLlxyXG4gICAqIFxyXG4gICAqIEBwcml2YXRlXHJcbiAgICogXHJcbiAgICogQHByb3BlcnR5IHtPcHRpb25zfVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX29wdGlvbnM6IE9wdGlvbnM7XHJcblxyXG4gIC8qKlxyXG4gICogQSByZWZlcmVuY2UgdG8gdGhpcyBjbGllbnQncyBXZWJTb2NrZXQgY29ubmVjdGlvbi5cclxuICAqIFxyXG4gICogQHByaXZhdGVcclxuICAqIFxyXG4gICogQHByb3BlcnR5IHtXZWJTb2NrZXR9XHJcbiAgKi9cclxuICBwcml2YXRlIF9zb2NrZXQhOiBXZWJTb2NrZXQ7XHJcblxyXG4gIC8qKlxyXG4gICAqIEEgcmVmZXJlbmNlIHRvIHRoZSBDbGllbnREYXRhIG1vZHVsZS5cclxuICAgKiBcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqIFxyXG4gICAqIEBwcm9wZXJ0eSB7Q2xpZW50RGF0YX1cclxuICAgKi9cclxuICBwcml2YXRlIF9jbGllbnREYXRhOiBDbGllbnREYXRhID0gbmV3IENsaWVudERhdGEoKTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIHNpZ25hbCB0aGF0IGlzIGRpc3BhdGNoZWQgd2hlbiB0aGUgY2xpZW50IGlzIGFzc2lnbmVkIGEgcGxheWVyIGlkLlxyXG4gICAqXHJcbiAgICogVGhpcyBzaWduYWwgaXMgZGlzcGF0Y2hlZCB3aXRoIHRoZSBpZCB0aGF0IHdhcyBhc3NpZ25lZCB0byB0aGlzIGNsaWVudC5cclxuICAgKlxyXG4gICAqIEBwcml2YXRlXHJcbiAgICpcclxuICAgKiBAcHJvcGVydHkge0h5cGVyZ2lhbnR9XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfY29ubmVjdGVkOiBIeXBlcmdpYW50ID0gbmV3IEh5cGVyZ2lhbnQoKTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIHNpZ25hbCB0aGF0IGlzIGRpc3BhdGNoZWQgd2hlbiB0aGUgY2xpZW50IHJlY2VpdmVzIGEgbWVzc2FnZSBmcm9tIHRoZSBzZXJ2ZXIuXHJcbiAgICpcclxuICAgKiBUaGlzIHNpZ25hbCBpcyBkaXNwYXRjaGVkIHdpdGggdGhlIG1lc3NhZ2UgdGhhdCB3YXMgc2VudCB0byB0aGUgY2xpZW50LlxyXG4gICAqXHJcbiAgICogQHByaXZhdGVcclxuICAgKlxyXG4gICAqIEBwcm9wZXJ0eSB7SHlwZXJnaWFudH1cclxuICAgKi9cclxuICBwcml2YXRlIF9tZXNzYWdlZDogSHlwZXJnaWFudCA9IG5ldyBIeXBlcmdpYW50KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBzaWduYWwgdGhhdCBpcyBkaXNwYXRjaGVkIHdoZW4gdGhlIGNsaWVudCdzIGNvbm5lY3Rpb24gd2l0aCB0aGUgc2VydmVyIGlzIGVuZGVkLlxyXG4gICAqXHJcbiAgICogVGhpcyBzaWduYWwgaXMgZGlzcGF0Y2hlZCB3aXRoIHRoZSBjbG9zZSBjb2RlIGFuZCByZWFzb24uXHJcbiAgICpcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqXHJcbiAgICogQHByb3BlcnR5IHtIeXBlcmdpYW50fVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX2Rpc2Nvbm5lY3RlZDogSHlwZXJnaWFudCA9IG5ldyBIeXBlcmdpYW50KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoaXMgY2xpZW50J3MgbGF0ZW5jeSB0byB0aGUgc2VydmVyLCBpbiBtaWxsaXNlY29uZHMuXHJcbiAgICogXHJcbiAgICogQHByaXZhdGVcclxuICAgKiBcclxuICAgKiBAcHJvcGVydHkge251bWJlcn1cclxuICAgKi9cclxuICBwcml2YXRlIF9sYXRlbmN5OiBudW1iZXIgPSAwO1xyXG5cclxuICAvKipcclxuICAgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdIFRoZSBpbml0aWFsaXphdGlvbiBwYXJhbWV0ZXJzIHBhc3NlZCB0byB0aGlzIGluc3RhbmNlLlxyXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMuc2VjdXJlPWZhbHNlXSBJbmRpY2F0ZXMgd2hldGhlciB0aGUgd2Vic29ja2V0IHdpbGwgY29ubmVjdCB0byB0aGUgc2VydmVyIHdpdGggYSBzZWN1cmUgY29ubmVjdGlvbiBvciBub3QuXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3Iob3B0aW9uczogT2JqZWN0ID0ge30pIHtcclxuICAgIHRoaXMuX29wdGlvbnMgPSBuZXcgT3B0aW9ucyhvcHRpb25zKTtcclxuXHJcbiAgICB0aGlzLl9ib290KCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm5zIHRoZSBjb25uZWN0ZWQgc2lnbmFsLlxyXG4gICAqXHJcbiAgICogQHJldHVybnMge0h5cGVyZ2lhbnR9XHJcbiAgICovXHJcbiAgZ2V0IGNvbm5lY3RlZCgpOiBIeXBlcmdpYW50IHsgcmV0dXJuIHRoaXMuX2Nvbm5lY3RlZDsgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm5zIHRoZSBtZXNzYWdlZCBzaWduYWwuXHJcbiAgICpcclxuICAgKiBAcmV0dXJucyB7SHlwZXJnaWFudH1cclxuICAgKi9cclxuICBnZXQgbWVzc2FnZWQoKTogSHlwZXJnaWFudCB7IHJldHVybiB0aGlzLl9tZXNzYWdlZDsgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm5zIHRoZSBkaXNjb25uZWN0ZWQgc2lnbmFsLlxyXG4gICAqXHJcbiAgICogQHJldHVybnMge0h5cGVyZ2lhbnR9XHJcbiAgICovXHJcbiAgZ2V0IGRpc2Nvbm5lY3RlZCgpOiBIeXBlcmdpYW50IHsgcmV0dXJuIHRoaXMuX2Rpc2Nvbm5lY3RlZDsgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm5zIHRoaXMgY2xpZW50J3MgbGF0ZW5jeSB0byB0aGUgc2VydmVyLCBpbiBtaWxsaXNlY29uZHMuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge251bWJlcn1cclxuICAgKi9cclxuICBnZXQgbGF0ZW5jeSgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fbGF0ZW5jeTsgfVxyXG5cclxuICAvKipcclxuICAgKiBJbml0aWFsaXplIHRoZSBXZWJTb2NrZXQgY29ubmVjdGlvbiBhbmQgYWxsIG9mIHRoZSBldmVudHMgdGhhdCB3ZSBuZWVkIHRvIHJlc3BvbmQgdG8uXHJcbiAgICogXHJcbiAgICogQHByaXZhdGVcclxuICAgKi9cclxuICBwcml2YXRlIF9ib290KCkge1xyXG4gICAgY29uc3Qgd3NQcm90b2NvbDogc3RyaW5nID0gdGhpcy5fb3B0aW9ucy5zZWN1cmUgPyAnd3NzJyA6ICd3cyc7XHJcblxyXG4gICAgdGhpcy5fc29ja2V0ID0gbmV3IFdlYlNvY2tldChgJHt3c1Byb3RvY29sfTovLyR7d2luZG93LmxvY2F0aW9uLmhvc3R9L2ApO1xyXG5cclxuICAgIHRoaXMuX3NvY2tldC5hZGRFdmVudExpc3RlbmVyKCdvcGVuJywgKCkgPT4gdGhpcy5fb25PcGVuKCkpO1xyXG5cclxuICAgIHRoaXMuX3NvY2tldC5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgKG1lc3NhZ2UpID0+IHRoaXMuX29uTWVzc2FnZShtZXNzYWdlKSk7XHJcblxyXG4gICAgdGhpcy5fc29ja2V0LmFkZEV2ZW50TGlzdGVuZXIoJ2Nsb3NlJywgKGV2KSA9PiB0aGlzLl9vbkNsb3NlKGV2KSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBXaGVuIHRoZSBXZWJTb2NrZXQgY29ubmVjdGlvbiBvcGVucywgd2UgY2hlY2sgdG8gc2VlIGlmIHRoZXkgYXJlIGFuIGV4aXN0aW5nIEdhbWVHdWFyZCBwbGF5ZXIgdXNpbmcgY29va2llc1xyXG4gICAqIGFuZCBpZiB0aGV5IGFyZSBub3QgdGhlbiB0aGV5IGFyZSBhc3NpZ25lZCBhIG5ldyBHYW1lR3VhcmQgcGxheWVyIGlkLlxyXG4gICAqIFxyXG4gICAqIEBwcml2YXRlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfb25PcGVuKCkge1xyXG4gICAgY29uc3QgcGxheWVySWQ6IHN0cmluZyA9IHRoaXMuX2NsaWVudERhdGEuZ2V0UGxheWVySWQoKTtcclxuXHJcbiAgICBjb25zdCBtZXNzYWdlOiBNZXNzYWdlID0gbmV3IE1lc3NhZ2UoJ3BsYXllci1jb25uZWN0ZWQnLCBwbGF5ZXJJZCk7XHJcblxyXG4gICAgdGhpcy5fc29ja2V0LnNlbmQobWVzc2FnZS5zdHJpbmdpZnkoKSk7XHJcblxyXG4gICAgdGhpcy5jb25uZWN0ZWQuZGlzcGF0Y2gocGxheWVySWQpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogV2hlbiB0aGUgY2xpZW50IHJlY2VpdmVzIGEgbWVzc2FnZSBmcm9tIHRoZSBwbGF5ZXIsIGRpc3BhdGNoIGEgc2lnbmFsIHdpdGggdGhlIG1lc3NhZ2UgdGhhdCB3YXMgc2VudC5cclxuICAgKiBcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlIFRoZSBtZXNzYWdlIE9iamVjdCByZWNlaXZlZCBmcm9tIHRoZSBzZXJ2ZXIuXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfb25NZXNzYWdlKG1lc3NhZ2U6IGFueSkge1xyXG4gICAgY29uc3QgcGFyc2VkOiBhbnkgPSBKU09OLnBhcnNlKG1lc3NhZ2UuZGF0YSk7XHJcblxyXG4gICAgY29uc3QgbXNnOiBNZXNzYWdlID0gbmV3IE1lc3NhZ2UocGFyc2VkLnR5cGUsIHBhcnNlZC5jb250ZW50cyk7XHJcblxyXG4gICAgc3dpdGNoIChtc2cudHlwZSkge1xyXG4gICAgICBjYXNlICdsYXRlbmN5LXBpbmcnOlxyXG4gICAgICAgIGNvbnN0IGxhdGVuY3lNZXNzYWdlID0gbmV3IE1lc3NhZ2UoJ2xhdGVuY3ktcG9uZycsIG1zZy5jb250ZW50cyk7XHJcblxyXG4gICAgICAgIHRoaXMuX3NvY2tldC5zZW5kKGxhdGVuY3lNZXNzYWdlLnN0cmluZ2lmeSgpKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnbGF0ZW5jeSc6XHJcbiAgICAgICAgdGhpcy5fbGF0ZW5jeSA9IHBhcnNlRmxvYXQobXNnLmNvbnRlbnRzKTtcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICB0aGlzLm1lc3NhZ2VkLmRpc3BhdGNoKG1zZyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBXaGVuIHRoZSBXZWJTb2NrZXQgY29ubmVjdGlvbiBjbG9zZXMsIHdlIGVuZCB0aGUgcGxheWVycyBjb25uZWN0aW9uIHRvIHRoZSBnYW1lIGFuZCBub3RpZnkgdGhlbSB3aHksIGlmIGEgcmVhc29uXHJcbiAgICogd2FzIHByb3ZpZGVkLlxyXG4gICAqIFxyXG4gICAqIEBwcml2YXRlXHJcbiAgICogXHJcbiAgICogQHByb3BlcnR5IHtFdmVudH0gZXYgVGhlIFdlYlNvY2tldCBjbG9zZSBldmVudCBPYmplY3QuXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfb25DbG9zZShldjogQ2xvc2VFdmVudCkge1xyXG4gICAgdGhpcy5kaXNjb25uZWN0ZWQuZGlzcGF0Y2goeyBjb2RlOiBldi5jb2RlLCByZWFzb246IGV2LnJlYXNvbiB9KTtcclxuICB9XHJcbn1cclxuIl19