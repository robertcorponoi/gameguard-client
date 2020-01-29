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
      var msg = new _Message["default"](parsed.type, parsed.content);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6WyJHYW1lR3VhcmRDbGllbnQiLCJvcHRpb25zIiwiQ2xpZW50RGF0YSIsIkh5cGVyZ2lhbnQiLCJfb3B0aW9ucyIsIk9wdGlvbnMiLCJfYm9vdCIsIndzUHJvdG9jb2wiLCJzZWN1cmUiLCJfc29ja2V0IiwiV2ViU29ja2V0Iiwid2luZG93IiwibG9jYXRpb24iLCJob3N0IiwiYWRkRXZlbnRMaXN0ZW5lciIsIl9vbk9wZW4iLCJtZXNzYWdlIiwiX29uTWVzc2FnZSIsImV2IiwiX29uQ2xvc2UiLCJwbGF5ZXJJZCIsIl9jbGllbnREYXRhIiwiZ2V0UGxheWVySWQiLCJNZXNzYWdlIiwic2VuZCIsInN0cmluZ2lmeSIsImNvbm5lY3RlZCIsImRpc3BhdGNoIiwicGFyc2VkIiwiSlNPTiIsInBhcnNlIiwiZGF0YSIsIm1zZyIsInR5cGUiLCJjb250ZW50IiwibWVzc2FnZWQiLCJkaXNjb25uZWN0ZWQiLCJjb2RlIiwicmVhc29uIiwiX2Nvbm5lY3RlZCIsIl9tZXNzYWdlZCIsIl9kaXNjb25uZWN0ZWQiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O0FBRUE7O0FBRUE7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7OztBQUVBOzs7SUFHcUJBLGU7OztBQUNuQjs7Ozs7Ozs7QUFTQTs7Ozs7Ozs7QUFTQTs7Ozs7Ozs7QUFTQTs7Ozs7Ozs7OztBQVdBOzs7Ozs7Ozs7O0FBV0E7Ozs7Ozs7Ozs7QUFXQTs7OztBQUlBLDZCQUFrQztBQUFBLFFBQXRCQyxPQUFzQix1RUFBSixFQUFJOztBQUFBOztBQUFBOztBQUFBOztBQUFBLHlDQXZDQSxJQUFJQyxzQkFBSixFQXVDQTs7QUFBQSx3Q0E1QkQsSUFBSUMsc0JBQUosRUE0QkM7O0FBQUEsdUNBakJGLElBQUlBLHNCQUFKLEVBaUJFOztBQUFBLDJDQU5FLElBQUlBLHNCQUFKLEVBTUY7O0FBQ2hDLFNBQUtDLFFBQUwsR0FBZ0IsSUFBSUMsbUJBQUosQ0FBWUosT0FBWixDQUFoQjs7QUFFQSxTQUFLSyxLQUFMO0FBQ0Q7QUFFRDs7Ozs7Ozs7OztBQXFCQTs7Ozs7NEJBS2dCO0FBQUE7O0FBQ2QsVUFBTUMsVUFBa0IsR0FBRyxLQUFLSCxRQUFMLENBQWNJLE1BQWQsR0FBdUIsS0FBdkIsR0FBK0IsSUFBMUQ7QUFFQSxXQUFLQyxPQUFMLEdBQWUsSUFBSUMsU0FBSixXQUFpQkgsVUFBakIsZ0JBQWlDSSxNQUFNLENBQUNDLFFBQVAsQ0FBZ0JDLElBQWpELE9BQWY7O0FBRUEsV0FBS0osT0FBTCxDQUFhSyxnQkFBYixDQUE4QixNQUE5QixFQUFzQztBQUFBLGVBQU0sS0FBSSxDQUFDQyxPQUFMLEVBQU47QUFBQSxPQUF0Qzs7QUFFQSxXQUFLTixPQUFMLENBQWFLLGdCQUFiLENBQThCLFNBQTlCLEVBQXlDLFVBQUNFLE9BQUQ7QUFBQSxlQUFhLEtBQUksQ0FBQ0MsVUFBTCxDQUFnQkQsT0FBaEIsQ0FBYjtBQUFBLE9BQXpDOztBQUVBLFdBQUtQLE9BQUwsQ0FBYUssZ0JBQWIsQ0FBOEIsT0FBOUIsRUFBdUMsVUFBQ0ksRUFBRDtBQUFBLGVBQVEsS0FBSSxDQUFDQyxRQUFMLENBQWNELEVBQWQsQ0FBUjtBQUFBLE9BQXZDO0FBQ0Q7QUFFRDs7Ozs7Ozs7OzhCQU1rQjtBQUNoQixVQUFNRSxRQUFnQixHQUFHLEtBQUtDLFdBQUwsQ0FBaUJDLFdBQWpCLEVBQXpCOztBQUVBLFVBQU1OLE9BQWdCLEdBQUcsSUFBSU8sbUJBQUosQ0FBWSxrQkFBWixFQUFnQ0gsUUFBaEMsQ0FBekI7O0FBRUEsV0FBS1gsT0FBTCxDQUFhZSxJQUFiLENBQWtCUixPQUFPLENBQUNTLFNBQVIsRUFBbEI7O0FBRUEsV0FBS0MsU0FBTCxDQUFlQyxRQUFmLENBQXdCUCxRQUF4QjtBQUNEO0FBRUQ7Ozs7Ozs7Ozs7K0JBT21CSixPLEVBQWM7QUFDL0IsVUFBTVksTUFBVyxHQUFHQyxJQUFJLENBQUNDLEtBQUwsQ0FBV2QsT0FBTyxDQUFDZSxJQUFuQixDQUFwQjtBQUVBLFVBQU1DLEdBQVksR0FBRyxJQUFJVCxtQkFBSixDQUFZSyxNQUFNLENBQUNLLElBQW5CLEVBQXlCTCxNQUFNLENBQUNNLE9BQWhDLENBQXJCO0FBRUEsV0FBS0MsUUFBTCxDQUFjUixRQUFkLENBQXVCSyxHQUF2QjtBQUNEO0FBRUQ7Ozs7Ozs7Ozs7OzZCQVFpQmQsRSxFQUFnQjtBQUMvQixXQUFLa0IsWUFBTCxDQUFrQlQsUUFBbEIsQ0FBMkI7QUFBRVUsUUFBQUEsSUFBSSxFQUFFbkIsRUFBRSxDQUFDbUIsSUFBWDtBQUFpQkMsUUFBQUEsTUFBTSxFQUFFcEIsRUFBRSxDQUFDb0I7QUFBNUIsT0FBM0I7QUFDRDs7O3dCQTFFMkI7QUFBRSxhQUFPLEtBQUtDLFVBQVo7QUFBeUI7QUFFdkQ7Ozs7Ozs7O3dCQUsyQjtBQUFFLGFBQU8sS0FBS0MsU0FBWjtBQUF3QjtBQUVyRDs7Ozs7Ozs7d0JBSytCO0FBQUUsYUFBTyxLQUFLQyxhQUFaO0FBQTRCIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnXG5cbmltcG9ydCBIeXBlcmdpYW50IGZyb20gJ2h5cGVyZ2lhbnQnO1xuXG5pbXBvcnQgTWVzc2FnZSBmcm9tICcuL21lc3NhZ2UvTWVzc2FnZSc7XG5pbXBvcnQgT3B0aW9ucyBmcm9tICcuL29wdGlvbnMvT3B0aW9ucyc7XG5pbXBvcnQgQ2xpZW50RGF0YSBmcm9tICcuL2RhdGEvQ2xpZW50RGF0YSc7XG5cbi8qKlxuICogVGhlIEdhbWVHdWFyZCBjbGllbnQgaXMgdXNlZCB0byBlc3RhYmxpc2ggYSBjb25uZWN0aW9uIHRvIHRoZSBzZXJ2ZXIgc2VuZCBwbGF5ZXIgaW5mby5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZUd1YXJkQ2xpZW50IHtcbiAgLyoqXG4gICAqIEEgcmVmZXJlbmNlIHRvIHRoaXMgY2xpZW50J3Mgb3B0aW9ucy5cbiAgICogXG4gICAqIEBwcml2YXRlXG4gICAqIFxuICAgKiBAcHJvcGVydHkge09wdGlvbnN9XG4gICAqL1xuICBwcml2YXRlIF9vcHRpb25zOiBPcHRpb25zO1xuXG4gIC8qKlxuICAqIEEgcmVmZXJlbmNlIHRvIHRoaXMgY2xpZW50J3MgV2ViU29ja2V0IGNvbm5lY3Rpb24uXG4gICogXG4gICogQHByaXZhdGVcbiAgKiBcbiAgKiBAcHJvcGVydHkge1dlYlNvY2tldH1cbiAgKi9cbiBwcml2YXRlIF9zb2NrZXQhOiBXZWJTb2NrZXQ7XG5cbiAgLyoqXG4gICAqIEEgcmVmZXJlbmNlIHRvIHRoZSBDbGllbnREYXRhIG1vZHVsZS5cbiAgICogXG4gICAqIEBwcml2YXRlXG4gICAqIFxuICAgKiBAcHJvcGVydHkge0NsaWVudERhdGF9XG4gICAqL1xuICBwcml2YXRlIF9jbGllbnREYXRhOiBDbGllbnREYXRhID0gbmV3IENsaWVudERhdGEoKTtcblxuICAvKipcbiAgICogVGhlIHNpZ25hbCB0aGF0IGlzIGRpc3BhdGNoZWQgd2hlbiB0aGUgY2xpZW50IGlzIGFzc2lnbmVkIGEgcGxheWVyIGlkLlxuICAgKlxuICAgKiBUaGlzIHNpZ25hbCBpcyBkaXNwYXRjaGVkIHdpdGggdGhlIGlkIHRoYXQgd2FzIGFzc2lnbmVkIHRvIHRoaXMgY2xpZW50LlxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKlxuICAgKiBAcHJvcGVydHkge0h5cGVyZ2lhbnR9XG4gICAqL1xuICBwcml2YXRlIF9jb25uZWN0ZWQ6IEh5cGVyZ2lhbnQgPSBuZXcgSHlwZXJnaWFudCgpO1xuXG4gIC8qKlxuICAgKiBUaGUgc2lnbmFsIHRoYXQgaXMgZGlzcGF0Y2hlZCB3aGVuIHRoZSBjbGllbnQgcmVjZWl2ZXMgYSBtZXNzYWdlIGZyb20gdGhlIHNlcnZlci5cbiAgICpcbiAgICogVGhpcyBzaWduYWwgaXMgZGlzcGF0Y2hlZCB3aXRoIHRoZSBtZXNzYWdlIHRoYXQgd2FzIHNlbnQgdG8gdGhlIGNsaWVudC5cbiAgICpcbiAgICogQHByaXZhdGVcbiAgICpcbiAgICogQHByb3BlcnR5IHtIeXBlcmdpYW50fVxuICAgKi9cbiAgcHJpdmF0ZSBfbWVzc2FnZWQ6IEh5cGVyZ2lhbnQgPSBuZXcgSHlwZXJnaWFudCgpO1xuXG4gIC8qKlxuICAgKiBUaGUgc2lnbmFsIHRoYXQgaXMgZGlzcGF0Y2hlZCB3aGVuIHRoZSBjbGllbnQncyBjb25uZWN0aW9uIHdpdGggdGhlIHNlcnZlciBpcyBlbmRlZC5cbiAgICpcbiAgICogVGhpcyBzaWduYWwgaXMgZGlzcGF0Y2hlZCB3aXRoIHRoZSBjbG9zZSBjb2RlIGFuZCByZWFzb24uXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqXG4gICAqIEBwcm9wZXJ0eSB7SHlwZXJnaWFudH1cbiAgICovXG4gIHByaXZhdGUgX2Rpc2Nvbm5lY3RlZDogSHlwZXJnaWFudCA9IG5ldyBIeXBlcmdpYW50KCk7XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gVGhlIGluaXRpYWxpemF0aW9uIHBhcmFtZXRlcnMgcGFzc2VkIHRvIHRoaXMgaW5zdGFuY2UuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMuc2VjdXJlPWZhbHNlXSBJbmRpY2F0ZXMgd2hldGhlciB0aGUgd2Vic29ja2V0IHdpbGwgY29ubmVjdCB0byB0aGUgc2VydmVyIHdpdGggYSBzZWN1cmUgY29ubmVjdGlvbiBvciBub3QuXG4gICAqL1xuICBjb25zdHJ1Y3RvcihvcHRpb25zOiBPYmplY3QgPSB7fSkge1xuICAgIHRoaXMuX29wdGlvbnMgPSBuZXcgT3B0aW9ucyhvcHRpb25zKTtcblxuICAgIHRoaXMuX2Jvb3QoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBjb25uZWN0ZWQgc2lnbmFsLlxuICAgKlxuICAgKiBAcmV0dXJucyB7SHlwZXJnaWFudH1cbiAgICovXG4gIGdldCBjb25uZWN0ZWQoKTogSHlwZXJnaWFudCB7IHJldHVybiB0aGlzLl9jb25uZWN0ZWQ7IH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgbWVzc2FnZWQgc2lnbmFsLlxuICAgKlxuICAgKiBAcmV0dXJucyB7SHlwZXJnaWFudH1cbiAgICovXG4gIGdldCBtZXNzYWdlZCgpOiBIeXBlcmdpYW50IHsgcmV0dXJuIHRoaXMuX21lc3NhZ2VkOyB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGRpc2Nvbm5lY3RlZCBzaWduYWwuXG4gICAqXG4gICAqIEByZXR1cm5zIHtIeXBlcmdpYW50fVxuICAgKi9cbiAgZ2V0IGRpc2Nvbm5lY3RlZCgpOiBIeXBlcmdpYW50IHsgcmV0dXJuIHRoaXMuX2Rpc2Nvbm5lY3RlZDsgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplIHRoZSBXZWJTb2NrZXQgY29ubmVjdGlvbiBhbmQgYWxsIG9mIHRoZSBldmVudHMgdGhhdCB3ZSBuZWVkIHRvIHJlc3BvbmQgdG8uXG4gICAqIFxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgcHJpdmF0ZSBfYm9vdCgpIHtcbiAgICBjb25zdCB3c1Byb3RvY29sOiBzdHJpbmcgPSB0aGlzLl9vcHRpb25zLnNlY3VyZSA/ICd3c3MnIDogJ3dzJztcblxuICAgIHRoaXMuX3NvY2tldCA9IG5ldyBXZWJTb2NrZXQoYCR7d3NQcm90b2NvbH06Ly8ke3dpbmRvdy5sb2NhdGlvbi5ob3N0fS9gKTtcblxuICAgIHRoaXMuX3NvY2tldC5hZGRFdmVudExpc3RlbmVyKCdvcGVuJywgKCkgPT4gdGhpcy5fb25PcGVuKCkpO1xuXG4gICAgdGhpcy5fc29ja2V0LmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCAobWVzc2FnZSkgPT4gdGhpcy5fb25NZXNzYWdlKG1lc3NhZ2UpKTtcblxuICAgIHRoaXMuX3NvY2tldC5hZGRFdmVudExpc3RlbmVyKCdjbG9zZScsIChldikgPT4gdGhpcy5fb25DbG9zZShldikpO1xuICB9XG5cbiAgLyoqXG4gICAqIFdoZW4gdGhlIFdlYlNvY2tldCBjb25uZWN0aW9uIG9wZW5zLCB3ZSBjaGVjayB0byBzZWUgaWYgdGhleSBhcmUgYW4gZXhpc3RpbmcgR2FtZUd1YXJkIHBsYXllciB1c2luZyBjb29raWVzXG4gICAqIGFuZCBpZiB0aGV5IGFyZSBub3QgdGhlbiB0aGV5IGFyZSBhc3NpZ25lZCBhIG5ldyBHYW1lR3VhcmQgcGxheWVyIGlkLlxuICAgKiBcbiAgICogQHByaXZhdGVcbiAgICovXG4gIHByaXZhdGUgX29uT3BlbigpIHtcbiAgICBjb25zdCBwbGF5ZXJJZDogc3RyaW5nID0gdGhpcy5fY2xpZW50RGF0YS5nZXRQbGF5ZXJJZCgpO1xuXG4gICAgY29uc3QgbWVzc2FnZTogTWVzc2FnZSA9IG5ldyBNZXNzYWdlKCdwbGF5ZXItY29ubmVjdGVkJywgcGxheWVySWQpO1xuXG4gICAgdGhpcy5fc29ja2V0LnNlbmQobWVzc2FnZS5zdHJpbmdpZnkoKSk7XG5cbiAgICB0aGlzLmNvbm5lY3RlZC5kaXNwYXRjaChwbGF5ZXJJZCk7XG4gIH1cblxuICAvKipcbiAgICogV2hlbiB0aGUgY2xpZW50IHJlY2VpdmVzIGEgbWVzc2FnZSBmcm9tIHRoZSBwbGF5ZXIsIGRpc3BhdGNoIGEgc2lnbmFsIHdpdGggdGhlIG1lc3NhZ2UgdGhhdCB3YXMgc2VudC5cbiAgICogXG4gICAqIEBwcml2YXRlXG4gICAqIFxuICAgKiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZSBUaGUgbWVzc2FnZSBPYmplY3QgcmVjZWl2ZWQgZnJvbSB0aGUgc2VydmVyLlxuICAgKi9cbiAgcHJpdmF0ZSBfb25NZXNzYWdlKG1lc3NhZ2U6IGFueSkge1xuICAgIGNvbnN0IHBhcnNlZDogYW55ID0gSlNPTi5wYXJzZShtZXNzYWdlLmRhdGEpO1xuXG4gICAgY29uc3QgbXNnOiBNZXNzYWdlID0gbmV3IE1lc3NhZ2UocGFyc2VkLnR5cGUsIHBhcnNlZC5jb250ZW50KTtcblxuICAgIHRoaXMubWVzc2FnZWQuZGlzcGF0Y2gobXNnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBXaGVuIHRoZSBXZWJTb2NrZXQgY29ubmVjdGlvbiBjbG9zZXMsIHdlIGVuZCB0aGUgcGxheWVycyBjb25uZWN0aW9uIHRvIHRoZSBnYW1lIGFuZCBub3RpZnkgdGhlbSB3aHksIGlmIGEgcmVhc29uXG4gICAqIHdhcyBwcm92aWRlZC5cbiAgICogXG4gICAqIEBwcml2YXRlXG4gICAqIFxuICAgKiBAcHJvcGVydHkge0V2ZW50fSBldiBUaGUgV2ViU29ja2V0IGNsb3NlIGV2ZW50IE9iamVjdC5cbiAgICovXG4gIHByaXZhdGUgX29uQ2xvc2UoZXY6IENsb3NlRXZlbnQpIHtcbiAgICB0aGlzLmRpc2Nvbm5lY3RlZC5kaXNwYXRjaCh7IGNvZGU6IGV2LmNvZGUsIHJlYXNvbjogZXYucmVhc29uIH0pO1xuICB9XG59XG4iXX0=