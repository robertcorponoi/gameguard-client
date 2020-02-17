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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6WyJHYW1lR3VhcmRDbGllbnQiLCJvcHRpb25zIiwiQ2xpZW50RGF0YSIsIkh5cGVyZ2lhbnQiLCJfb3B0aW9ucyIsIk9wdGlvbnMiLCJfYm9vdCIsIndzUHJvdG9jb2wiLCJzZWN1cmUiLCJfc29ja2V0IiwiV2ViU29ja2V0Iiwid2luZG93IiwibG9jYXRpb24iLCJob3N0IiwiYWRkRXZlbnRMaXN0ZW5lciIsIl9vbk9wZW4iLCJtZXNzYWdlIiwiX29uTWVzc2FnZSIsImV2IiwiX29uQ2xvc2UiLCJwbGF5ZXJJZCIsIl9jbGllbnREYXRhIiwiZ2V0UGxheWVySWQiLCJNZXNzYWdlIiwic2VuZCIsInN0cmluZ2lmeSIsImNvbm5lY3RlZCIsImRpc3BhdGNoIiwicGFyc2VkIiwiSlNPTiIsInBhcnNlIiwiZGF0YSIsIm1zZyIsInR5cGUiLCJjb250ZW50cyIsImxhdGVuY3lNZXNzYWdlIiwiX2xhdGVuY3kiLCJwYXJzZUZsb2F0IiwibWVzc2FnZWQiLCJkaXNjb25uZWN0ZWQiLCJjb2RlIiwicmVhc29uIiwiX2Nvbm5lY3RlZCIsIl9tZXNzYWdlZCIsIl9kaXNjb25uZWN0ZWQiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O0FBRUE7O0FBRUE7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7OztBQUVBOzs7SUFHcUJBLGU7OztBQUNuQjs7Ozs7Ozs7QUFTQTs7Ozs7Ozs7QUFTQTs7Ozs7Ozs7QUFTQTs7Ozs7Ozs7OztBQVdBOzs7Ozs7Ozs7O0FBV0E7Ozs7Ozs7Ozs7QUFXQTs7Ozs7Ozs7QUFTQTs7OztBQUlBLDZCQUFrQztBQUFBLFFBQXRCQyxPQUFzQix1RUFBSixFQUFJOztBQUFBOztBQUFBOztBQUFBOztBQUFBLHlDQWhEQSxJQUFJQyxzQkFBSixFQWdEQTs7QUFBQSx3Q0FyQ0QsSUFBSUMsc0JBQUosRUFxQ0M7O0FBQUEsdUNBMUJGLElBQUlBLHNCQUFKLEVBMEJFOztBQUFBLDJDQWZFLElBQUlBLHNCQUFKLEVBZUY7O0FBQUEsc0NBTlAsQ0FNTzs7QUFDaEMsU0FBS0MsUUFBTCxHQUFnQixJQUFJQyxtQkFBSixDQUFZSixPQUFaLENBQWhCOztBQUVBLFNBQUtLLEtBQUw7QUFDRDtBQUVEOzs7Ozs7Ozs7O0FBNEJBOzs7Ozs0QkFLZ0I7QUFBQTs7QUFDZCxVQUFNQyxVQUFrQixHQUFHLEtBQUtILFFBQUwsQ0FBY0ksTUFBZCxHQUF1QixLQUF2QixHQUErQixJQUExRDtBQUVBLFdBQUtDLE9BQUwsR0FBZSxJQUFJQyxTQUFKLFdBQWlCSCxVQUFqQixnQkFBaUNJLE1BQU0sQ0FBQ0MsUUFBUCxDQUFnQkMsSUFBakQsT0FBZjs7QUFFQSxXQUFLSixPQUFMLENBQWFLLGdCQUFiLENBQThCLE1BQTlCLEVBQXNDO0FBQUEsZUFBTSxLQUFJLENBQUNDLE9BQUwsRUFBTjtBQUFBLE9BQXRDOztBQUVBLFdBQUtOLE9BQUwsQ0FBYUssZ0JBQWIsQ0FBOEIsU0FBOUIsRUFBeUMsVUFBQ0UsT0FBRDtBQUFBLGVBQWEsS0FBSSxDQUFDQyxVQUFMLENBQWdCRCxPQUFoQixDQUFiO0FBQUEsT0FBekM7O0FBRUEsV0FBS1AsT0FBTCxDQUFhSyxnQkFBYixDQUE4QixPQUE5QixFQUF1QyxVQUFDSSxFQUFEO0FBQUEsZUFBUSxLQUFJLENBQUNDLFFBQUwsQ0FBY0QsRUFBZCxDQUFSO0FBQUEsT0FBdkM7QUFDRDtBQUVEOzs7Ozs7Ozs7OEJBTWtCO0FBQ2hCLFVBQU1FLFFBQWdCLEdBQUcsS0FBS0MsV0FBTCxDQUFpQkMsV0FBakIsRUFBekI7O0FBRUEsVUFBTU4sT0FBZ0IsR0FBRyxJQUFJTyxtQkFBSixDQUFZLGtCQUFaLEVBQWdDSCxRQUFoQyxDQUF6Qjs7QUFFQSxXQUFLWCxPQUFMLENBQWFlLElBQWIsQ0FBa0JSLE9BQU8sQ0FBQ1MsU0FBUixFQUFsQjs7QUFFQSxXQUFLQyxTQUFMLENBQWVDLFFBQWYsQ0FBd0JQLFFBQXhCO0FBQ0Q7QUFFRDs7Ozs7Ozs7OzsrQkFPbUJKLE8sRUFBYztBQUMvQixVQUFNWSxNQUFXLEdBQUdDLElBQUksQ0FBQ0MsS0FBTCxDQUFXZCxPQUFPLENBQUNlLElBQW5CLENBQXBCO0FBRUEsVUFBTUMsR0FBWSxHQUFHLElBQUlULG1CQUFKLENBQVlLLE1BQU0sQ0FBQ0ssSUFBbkIsRUFBeUJMLE1BQU0sQ0FBQ00sUUFBaEMsQ0FBckI7O0FBRUEsY0FBUUYsR0FBRyxDQUFDQyxJQUFaO0FBQ0UsYUFBSyxjQUFMO0FBQ0UsY0FBTUUsY0FBYyxHQUFHLElBQUlaLG1CQUFKLENBQVksY0FBWixFQUE0QlMsR0FBRyxDQUFDRSxRQUFoQyxDQUF2Qjs7QUFFQSxlQUFLekIsT0FBTCxDQUFhZSxJQUFiLENBQWtCVyxjQUFjLENBQUNWLFNBQWYsRUFBbEI7O0FBQ0E7O0FBQ0YsYUFBSyxTQUFMO0FBQ0UsZUFBS1csUUFBTCxHQUFnQkMsVUFBVSxDQUFDTCxHQUFHLENBQUNFLFFBQUwsQ0FBMUI7O0FBQ0Y7QUFDRSxlQUFLSSxRQUFMLENBQWNYLFFBQWQsQ0FBdUJLLEdBQXZCO0FBVEo7QUFXRDtBQUVEOzs7Ozs7Ozs7Ozs2QkFRaUJkLEUsRUFBZ0I7QUFDL0IsV0FBS3FCLFlBQUwsQ0FBa0JaLFFBQWxCLENBQTJCO0FBQUVhLFFBQUFBLElBQUksRUFBRXRCLEVBQUUsQ0FBQ3NCLElBQVg7QUFBaUJDLFFBQUFBLE1BQU0sRUFBRXZCLEVBQUUsQ0FBQ3VCO0FBQTVCLE9BQTNCO0FBQ0Q7Ozt3QkEzRjJCO0FBQUUsYUFBTyxLQUFLQyxVQUFaO0FBQXlCO0FBRXZEOzs7Ozs7Ozt3QkFLMkI7QUFBRSxhQUFPLEtBQUtDLFNBQVo7QUFBd0I7QUFFckQ7Ozs7Ozs7O3dCQUsrQjtBQUFFLGFBQU8sS0FBS0MsYUFBWjtBQUE0QjtBQUU3RDs7Ozs7Ozs7d0JBS3NCO0FBQUUsYUFBTyxLQUFLUixRQUFaO0FBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnXG5cbmltcG9ydCBIeXBlcmdpYW50IGZyb20gJ2h5cGVyZ2lhbnQnO1xuXG5pbXBvcnQgTWVzc2FnZSBmcm9tICcuL21lc3NhZ2UvTWVzc2FnZSc7XG5pbXBvcnQgT3B0aW9ucyBmcm9tICcuL29wdGlvbnMvT3B0aW9ucyc7XG5pbXBvcnQgQ2xpZW50RGF0YSBmcm9tICcuL2RhdGEvQ2xpZW50RGF0YSc7XG5cbi8qKlxuICogVGhlIEdhbWVHdWFyZCBjbGllbnQgaXMgdXNlZCB0byBlc3RhYmxpc2ggYSBjb25uZWN0aW9uIHRvIHRoZSBzZXJ2ZXIgc2VuZCBwbGF5ZXIgaW5mby5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZUd1YXJkQ2xpZW50IHtcbiAgLyoqXG4gICAqIEEgcmVmZXJlbmNlIHRvIHRoaXMgY2xpZW50J3Mgb3B0aW9ucy5cbiAgICogXG4gICAqIEBwcml2YXRlXG4gICAqIFxuICAgKiBAcHJvcGVydHkge09wdGlvbnN9XG4gICAqL1xuICBwcml2YXRlIF9vcHRpb25zOiBPcHRpb25zO1xuXG4gIC8qKlxuICAqIEEgcmVmZXJlbmNlIHRvIHRoaXMgY2xpZW50J3MgV2ViU29ja2V0IGNvbm5lY3Rpb24uXG4gICogXG4gICogQHByaXZhdGVcbiAgKiBcbiAgKiBAcHJvcGVydHkge1dlYlNvY2tldH1cbiAgKi9cbiAgcHJpdmF0ZSBfc29ja2V0ITogV2ViU29ja2V0O1xuXG4gIC8qKlxuICAgKiBBIHJlZmVyZW5jZSB0byB0aGUgQ2xpZW50RGF0YSBtb2R1bGUuXG4gICAqIFxuICAgKiBAcHJpdmF0ZVxuICAgKiBcbiAgICogQHByb3BlcnR5IHtDbGllbnREYXRhfVxuICAgKi9cbiAgcHJpdmF0ZSBfY2xpZW50RGF0YTogQ2xpZW50RGF0YSA9IG5ldyBDbGllbnREYXRhKCk7XG5cbiAgLyoqXG4gICAqIFRoZSBzaWduYWwgdGhhdCBpcyBkaXNwYXRjaGVkIHdoZW4gdGhlIGNsaWVudCBpcyBhc3NpZ25lZCBhIHBsYXllciBpZC5cbiAgICpcbiAgICogVGhpcyBzaWduYWwgaXMgZGlzcGF0Y2hlZCB3aXRoIHRoZSBpZCB0aGF0IHdhcyBhc3NpZ25lZCB0byB0aGlzIGNsaWVudC5cbiAgICpcbiAgICogQHByaXZhdGVcbiAgICpcbiAgICogQHByb3BlcnR5IHtIeXBlcmdpYW50fVxuICAgKi9cbiAgcHJpdmF0ZSBfY29ubmVjdGVkOiBIeXBlcmdpYW50ID0gbmV3IEh5cGVyZ2lhbnQoKTtcblxuICAvKipcbiAgICogVGhlIHNpZ25hbCB0aGF0IGlzIGRpc3BhdGNoZWQgd2hlbiB0aGUgY2xpZW50IHJlY2VpdmVzIGEgbWVzc2FnZSBmcm9tIHRoZSBzZXJ2ZXIuXG4gICAqXG4gICAqIFRoaXMgc2lnbmFsIGlzIGRpc3BhdGNoZWQgd2l0aCB0aGUgbWVzc2FnZSB0aGF0IHdhcyBzZW50IHRvIHRoZSBjbGllbnQuXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqXG4gICAqIEBwcm9wZXJ0eSB7SHlwZXJnaWFudH1cbiAgICovXG4gIHByaXZhdGUgX21lc3NhZ2VkOiBIeXBlcmdpYW50ID0gbmV3IEh5cGVyZ2lhbnQoKTtcblxuICAvKipcbiAgICogVGhlIHNpZ25hbCB0aGF0IGlzIGRpc3BhdGNoZWQgd2hlbiB0aGUgY2xpZW50J3MgY29ubmVjdGlvbiB3aXRoIHRoZSBzZXJ2ZXIgaXMgZW5kZWQuXG4gICAqXG4gICAqIFRoaXMgc2lnbmFsIGlzIGRpc3BhdGNoZWQgd2l0aCB0aGUgY2xvc2UgY29kZSBhbmQgcmVhc29uLlxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKlxuICAgKiBAcHJvcGVydHkge0h5cGVyZ2lhbnR9XG4gICAqL1xuICBwcml2YXRlIF9kaXNjb25uZWN0ZWQ6IEh5cGVyZ2lhbnQgPSBuZXcgSHlwZXJnaWFudCgpO1xuXG4gIC8qKlxuICAgKiBUaGlzIGNsaWVudCdzIGxhdGVuY3kgdG8gdGhlIHNlcnZlciwgaW4gbWlsbGlzZWNvbmRzLlxuICAgKiBcbiAgICogQHByaXZhdGVcbiAgICogXG4gICAqIEBwcm9wZXJ0eSB7bnVtYmVyfVxuICAgKi9cbiAgcHJpdmF0ZSBfbGF0ZW5jeTogbnVtYmVyID0gMDtcblxuICAvKipcbiAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXSBUaGUgaW5pdGlhbGl6YXRpb24gcGFyYW1ldGVycyBwYXNzZWQgdG8gdGhpcyBpbnN0YW5jZS5cbiAgICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5zZWN1cmU9ZmFsc2VdIEluZGljYXRlcyB3aGV0aGVyIHRoZSB3ZWJzb2NrZXQgd2lsbCBjb25uZWN0IHRvIHRoZSBzZXJ2ZXIgd2l0aCBhIHNlY3VyZSBjb25uZWN0aW9uIG9yIG5vdC5cbiAgICovXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnM6IE9iamVjdCA9IHt9KSB7XG4gICAgdGhpcy5fb3B0aW9ucyA9IG5ldyBPcHRpb25zKG9wdGlvbnMpO1xuXG4gICAgdGhpcy5fYm9vdCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGNvbm5lY3RlZCBzaWduYWwuXG4gICAqXG4gICAqIEByZXR1cm5zIHtIeXBlcmdpYW50fVxuICAgKi9cbiAgZ2V0IGNvbm5lY3RlZCgpOiBIeXBlcmdpYW50IHsgcmV0dXJuIHRoaXMuX2Nvbm5lY3RlZDsgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBtZXNzYWdlZCBzaWduYWwuXG4gICAqXG4gICAqIEByZXR1cm5zIHtIeXBlcmdpYW50fVxuICAgKi9cbiAgZ2V0IG1lc3NhZ2VkKCk6IEh5cGVyZ2lhbnQgeyByZXR1cm4gdGhpcy5fbWVzc2FnZWQ7IH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgZGlzY29ubmVjdGVkIHNpZ25hbC5cbiAgICpcbiAgICogQHJldHVybnMge0h5cGVyZ2lhbnR9XG4gICAqL1xuICBnZXQgZGlzY29ubmVjdGVkKCk6IEh5cGVyZ2lhbnQgeyByZXR1cm4gdGhpcy5fZGlzY29ubmVjdGVkOyB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhpcyBjbGllbnQncyBsYXRlbmN5IHRvIHRoZSBzZXJ2ZXIsIGluIG1pbGxpc2Vjb25kcy5cbiAgICogXG4gICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAqL1xuICBnZXQgbGF0ZW5jeSgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fbGF0ZW5jeTsgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplIHRoZSBXZWJTb2NrZXQgY29ubmVjdGlvbiBhbmQgYWxsIG9mIHRoZSBldmVudHMgdGhhdCB3ZSBuZWVkIHRvIHJlc3BvbmQgdG8uXG4gICAqIFxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgcHJpdmF0ZSBfYm9vdCgpIHtcbiAgICBjb25zdCB3c1Byb3RvY29sOiBzdHJpbmcgPSB0aGlzLl9vcHRpb25zLnNlY3VyZSA/ICd3c3MnIDogJ3dzJztcblxuICAgIHRoaXMuX3NvY2tldCA9IG5ldyBXZWJTb2NrZXQoYCR7d3NQcm90b2NvbH06Ly8ke3dpbmRvdy5sb2NhdGlvbi5ob3N0fS9gKTtcblxuICAgIHRoaXMuX3NvY2tldC5hZGRFdmVudExpc3RlbmVyKCdvcGVuJywgKCkgPT4gdGhpcy5fb25PcGVuKCkpO1xuXG4gICAgdGhpcy5fc29ja2V0LmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCAobWVzc2FnZSkgPT4gdGhpcy5fb25NZXNzYWdlKG1lc3NhZ2UpKTtcblxuICAgIHRoaXMuX3NvY2tldC5hZGRFdmVudExpc3RlbmVyKCdjbG9zZScsIChldikgPT4gdGhpcy5fb25DbG9zZShldikpO1xuICB9XG5cbiAgLyoqXG4gICAqIFdoZW4gdGhlIFdlYlNvY2tldCBjb25uZWN0aW9uIG9wZW5zLCB3ZSBjaGVjayB0byBzZWUgaWYgdGhleSBhcmUgYW4gZXhpc3RpbmcgR2FtZUd1YXJkIHBsYXllciB1c2luZyBjb29raWVzXG4gICAqIGFuZCBpZiB0aGV5IGFyZSBub3QgdGhlbiB0aGV5IGFyZSBhc3NpZ25lZCBhIG5ldyBHYW1lR3VhcmQgcGxheWVyIGlkLlxuICAgKiBcbiAgICogQHByaXZhdGVcbiAgICovXG4gIHByaXZhdGUgX29uT3BlbigpIHtcbiAgICBjb25zdCBwbGF5ZXJJZDogc3RyaW5nID0gdGhpcy5fY2xpZW50RGF0YS5nZXRQbGF5ZXJJZCgpO1xuXG4gICAgY29uc3QgbWVzc2FnZTogTWVzc2FnZSA9IG5ldyBNZXNzYWdlKCdwbGF5ZXItY29ubmVjdGVkJywgcGxheWVySWQpO1xuXG4gICAgdGhpcy5fc29ja2V0LnNlbmQobWVzc2FnZS5zdHJpbmdpZnkoKSk7XG5cbiAgICB0aGlzLmNvbm5lY3RlZC5kaXNwYXRjaChwbGF5ZXJJZCk7XG4gIH1cblxuICAvKipcbiAgICogV2hlbiB0aGUgY2xpZW50IHJlY2VpdmVzIGEgbWVzc2FnZSBmcm9tIHRoZSBwbGF5ZXIsIGRpc3BhdGNoIGEgc2lnbmFsIHdpdGggdGhlIG1lc3NhZ2UgdGhhdCB3YXMgc2VudC5cbiAgICogXG4gICAqIEBwcml2YXRlXG4gICAqIFxuICAgKiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZSBUaGUgbWVzc2FnZSBPYmplY3QgcmVjZWl2ZWQgZnJvbSB0aGUgc2VydmVyLlxuICAgKi9cbiAgcHJpdmF0ZSBfb25NZXNzYWdlKG1lc3NhZ2U6IGFueSkge1xuICAgIGNvbnN0IHBhcnNlZDogYW55ID0gSlNPTi5wYXJzZShtZXNzYWdlLmRhdGEpO1xuXG4gICAgY29uc3QgbXNnOiBNZXNzYWdlID0gbmV3IE1lc3NhZ2UocGFyc2VkLnR5cGUsIHBhcnNlZC5jb250ZW50cyk7XG5cbiAgICBzd2l0Y2ggKG1zZy50eXBlKSB7XG4gICAgICBjYXNlICdsYXRlbmN5LXBpbmcnOlxuICAgICAgICBjb25zdCBsYXRlbmN5TWVzc2FnZSA9IG5ldyBNZXNzYWdlKCdsYXRlbmN5LXBvbmcnLCBtc2cuY29udGVudHMpO1xuXG4gICAgICAgIHRoaXMuX3NvY2tldC5zZW5kKGxhdGVuY3lNZXNzYWdlLnN0cmluZ2lmeSgpKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdsYXRlbmN5JzpcbiAgICAgICAgdGhpcy5fbGF0ZW5jeSA9IHBhcnNlRmxvYXQobXNnLmNvbnRlbnRzKTtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRoaXMubWVzc2FnZWQuZGlzcGF0Y2gobXNnKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogV2hlbiB0aGUgV2ViU29ja2V0IGNvbm5lY3Rpb24gY2xvc2VzLCB3ZSBlbmQgdGhlIHBsYXllcnMgY29ubmVjdGlvbiB0byB0aGUgZ2FtZSBhbmQgbm90aWZ5IHRoZW0gd2h5LCBpZiBhIHJlYXNvblxuICAgKiB3YXMgcHJvdmlkZWQuXG4gICAqIFxuICAgKiBAcHJpdmF0ZVxuICAgKiBcbiAgICogQHByb3BlcnR5IHtFdmVudH0gZXYgVGhlIFdlYlNvY2tldCBjbG9zZSBldmVudCBPYmplY3QuXG4gICAqL1xuICBwcml2YXRlIF9vbkNsb3NlKGV2OiBDbG9zZUV2ZW50KSB7XG4gICAgdGhpcy5kaXNjb25uZWN0ZWQuZGlzcGF0Y2goeyBjb2RlOiBldi5jb2RlLCByZWFzb246IGV2LnJlYXNvbiB9KTtcbiAgfVxufVxuIl19