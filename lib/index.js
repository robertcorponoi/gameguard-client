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

      var message = new _Message["default"]('player-joined', playerId);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6WyJHYW1lR3VhcmRDbGllbnQiLCJvcHRpb25zIiwiQ2xpZW50RGF0YSIsIl9vcHRpb25zIiwiT3B0aW9ucyIsIl9ib290Iiwid3NQcm90b2NvbCIsInNlY3VyZSIsIl9zb2NrZXQiLCJXZWJTb2NrZXQiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsImhvc3QiLCJhZGRFdmVudExpc3RlbmVyIiwiX29uT3BlbiIsIm1lc3NhZ2UiLCJfb25NZXNzYWdlIiwiZXYiLCJfb25DbG9zZSIsInBsYXllcklkIiwiX2NsaWVudERhdGEiLCJnZXRQbGF5ZXJJZCIsIk1lc3NhZ2UiLCJzZW5kIiwic3RyaW5naWZ5IiwiZW1pdCIsInBhcnNlZCIsIkpTT04iLCJwYXJzZSIsImRhdGEiLCJtc2ciLCJ0eXBlIiwiY29udGVudCIsIkV2ZW50dmVyc2UiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O0FBRUE7O0FBRUE7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBOzs7SUFHcUJBLGU7Ozs7O0FBQ25COzs7Ozs7OztBQVNBOzs7Ozs7OztBQVNBOzs7Ozs7OztBQVNBOzs7O0FBSUEsNkJBQWtDO0FBQUE7O0FBQUEsUUFBdEJDLE9BQXNCLHVFQUFKLEVBQUk7O0FBQUE7O0FBQ2hDOztBQURnQzs7QUFBQTs7QUFBQSxrRUFOQSxJQUFJQyxzQkFBSixFQU1BOztBQUdoQyxVQUFLQyxRQUFMLEdBQWdCLElBQUlDLG1CQUFKLENBQVlILE9BQVosQ0FBaEI7O0FBRUEsVUFBS0ksS0FBTDs7QUFMZ0M7QUFNakM7QUFFRDs7Ozs7Ozs7OzRCQUtnQjtBQUFBOztBQUNkLFVBQU1DLFVBQWtCLEdBQUcsS0FBS0gsUUFBTCxDQUFjSSxNQUFkLEdBQXVCLEtBQXZCLEdBQStCLElBQTFEO0FBRUEsV0FBS0MsT0FBTCxHQUFlLElBQUlDLFNBQUosV0FBaUJILFVBQWpCLGdCQUFpQ0ksTUFBTSxDQUFDQyxRQUFQLENBQWdCQyxJQUFqRCxPQUFmOztBQUVBLFdBQUtKLE9BQUwsQ0FBYUssZ0JBQWIsQ0FBOEIsTUFBOUIsRUFBc0M7QUFBQSxlQUFNLE1BQUksQ0FBQ0MsT0FBTCxFQUFOO0FBQUEsT0FBdEM7O0FBRUEsV0FBS04sT0FBTCxDQUFhSyxnQkFBYixDQUE4QixTQUE5QixFQUF5QyxVQUFDRSxPQUFEO0FBQUEsZUFBYSxNQUFJLENBQUNDLFVBQUwsQ0FBZ0JELE9BQWhCLENBQWI7QUFBQSxPQUF6Qzs7QUFFQSxXQUFLUCxPQUFMLENBQWFLLGdCQUFiLENBQThCLE9BQTlCLEVBQXVDLFVBQUNJLEVBQUQ7QUFBQSxlQUFRLE1BQUksQ0FBQ0MsUUFBTCxDQUFjRCxFQUFkLENBQVI7QUFBQSxPQUF2QztBQUNEO0FBRUQ7Ozs7Ozs7Ozs4QkFNa0I7QUFDaEIsVUFBTUUsUUFBZ0IsR0FBRyxLQUFLQyxXQUFMLENBQWlCQyxXQUFqQixFQUF6Qjs7QUFFQSxVQUFNTixPQUFnQixHQUFHLElBQUlPLG1CQUFKLENBQVksZUFBWixFQUE2QkgsUUFBN0IsQ0FBekI7O0FBRUEsV0FBS1gsT0FBTCxDQUFhZSxJQUFiLENBQWtCUixPQUFPLENBQUNTLFNBQVIsRUFBbEIsRUFMZ0IsQ0FPaEI7OztBQUNBLFdBQUtDLElBQUwsQ0FBVSxNQUFWLEVBQWtCTixRQUFsQjtBQUNEO0FBRUQ7Ozs7Ozs7Ozs7K0JBT21CSixPLEVBQWM7QUFDL0IsVUFBTVcsTUFBVyxHQUFHQyxJQUFJLENBQUNDLEtBQUwsQ0FBV2IsT0FBTyxDQUFDYyxJQUFuQixDQUFwQjtBQUVBLFVBQU1DLEdBQVksR0FBRyxJQUFJUixtQkFBSixDQUFZSSxNQUFNLENBQUNLLElBQW5CLEVBQXlCTCxNQUFNLENBQUNNLE9BQWhDLENBQXJCLENBSCtCLENBSy9COztBQUNBLFdBQUtQLElBQUwsQ0FBVSxTQUFWLEVBQXFCSyxHQUFyQjtBQUNEO0FBRUQ7Ozs7Ozs7Ozs7OzZCQVFpQmIsRSxFQUFXO0FBQzFCO0FBQ0EsV0FBS1EsSUFBTCxDQUFVLE9BQVYsRUFBbUJSLEVBQW5CO0FBQ0Q7Ozs7RUFyRzBDZ0Isc0IiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCdcclxuXHJcbmltcG9ydCBFdmVudHZlcnNlIGZyb20gJ2V2ZW50dmVyc2UnO1xyXG5cclxuaW1wb3J0IE1lc3NhZ2UgZnJvbSAnLi9tZXNzYWdlL01lc3NhZ2UnO1xyXG5pbXBvcnQgT3B0aW9ucyBmcm9tICcuL29wdGlvbnMvT3B0aW9ucyc7XHJcbmltcG9ydCBDbGllbnREYXRhIGZyb20gJy4vZGF0YS9DbGllbnREYXRhJztcclxuXHJcbi8qKlxyXG4gKiBUaGUgR2FtZUd1YXJkIGNsaWVudCBpcyB1c2VkIHRvIGVzdGFibGlzaCBhIGNvbm5lY3Rpb24gdG8gdGhlIHNlcnZlciBzZW5kIHBsYXllciBpbmZvLlxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZUd1YXJkQ2xpZW50IGV4dGVuZHMgRXZlbnR2ZXJzZSB7XHJcbiAgLyoqXHJcbiAgICogQSByZWZlcmVuY2UgdG8gdGhpcyBjbGllbnQncyBvcHRpb25zLlxyXG4gICAqIFxyXG4gICAqIEBwcml2YXRlXHJcbiAgICogXHJcbiAgICogQHByb3BlcnR5IHtPcHRpb25zfVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX29wdGlvbnM6IE9wdGlvbnM7XHJcblxyXG4gIC8qKlxyXG4gICogQSByZWZlcmVuY2UgdG8gdGhpcyBjbGllbnQncyBXZWJTb2NrZXQgY29ubmVjdGlvbi5cclxuICAqIFxyXG4gICogQHByaXZhdGVcclxuICAqIFxyXG4gICogQHByb3BlcnR5IHtXZWJTb2NrZXR9XHJcbiAgKi9cclxuIHByaXZhdGUgX3NvY2tldCE6IFdlYlNvY2tldDtcclxuXHJcbiAgLyoqXHJcbiAgICogQSByZWZlcmVuY2UgdG8gdGhlIENsaWVudERhdGEgbW9kdWxlLlxyXG4gICAqIFxyXG4gICAqIEBwcml2YXRlXHJcbiAgICogXHJcbiAgICogQHByb3BlcnR5IHtDbGllbnREYXRhfVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX2NsaWVudERhdGE6IENsaWVudERhdGEgPSBuZXcgQ2xpZW50RGF0YSgpO1xyXG5cclxuICAvKipcclxuICAgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdIFRoZSBpbml0aWFsaXphdGlvbiBwYXJhbWV0ZXJzIHBhc3NlZCB0byB0aGlzIGluc3RhbmNlLlxyXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMuc2VjdXJlPWZhbHNlXSBJbmRpY2F0ZXMgd2hldGhlciB0aGUgd2Vic29ja2V0IHdpbGwgY29ubmVjdCB0byB0aGUgc2VydmVyIHdpdGggYSBzZWN1cmUgY29ubmVjdGlvbiBvciBub3QuXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3Iob3B0aW9uczogT2JqZWN0ID0ge30pIHtcclxuICAgIHN1cGVyKCk7XHJcblxyXG4gICAgdGhpcy5fb3B0aW9ucyA9IG5ldyBPcHRpb25zKG9wdGlvbnMpO1xyXG5cclxuICAgIHRoaXMuX2Jvb3QoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEluaXRpYWxpemUgdGhlIFdlYlNvY2tldCBjb25uZWN0aW9uIGFuZCBhbGwgb2YgdGhlIGV2ZW50cyB0aGF0IHdlIG5lZWQgdG8gcmVzcG9uZCB0by5cclxuICAgKiBcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX2Jvb3QoKSB7XHJcbiAgICBjb25zdCB3c1Byb3RvY29sOiBzdHJpbmcgPSB0aGlzLl9vcHRpb25zLnNlY3VyZSA/ICd3c3MnIDogJ3dzJztcclxuXHJcbiAgICB0aGlzLl9zb2NrZXQgPSBuZXcgV2ViU29ja2V0KGAke3dzUHJvdG9jb2x9Oi8vJHt3aW5kb3cubG9jYXRpb24uaG9zdH0vYCk7XHJcblxyXG4gICAgdGhpcy5fc29ja2V0LmFkZEV2ZW50TGlzdGVuZXIoJ29wZW4nLCAoKSA9PiB0aGlzLl9vbk9wZW4oKSk7XHJcblxyXG4gICAgdGhpcy5fc29ja2V0LmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCAobWVzc2FnZSkgPT4gdGhpcy5fb25NZXNzYWdlKG1lc3NhZ2UpKTtcclxuXHJcbiAgICB0aGlzLl9zb2NrZXQuYWRkRXZlbnRMaXN0ZW5lcignY2xvc2UnLCAoZXYpID0+IHRoaXMuX29uQ2xvc2UoZXYpKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZW4gdGhlIFdlYlNvY2tldCBjb25uZWN0aW9uIG9wZW5zLCB3ZSBjaGVjayB0byBzZWUgaWYgdGhleSBhcmUgYW4gZXhpc3RpbmcgR2FtZUd1YXJkIHBsYXllciB1c2luZyBjb29raWVzXHJcbiAgICogYW5kIGlmIHRoZXkgYXJlIG5vdCB0aGVuIHRoZXkgYXJlIGFzc2lnbmVkIGEgbmV3IEdhbWVHdWFyZCBwbGF5ZXIgaWQuXHJcbiAgICogXHJcbiAgICogQHByaXZhdGVcclxuICAgKi9cclxuICBwcml2YXRlIF9vbk9wZW4oKSB7XHJcbiAgICBjb25zdCBwbGF5ZXJJZDogc3RyaW5nID0gdGhpcy5fY2xpZW50RGF0YS5nZXRQbGF5ZXJJZCgpO1xyXG5cclxuICAgIGNvbnN0IG1lc3NhZ2U6IE1lc3NhZ2UgPSBuZXcgTWVzc2FnZSgncGxheWVyLWpvaW5lZCcsIHBsYXllcklkKTtcclxuXHJcbiAgICB0aGlzLl9zb2NrZXQuc2VuZChtZXNzYWdlLnN0cmluZ2lmeSgpKTtcclxuXHJcbiAgICAvLyBAdHMtaWdub3JlXHJcbiAgICB0aGlzLmVtaXQoJ29wZW4nLCBwbGF5ZXJJZCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUT0RPOlxyXG4gICAqIFxyXG4gICAqIEBwcml2YXRlXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2UgVGhlIG1lc3NhZ2UgT2JqZWN0IHJlY2VpdmVkIGZyb20gdGhlIHNlcnZlci5cclxuICAgKi9cclxuICBwcml2YXRlIF9vbk1lc3NhZ2UobWVzc2FnZTogYW55KSB7XHJcbiAgICBjb25zdCBwYXJzZWQ6IGFueSA9IEpTT04ucGFyc2UobWVzc2FnZS5kYXRhKTtcclxuXHJcbiAgICBjb25zdCBtc2c6IE1lc3NhZ2UgPSBuZXcgTWVzc2FnZShwYXJzZWQudHlwZSwgcGFyc2VkLmNvbnRlbnQpO1xyXG5cclxuICAgIC8vIEB0cy1pZ25vcmVcclxuICAgIHRoaXMuZW1pdCgnbWVzc2FnZScsIG1zZyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBXaGVuIHRoZSBXZWJTb2NrZXQgY29ubmVjdGlvbiBjbG9zZXMsIHdlIGVuZCB0aGUgcGxheWVycyBjb25uZWN0aW9uIHRvIHRoZSBnYW1lIGFuZCBub3RpZnkgdGhlbSB3aHksIGlmIGEgcmVhc29uXHJcbiAgICogd2FzIHByb3ZpZGVkLlxyXG4gICAqIFxyXG4gICAqIEBwcml2YXRlXHJcbiAgICogXHJcbiAgICogQHByb3BlcnR5IHtFdmVudH0gZXYgVGhlIFdlYlNvY2tldCBjbG9zZSBldmVudCBPYmplY3QuXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfb25DbG9zZShldjogRXZlbnQpIHtcclxuICAgIC8vIEB0cy1pZ25vcmVcclxuICAgIHRoaXMuZW1pdCgnY2xvc2UnLCBldik7XHJcbiAgfVxyXG59Il19