'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _eventverse = _interopRequireDefault(require("eventverse"));

var _Message = _interopRequireDefault(require("./message/Message"));

var _Options = _interopRequireDefault(require("./options/Options"));

var _ClientData = _interopRequireDefault(require("./data/ClientData"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * The GameGuard client is used to establish a connection to the server send player info.
 */
var GameGuardClient =
/*#__PURE__*/
function (_Eventverse) {
  _inherits(GameGuardClient, _Eventverse);

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
   * @param {Object} [options] The initialization parameters passed to this instance.
   * @param {boolean} [options.secure=false] Indicates whether the websocket will connect to the server with a secure connection or not.
   */
  function GameGuardClient() {
    var _this;

    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, GameGuardClient);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(GameGuardClient).call(this));

    _defineProperty(_assertThisInitialized(_this), "_options", void 0);

    _defineProperty(_assertThisInitialized(_this), "_socket", void 0);

    _defineProperty(_assertThisInitialized(_this), "_clientData", new _ClientData["default"]());

    _this._options = new _Options["default"](options);

    _this._boot();

    return _this;
  }
  /**
   * Initialize the WebSocket connection and all of the events that we need to respond to.
   * 
   * @private
   */


  _createClass(GameGuardClient, [{
    key: "_boot",
    value: function _boot() {
      var _this2 = this;

      var wsProtocol = this._options.secure ? 'wss' : 'ws';
      this._socket = new WebSocket("".concat(wsProtocol, "://").concat(window.location.host, "/"));

      this._socket.addEventListener('open', function () {
        return _this2._onOpen();
      });

      this._socket.addEventListener('message', function (message) {
        return _this2._onMessage(message);
      });

      this._socket.addEventListener('close', function (ev) {
        return _this2._onClose(ev);
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

      this._socket.send(message.stringify()); // @ts-ignore


      this.emit('open', playerId);
    }
    /**
     * TODO:
     * 
     * @private
     * 
     * @param {string} message The message Object received from the server.
     */

  }, {
    key: "_onMessage",
    value: function _onMessage(message) {
      var parsed = JSON.parse(message.data);
      var msg = new _Message["default"](parsed.type, parsed.content); // @ts-ignore

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

  }, {
    key: "_onClose",
    value: function _onClose(ev) {
      // @ts-ignore
      this.emit('close', ev);
    }
  }]);

  return GameGuardClient;
}(_eventverse["default"]);

exports["default"] = GameGuardClient;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6WyJHYW1lR3VhcmRDbGllbnQiLCJvcHRpb25zIiwiQ2xpZW50RGF0YSIsIl9vcHRpb25zIiwiT3B0aW9ucyIsIl9ib290Iiwid3NQcm90b2NvbCIsInNlY3VyZSIsIl9zb2NrZXQiLCJXZWJTb2NrZXQiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsImhvc3QiLCJhZGRFdmVudExpc3RlbmVyIiwiX29uT3BlbiIsIm1lc3NhZ2UiLCJfb25NZXNzYWdlIiwiZXYiLCJfb25DbG9zZSIsInBsYXllcklkIiwiX2NsaWVudERhdGEiLCJnZXRQbGF5ZXJJZCIsIk1lc3NhZ2UiLCJzZW5kIiwic3RyaW5naWZ5IiwiZW1pdCIsInBhcnNlZCIsIkpTT04iLCJwYXJzZSIsImRhdGEiLCJtc2ciLCJ0eXBlIiwiY29udGVudCIsIkV2ZW50dmVyc2UiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O0FBRUE7O0FBRUE7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBOzs7SUFHcUJBLGU7Ozs7O0FBQ25COzs7Ozs7OztBQVNBOzs7Ozs7OztBQVNBOzs7Ozs7OztBQVNBOzs7O0FBSUEsNkJBQWtDO0FBQUE7O0FBQUEsUUFBdEJDLE9BQXNCLHVFQUFKLEVBQUk7O0FBQUE7O0FBQ2hDOztBQURnQzs7QUFBQTs7QUFBQSxrRUFOQSxJQUFJQyxzQkFBSixFQU1BOztBQUdoQyxVQUFLQyxRQUFMLEdBQWdCLElBQUlDLG1CQUFKLENBQVlILE9BQVosQ0FBaEI7O0FBRUEsVUFBS0ksS0FBTDs7QUFMZ0M7QUFNakM7QUFFRDs7Ozs7Ozs7OzRCQUtnQjtBQUFBOztBQUNkLFVBQU1DLFVBQWtCLEdBQUcsS0FBS0gsUUFBTCxDQUFjSSxNQUFkLEdBQXVCLEtBQXZCLEdBQStCLElBQTFEO0FBRUEsV0FBS0MsT0FBTCxHQUFlLElBQUlDLFNBQUosV0FBaUJILFVBQWpCLGdCQUFpQ0ksTUFBTSxDQUFDQyxRQUFQLENBQWdCQyxJQUFqRCxPQUFmOztBQUVBLFdBQUtKLE9BQUwsQ0FBYUssZ0JBQWIsQ0FBOEIsTUFBOUIsRUFBc0M7QUFBQSxlQUFNLE1BQUksQ0FBQ0MsT0FBTCxFQUFOO0FBQUEsT0FBdEM7O0FBRUEsV0FBS04sT0FBTCxDQUFhSyxnQkFBYixDQUE4QixTQUE5QixFQUF5QyxVQUFDRSxPQUFEO0FBQUEsZUFBYSxNQUFJLENBQUNDLFVBQUwsQ0FBZ0JELE9BQWhCLENBQWI7QUFBQSxPQUF6Qzs7QUFFQSxXQUFLUCxPQUFMLENBQWFLLGdCQUFiLENBQThCLE9BQTlCLEVBQXVDLFVBQUNJLEVBQUQ7QUFBQSxlQUFRLE1BQUksQ0FBQ0MsUUFBTCxDQUFjRCxFQUFkLENBQVI7QUFBQSxPQUF2QztBQUNEO0FBRUQ7Ozs7Ozs7Ozs4QkFNa0I7QUFDaEIsVUFBTUUsUUFBZ0IsR0FBRyxLQUFLQyxXQUFMLENBQWlCQyxXQUFqQixFQUF6Qjs7QUFFQSxVQUFNTixPQUFnQixHQUFHLElBQUlPLG1CQUFKLENBQVksa0JBQVosRUFBZ0NILFFBQWhDLENBQXpCOztBQUVBLFdBQUtYLE9BQUwsQ0FBYWUsSUFBYixDQUFrQlIsT0FBTyxDQUFDUyxTQUFSLEVBQWxCLEVBTGdCLENBT2hCOzs7QUFDQSxXQUFLQyxJQUFMLENBQVUsTUFBVixFQUFrQk4sUUFBbEI7QUFDRDtBQUVEOzs7Ozs7Ozs7OytCQU9tQkosTyxFQUFjO0FBQy9CLFVBQU1XLE1BQVcsR0FBR0MsSUFBSSxDQUFDQyxLQUFMLENBQVdiLE9BQU8sQ0FBQ2MsSUFBbkIsQ0FBcEI7QUFFQSxVQUFNQyxHQUFZLEdBQUcsSUFBSVIsbUJBQUosQ0FBWUksTUFBTSxDQUFDSyxJQUFuQixFQUF5QkwsTUFBTSxDQUFDTSxPQUFoQyxDQUFyQixDQUgrQixDQUsvQjs7QUFDQSxXQUFLUCxJQUFMLENBQVUsU0FBVixFQUFxQkssR0FBckI7QUFDRDtBQUVEOzs7Ozs7Ozs7Ozs2QkFRaUJiLEUsRUFBVztBQUMxQjtBQUNBLFdBQUtRLElBQUwsQ0FBVSxPQUFWLEVBQW1CUixFQUFuQjtBQUNEOzs7O0VBckcwQ2dCLHNCIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnXG5cbmltcG9ydCBFdmVudHZlcnNlIGZyb20gJ2V2ZW50dmVyc2UnO1xuXG5pbXBvcnQgTWVzc2FnZSBmcm9tICcuL21lc3NhZ2UvTWVzc2FnZSc7XG5pbXBvcnQgT3B0aW9ucyBmcm9tICcuL29wdGlvbnMvT3B0aW9ucyc7XG5pbXBvcnQgQ2xpZW50RGF0YSBmcm9tICcuL2RhdGEvQ2xpZW50RGF0YSc7XG5cbi8qKlxuICogVGhlIEdhbWVHdWFyZCBjbGllbnQgaXMgdXNlZCB0byBlc3RhYmxpc2ggYSBjb25uZWN0aW9uIHRvIHRoZSBzZXJ2ZXIgc2VuZCBwbGF5ZXIgaW5mby5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZUd1YXJkQ2xpZW50IGV4dGVuZHMgRXZlbnR2ZXJzZSB7XG4gIC8qKlxuICAgKiBBIHJlZmVyZW5jZSB0byB0aGlzIGNsaWVudCdzIG9wdGlvbnMuXG4gICAqIFxuICAgKiBAcHJpdmF0ZVxuICAgKiBcbiAgICogQHByb3BlcnR5IHtPcHRpb25zfVxuICAgKi9cbiAgcHJpdmF0ZSBfb3B0aW9uczogT3B0aW9ucztcblxuICAvKipcbiAgKiBBIHJlZmVyZW5jZSB0byB0aGlzIGNsaWVudCdzIFdlYlNvY2tldCBjb25uZWN0aW9uLlxuICAqIFxuICAqIEBwcml2YXRlXG4gICogXG4gICogQHByb3BlcnR5IHtXZWJTb2NrZXR9XG4gICovXG4gcHJpdmF0ZSBfc29ja2V0ITogV2ViU29ja2V0O1xuXG4gIC8qKlxuICAgKiBBIHJlZmVyZW5jZSB0byB0aGUgQ2xpZW50RGF0YSBtb2R1bGUuXG4gICAqIFxuICAgKiBAcHJpdmF0ZVxuICAgKiBcbiAgICogQHByb3BlcnR5IHtDbGllbnREYXRhfVxuICAgKi9cbiAgcHJpdmF0ZSBfY2xpZW50RGF0YTogQ2xpZW50RGF0YSA9IG5ldyBDbGllbnREYXRhKCk7XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gVGhlIGluaXRpYWxpemF0aW9uIHBhcmFtZXRlcnMgcGFzc2VkIHRvIHRoaXMgaW5zdGFuY2UuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMuc2VjdXJlPWZhbHNlXSBJbmRpY2F0ZXMgd2hldGhlciB0aGUgd2Vic29ja2V0IHdpbGwgY29ubmVjdCB0byB0aGUgc2VydmVyIHdpdGggYSBzZWN1cmUgY29ubmVjdGlvbiBvciBub3QuXG4gICAqL1xuICBjb25zdHJ1Y3RvcihvcHRpb25zOiBPYmplY3QgPSB7fSkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLl9vcHRpb25zID0gbmV3IE9wdGlvbnMob3B0aW9ucyk7XG5cbiAgICB0aGlzLl9ib290KCk7XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhbGl6ZSB0aGUgV2ViU29ja2V0IGNvbm5lY3Rpb24gYW5kIGFsbCBvZiB0aGUgZXZlbnRzIHRoYXQgd2UgbmVlZCB0byByZXNwb25kIHRvLlxuICAgKiBcbiAgICogQHByaXZhdGVcbiAgICovXG4gIHByaXZhdGUgX2Jvb3QoKSB7XG4gICAgY29uc3Qgd3NQcm90b2NvbDogc3RyaW5nID0gdGhpcy5fb3B0aW9ucy5zZWN1cmUgPyAnd3NzJyA6ICd3cyc7XG5cbiAgICB0aGlzLl9zb2NrZXQgPSBuZXcgV2ViU29ja2V0KGAke3dzUHJvdG9jb2x9Oi8vJHt3aW5kb3cubG9jYXRpb24uaG9zdH0vYCk7XG5cbiAgICB0aGlzLl9zb2NrZXQuYWRkRXZlbnRMaXN0ZW5lcignb3BlbicsICgpID0+IHRoaXMuX29uT3BlbigpKTtcblxuICAgIHRoaXMuX3NvY2tldC5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgKG1lc3NhZ2UpID0+IHRoaXMuX29uTWVzc2FnZShtZXNzYWdlKSk7XG5cbiAgICB0aGlzLl9zb2NrZXQuYWRkRXZlbnRMaXN0ZW5lcignY2xvc2UnLCAoZXYpID0+IHRoaXMuX29uQ2xvc2UoZXYpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBXaGVuIHRoZSBXZWJTb2NrZXQgY29ubmVjdGlvbiBvcGVucywgd2UgY2hlY2sgdG8gc2VlIGlmIHRoZXkgYXJlIGFuIGV4aXN0aW5nIEdhbWVHdWFyZCBwbGF5ZXIgdXNpbmcgY29va2llc1xuICAgKiBhbmQgaWYgdGhleSBhcmUgbm90IHRoZW4gdGhleSBhcmUgYXNzaWduZWQgYSBuZXcgR2FtZUd1YXJkIHBsYXllciBpZC5cbiAgICogXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBwcml2YXRlIF9vbk9wZW4oKSB7XG4gICAgY29uc3QgcGxheWVySWQ6IHN0cmluZyA9IHRoaXMuX2NsaWVudERhdGEuZ2V0UGxheWVySWQoKTtcblxuICAgIGNvbnN0IG1lc3NhZ2U6IE1lc3NhZ2UgPSBuZXcgTWVzc2FnZSgncGxheWVyLWNvbm5lY3RlZCcsIHBsYXllcklkKTtcblxuICAgIHRoaXMuX3NvY2tldC5zZW5kKG1lc3NhZ2Uuc3RyaW5naWZ5KCkpO1xuXG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIHRoaXMuZW1pdCgnb3BlbicsIHBsYXllcklkKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUT0RPOlxuICAgKiBcbiAgICogQHByaXZhdGVcbiAgICogXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlIFRoZSBtZXNzYWdlIE9iamVjdCByZWNlaXZlZCBmcm9tIHRoZSBzZXJ2ZXIuXG4gICAqL1xuICBwcml2YXRlIF9vbk1lc3NhZ2UobWVzc2FnZTogYW55KSB7XG4gICAgY29uc3QgcGFyc2VkOiBhbnkgPSBKU09OLnBhcnNlKG1lc3NhZ2UuZGF0YSk7XG5cbiAgICBjb25zdCBtc2c6IE1lc3NhZ2UgPSBuZXcgTWVzc2FnZShwYXJzZWQudHlwZSwgcGFyc2VkLmNvbnRlbnQpO1xuXG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIHRoaXMuZW1pdCgnbWVzc2FnZScsIG1zZyk7XG4gIH1cblxuICAvKipcbiAgICogV2hlbiB0aGUgV2ViU29ja2V0IGNvbm5lY3Rpb24gY2xvc2VzLCB3ZSBlbmQgdGhlIHBsYXllcnMgY29ubmVjdGlvbiB0byB0aGUgZ2FtZSBhbmQgbm90aWZ5IHRoZW0gd2h5LCBpZiBhIHJlYXNvblxuICAgKiB3YXMgcHJvdmlkZWQuXG4gICAqIFxuICAgKiBAcHJpdmF0ZVxuICAgKiBcbiAgICogQHByb3BlcnR5IHtFdmVudH0gZXYgVGhlIFdlYlNvY2tldCBjbG9zZSBldmVudCBPYmplY3QuXG4gICAqL1xuICBwcml2YXRlIF9vbkNsb3NlKGV2OiBFdmVudCkge1xuICAgIC8vIEB0cy1pZ25vcmVcbiAgICB0aGlzLmVtaXQoJ2Nsb3NlJywgZXYpO1xuICB9XG59XG4iXX0=