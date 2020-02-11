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
      this.messaged.dispatch(msg);
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
  }]);

  return GameGuardClient;
}();

exports["default"] = GameGuardClient;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6WyJHYW1lR3VhcmRDbGllbnQiLCJvcHRpb25zIiwiQ2xpZW50RGF0YSIsIkh5cGVyZ2lhbnQiLCJfb3B0aW9ucyIsIk9wdGlvbnMiLCJfYm9vdCIsIndzUHJvdG9jb2wiLCJzZWN1cmUiLCJfc29ja2V0IiwiV2ViU29ja2V0Iiwid2luZG93IiwibG9jYXRpb24iLCJob3N0IiwiYWRkRXZlbnRMaXN0ZW5lciIsIl9vbk9wZW4iLCJtZXNzYWdlIiwiX29uTWVzc2FnZSIsImV2IiwiX29uQ2xvc2UiLCJwbGF5ZXJJZCIsIl9jbGllbnREYXRhIiwiZ2V0UGxheWVySWQiLCJNZXNzYWdlIiwic2VuZCIsInN0cmluZ2lmeSIsImNvbm5lY3RlZCIsImRpc3BhdGNoIiwicGFyc2VkIiwiSlNPTiIsInBhcnNlIiwiZGF0YSIsIm1zZyIsInR5cGUiLCJjb250ZW50cyIsIm1lc3NhZ2VkIiwiZGlzY29ubmVjdGVkIiwiY29kZSIsInJlYXNvbiIsIl9jb25uZWN0ZWQiLCJfbWVzc2FnZWQiLCJfZGlzY29ubmVjdGVkIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztBQUVBOztBQUVBOztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7QUFFQTs7O0lBR3FCQSxlOzs7QUFDbkI7Ozs7Ozs7O0FBU0E7Ozs7Ozs7O0FBU0E7Ozs7Ozs7O0FBU0E7Ozs7Ozs7Ozs7QUFXQTs7Ozs7Ozs7OztBQVdBOzs7Ozs7Ozs7O0FBV0E7Ozs7QUFJQSw2QkFBa0M7QUFBQSxRQUF0QkMsT0FBc0IsdUVBQUosRUFBSTs7QUFBQTs7QUFBQTs7QUFBQTs7QUFBQSx5Q0F2Q0EsSUFBSUMsc0JBQUosRUF1Q0E7O0FBQUEsd0NBNUJELElBQUlDLHNCQUFKLEVBNEJDOztBQUFBLHVDQWpCRixJQUFJQSxzQkFBSixFQWlCRTs7QUFBQSwyQ0FORSxJQUFJQSxzQkFBSixFQU1GOztBQUNoQyxTQUFLQyxRQUFMLEdBQWdCLElBQUlDLG1CQUFKLENBQVlKLE9BQVosQ0FBaEI7O0FBRUEsU0FBS0ssS0FBTDtBQUNEO0FBRUQ7Ozs7Ozs7Ozs7QUFxQkE7Ozs7OzRCQUtnQjtBQUFBOztBQUNkLFVBQU1DLFVBQWtCLEdBQUcsS0FBS0gsUUFBTCxDQUFjSSxNQUFkLEdBQXVCLEtBQXZCLEdBQStCLElBQTFEO0FBRUEsV0FBS0MsT0FBTCxHQUFlLElBQUlDLFNBQUosV0FBaUJILFVBQWpCLGdCQUFpQ0ksTUFBTSxDQUFDQyxRQUFQLENBQWdCQyxJQUFqRCxPQUFmOztBQUVBLFdBQUtKLE9BQUwsQ0FBYUssZ0JBQWIsQ0FBOEIsTUFBOUIsRUFBc0M7QUFBQSxlQUFNLEtBQUksQ0FBQ0MsT0FBTCxFQUFOO0FBQUEsT0FBdEM7O0FBRUEsV0FBS04sT0FBTCxDQUFhSyxnQkFBYixDQUE4QixTQUE5QixFQUF5QyxVQUFDRSxPQUFEO0FBQUEsZUFBYSxLQUFJLENBQUNDLFVBQUwsQ0FBZ0JELE9BQWhCLENBQWI7QUFBQSxPQUF6Qzs7QUFFQSxXQUFLUCxPQUFMLENBQWFLLGdCQUFiLENBQThCLE9BQTlCLEVBQXVDLFVBQUNJLEVBQUQ7QUFBQSxlQUFRLEtBQUksQ0FBQ0MsUUFBTCxDQUFjRCxFQUFkLENBQVI7QUFBQSxPQUF2QztBQUNEO0FBRUQ7Ozs7Ozs7Ozs4QkFNa0I7QUFDaEIsVUFBTUUsUUFBZ0IsR0FBRyxLQUFLQyxXQUFMLENBQWlCQyxXQUFqQixFQUF6Qjs7QUFFQSxVQUFNTixPQUFnQixHQUFHLElBQUlPLG1CQUFKLENBQVksa0JBQVosRUFBZ0NILFFBQWhDLENBQXpCOztBQUVBLFdBQUtYLE9BQUwsQ0FBYWUsSUFBYixDQUFrQlIsT0FBTyxDQUFDUyxTQUFSLEVBQWxCOztBQUVBLFdBQUtDLFNBQUwsQ0FBZUMsUUFBZixDQUF3QlAsUUFBeEI7QUFDRDtBQUVEOzs7Ozs7Ozs7OytCQU9tQkosTyxFQUFjO0FBQy9CLFVBQU1ZLE1BQVcsR0FBR0MsSUFBSSxDQUFDQyxLQUFMLENBQVdkLE9BQU8sQ0FBQ2UsSUFBbkIsQ0FBcEI7QUFFQSxVQUFNQyxHQUFZLEdBQUcsSUFBSVQsbUJBQUosQ0FBWUssTUFBTSxDQUFDSyxJQUFuQixFQUF5QkwsTUFBTSxDQUFDTSxRQUFoQyxDQUFyQjtBQUVBLFdBQUtDLFFBQUwsQ0FBY1IsUUFBZCxDQUF1QkssR0FBdkI7QUFDRDtBQUVEOzs7Ozs7Ozs7Ozs2QkFRaUJkLEUsRUFBZ0I7QUFDL0IsV0FBS2tCLFlBQUwsQ0FBa0JULFFBQWxCLENBQTJCO0FBQUVVLFFBQUFBLElBQUksRUFBRW5CLEVBQUUsQ0FBQ21CLElBQVg7QUFBaUJDLFFBQUFBLE1BQU0sRUFBRXBCLEVBQUUsQ0FBQ29CO0FBQTVCLE9BQTNCO0FBQ0Q7Ozt3QkExRTJCO0FBQUUsYUFBTyxLQUFLQyxVQUFaO0FBQXlCO0FBRXZEOzs7Ozs7Ozt3QkFLMkI7QUFBRSxhQUFPLEtBQUtDLFNBQVo7QUFBd0I7QUFFckQ7Ozs7Ozs7O3dCQUsrQjtBQUFFLGFBQU8sS0FBS0MsYUFBWjtBQUE0QiIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0J1xyXG5cclxuaW1wb3J0IEh5cGVyZ2lhbnQgZnJvbSAnaHlwZXJnaWFudCc7XHJcblxyXG5pbXBvcnQgTWVzc2FnZSBmcm9tICcuL21lc3NhZ2UvTWVzc2FnZSc7XHJcbmltcG9ydCBPcHRpb25zIGZyb20gJy4vb3B0aW9ucy9PcHRpb25zJztcclxuaW1wb3J0IENsaWVudERhdGEgZnJvbSAnLi9kYXRhL0NsaWVudERhdGEnO1xyXG5cclxuLyoqXHJcbiAqIFRoZSBHYW1lR3VhcmQgY2xpZW50IGlzIHVzZWQgdG8gZXN0YWJsaXNoIGEgY29ubmVjdGlvbiB0byB0aGUgc2VydmVyIHNlbmQgcGxheWVyIGluZm8uXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lR3VhcmRDbGllbnQge1xyXG4gIC8qKlxyXG4gICAqIEEgcmVmZXJlbmNlIHRvIHRoaXMgY2xpZW50J3Mgb3B0aW9ucy5cclxuICAgKiBcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqIFxyXG4gICAqIEBwcm9wZXJ0eSB7T3B0aW9uc31cclxuICAgKi9cclxuICBwcml2YXRlIF9vcHRpb25zOiBPcHRpb25zO1xyXG5cclxuICAvKipcclxuICAqIEEgcmVmZXJlbmNlIHRvIHRoaXMgY2xpZW50J3MgV2ViU29ja2V0IGNvbm5lY3Rpb24uXHJcbiAgKiBcclxuICAqIEBwcml2YXRlXHJcbiAgKiBcclxuICAqIEBwcm9wZXJ0eSB7V2ViU29ja2V0fVxyXG4gICovXHJcbiBwcml2YXRlIF9zb2NrZXQhOiBXZWJTb2NrZXQ7XHJcblxyXG4gIC8qKlxyXG4gICAqIEEgcmVmZXJlbmNlIHRvIHRoZSBDbGllbnREYXRhIG1vZHVsZS5cclxuICAgKiBcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqIFxyXG4gICAqIEBwcm9wZXJ0eSB7Q2xpZW50RGF0YX1cclxuICAgKi9cclxuICBwcml2YXRlIF9jbGllbnREYXRhOiBDbGllbnREYXRhID0gbmV3IENsaWVudERhdGEoKTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIHNpZ25hbCB0aGF0IGlzIGRpc3BhdGNoZWQgd2hlbiB0aGUgY2xpZW50IGlzIGFzc2lnbmVkIGEgcGxheWVyIGlkLlxyXG4gICAqXHJcbiAgICogVGhpcyBzaWduYWwgaXMgZGlzcGF0Y2hlZCB3aXRoIHRoZSBpZCB0aGF0IHdhcyBhc3NpZ25lZCB0byB0aGlzIGNsaWVudC5cclxuICAgKlxyXG4gICAqIEBwcml2YXRlXHJcbiAgICpcclxuICAgKiBAcHJvcGVydHkge0h5cGVyZ2lhbnR9XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfY29ubmVjdGVkOiBIeXBlcmdpYW50ID0gbmV3IEh5cGVyZ2lhbnQoKTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIHNpZ25hbCB0aGF0IGlzIGRpc3BhdGNoZWQgd2hlbiB0aGUgY2xpZW50IHJlY2VpdmVzIGEgbWVzc2FnZSBmcm9tIHRoZSBzZXJ2ZXIuXHJcbiAgICpcclxuICAgKiBUaGlzIHNpZ25hbCBpcyBkaXNwYXRjaGVkIHdpdGggdGhlIG1lc3NhZ2UgdGhhdCB3YXMgc2VudCB0byB0aGUgY2xpZW50LlxyXG4gICAqXHJcbiAgICogQHByaXZhdGVcclxuICAgKlxyXG4gICAqIEBwcm9wZXJ0eSB7SHlwZXJnaWFudH1cclxuICAgKi9cclxuICBwcml2YXRlIF9tZXNzYWdlZDogSHlwZXJnaWFudCA9IG5ldyBIeXBlcmdpYW50KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBzaWduYWwgdGhhdCBpcyBkaXNwYXRjaGVkIHdoZW4gdGhlIGNsaWVudCdzIGNvbm5lY3Rpb24gd2l0aCB0aGUgc2VydmVyIGlzIGVuZGVkLlxyXG4gICAqXHJcbiAgICogVGhpcyBzaWduYWwgaXMgZGlzcGF0Y2hlZCB3aXRoIHRoZSBjbG9zZSBjb2RlIGFuZCByZWFzb24uXHJcbiAgICpcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqXHJcbiAgICogQHByb3BlcnR5IHtIeXBlcmdpYW50fVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX2Rpc2Nvbm5lY3RlZDogSHlwZXJnaWFudCA9IG5ldyBIeXBlcmdpYW50KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gVGhlIGluaXRpYWxpemF0aW9uIHBhcmFtZXRlcnMgcGFzc2VkIHRvIHRoaXMgaW5zdGFuY2UuXHJcbiAgICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5zZWN1cmU9ZmFsc2VdIEluZGljYXRlcyB3aGV0aGVyIHRoZSB3ZWJzb2NrZXQgd2lsbCBjb25uZWN0IHRvIHRoZSBzZXJ2ZXIgd2l0aCBhIHNlY3VyZSBjb25uZWN0aW9uIG9yIG5vdC5cclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcihvcHRpb25zOiBPYmplY3QgPSB7fSkge1xyXG4gICAgdGhpcy5fb3B0aW9ucyA9IG5ldyBPcHRpb25zKG9wdGlvbnMpO1xyXG5cclxuICAgIHRoaXMuX2Jvb3QoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgdGhlIGNvbm5lY3RlZCBzaWduYWwuXHJcbiAgICpcclxuICAgKiBAcmV0dXJucyB7SHlwZXJnaWFudH1cclxuICAgKi9cclxuICBnZXQgY29ubmVjdGVkKCk6IEh5cGVyZ2lhbnQgeyByZXR1cm4gdGhpcy5fY29ubmVjdGVkOyB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgdGhlIG1lc3NhZ2VkIHNpZ25hbC5cclxuICAgKlxyXG4gICAqIEByZXR1cm5zIHtIeXBlcmdpYW50fVxyXG4gICAqL1xyXG4gIGdldCBtZXNzYWdlZCgpOiBIeXBlcmdpYW50IHsgcmV0dXJuIHRoaXMuX21lc3NhZ2VkOyB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgdGhlIGRpc2Nvbm5lY3RlZCBzaWduYWwuXHJcbiAgICpcclxuICAgKiBAcmV0dXJucyB7SHlwZXJnaWFudH1cclxuICAgKi9cclxuICBnZXQgZGlzY29ubmVjdGVkKCk6IEh5cGVyZ2lhbnQgeyByZXR1cm4gdGhpcy5fZGlzY29ubmVjdGVkOyB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEluaXRpYWxpemUgdGhlIFdlYlNvY2tldCBjb25uZWN0aW9uIGFuZCBhbGwgb2YgdGhlIGV2ZW50cyB0aGF0IHdlIG5lZWQgdG8gcmVzcG9uZCB0by5cclxuICAgKiBcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX2Jvb3QoKSB7XHJcbiAgICBjb25zdCB3c1Byb3RvY29sOiBzdHJpbmcgPSB0aGlzLl9vcHRpb25zLnNlY3VyZSA/ICd3c3MnIDogJ3dzJztcclxuXHJcbiAgICB0aGlzLl9zb2NrZXQgPSBuZXcgV2ViU29ja2V0KGAke3dzUHJvdG9jb2x9Oi8vJHt3aW5kb3cubG9jYXRpb24uaG9zdH0vYCk7XHJcblxyXG4gICAgdGhpcy5fc29ja2V0LmFkZEV2ZW50TGlzdGVuZXIoJ29wZW4nLCAoKSA9PiB0aGlzLl9vbk9wZW4oKSk7XHJcblxyXG4gICAgdGhpcy5fc29ja2V0LmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCAobWVzc2FnZSkgPT4gdGhpcy5fb25NZXNzYWdlKG1lc3NhZ2UpKTtcclxuXHJcbiAgICB0aGlzLl9zb2NrZXQuYWRkRXZlbnRMaXN0ZW5lcignY2xvc2UnLCAoZXYpID0+IHRoaXMuX29uQ2xvc2UoZXYpKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZW4gdGhlIFdlYlNvY2tldCBjb25uZWN0aW9uIG9wZW5zLCB3ZSBjaGVjayB0byBzZWUgaWYgdGhleSBhcmUgYW4gZXhpc3RpbmcgR2FtZUd1YXJkIHBsYXllciB1c2luZyBjb29raWVzXHJcbiAgICogYW5kIGlmIHRoZXkgYXJlIG5vdCB0aGVuIHRoZXkgYXJlIGFzc2lnbmVkIGEgbmV3IEdhbWVHdWFyZCBwbGF5ZXIgaWQuXHJcbiAgICogXHJcbiAgICogQHByaXZhdGVcclxuICAgKi9cclxuICBwcml2YXRlIF9vbk9wZW4oKSB7XHJcbiAgICBjb25zdCBwbGF5ZXJJZDogc3RyaW5nID0gdGhpcy5fY2xpZW50RGF0YS5nZXRQbGF5ZXJJZCgpO1xyXG5cclxuICAgIGNvbnN0IG1lc3NhZ2U6IE1lc3NhZ2UgPSBuZXcgTWVzc2FnZSgncGxheWVyLWNvbm5lY3RlZCcsIHBsYXllcklkKTtcclxuXHJcbiAgICB0aGlzLl9zb2NrZXQuc2VuZChtZXNzYWdlLnN0cmluZ2lmeSgpKTtcclxuXHJcbiAgICB0aGlzLmNvbm5lY3RlZC5kaXNwYXRjaChwbGF5ZXJJZCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBXaGVuIHRoZSBjbGllbnQgcmVjZWl2ZXMgYSBtZXNzYWdlIGZyb20gdGhlIHBsYXllciwgZGlzcGF0Y2ggYSBzaWduYWwgd2l0aCB0aGUgbWVzc2FnZSB0aGF0IHdhcyBzZW50LlxyXG4gICAqIFxyXG4gICAqIEBwcml2YXRlXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2UgVGhlIG1lc3NhZ2UgT2JqZWN0IHJlY2VpdmVkIGZyb20gdGhlIHNlcnZlci5cclxuICAgKi9cclxuICBwcml2YXRlIF9vbk1lc3NhZ2UobWVzc2FnZTogYW55KSB7XHJcbiAgICBjb25zdCBwYXJzZWQ6IGFueSA9IEpTT04ucGFyc2UobWVzc2FnZS5kYXRhKTtcclxuXHJcbiAgICBjb25zdCBtc2c6IE1lc3NhZ2UgPSBuZXcgTWVzc2FnZShwYXJzZWQudHlwZSwgcGFyc2VkLmNvbnRlbnRzKTtcclxuXHJcbiAgICB0aGlzLm1lc3NhZ2VkLmRpc3BhdGNoKG1zZyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBXaGVuIHRoZSBXZWJTb2NrZXQgY29ubmVjdGlvbiBjbG9zZXMsIHdlIGVuZCB0aGUgcGxheWVycyBjb25uZWN0aW9uIHRvIHRoZSBnYW1lIGFuZCBub3RpZnkgdGhlbSB3aHksIGlmIGEgcmVhc29uXHJcbiAgICogd2FzIHByb3ZpZGVkLlxyXG4gICAqIFxyXG4gICAqIEBwcml2YXRlXHJcbiAgICogXHJcbiAgICogQHByb3BlcnR5IHtFdmVudH0gZXYgVGhlIFdlYlNvY2tldCBjbG9zZSBldmVudCBPYmplY3QuXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfb25DbG9zZShldjogQ2xvc2VFdmVudCkge1xyXG4gICAgdGhpcy5kaXNjb25uZWN0ZWQuZGlzcGF0Y2goeyBjb2RlOiBldi5jb2RlLCByZWFzb246IGV2LnJlYXNvbiB9KTtcclxuICB9XHJcbn1cclxuIl19