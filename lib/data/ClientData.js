'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _cookies = _interopRequireDefault(require("./cookies"));

var _uuid = _interopRequireDefault(require("../utils/uuid"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Provides methods to set, get, and work with data stored on the client side in cookies.
 */
var ClientData =
/*#__PURE__*/
function () {
  function ClientData() {
    _classCallCheck(this, ClientData);
  }

  _createClass(ClientData, [{
    key: "getPlayerId",

    /**
     * Gets the GameGuard player id from the current player, if it doesn't exist then a player id will be assigned to the player and returned.
     * 
     * @returns {string} Returns the player id.
     */
    value: function getPlayerId() {
      var playerId = _cookies["default"].get('gameguardPlayerId');

      if (!playerId) {
        playerId = _uuid["default"].v4();

        _cookies["default"].set('gameguardPlayerId', playerId);
      }

      return playerId;
    }
  }]);

  return ClientData;
}();

exports["default"] = ClientData;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kYXRhL0NsaWVudERhdGEudHMiXSwibmFtZXMiOlsiQ2xpZW50RGF0YSIsInBsYXllcklkIiwiY29va2llcyIsImdldCIsInV1aWQiLCJ2NCIsInNldCJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7QUFFQTs7QUFDQTs7Ozs7Ozs7OztBQUVBOzs7SUFHcUJBLFU7Ozs7Ozs7Ozs7QUFDbkI7Ozs7O2tDQUtzQjtBQUNwQixVQUFJQyxRQUFnQixHQUFHQyxvQkFBUUMsR0FBUixDQUFZLG1CQUFaLENBQXZCOztBQUVBLFVBQUksQ0FBQ0YsUUFBTCxFQUFlO0FBQ2JBLFFBQUFBLFFBQVEsR0FBR0csaUJBQUtDLEVBQUwsRUFBWDs7QUFFQUgsNEJBQVFJLEdBQVIsQ0FBWSxtQkFBWixFQUFpQ0wsUUFBakM7QUFDRDs7QUFFRCxhQUFPQSxRQUFQO0FBQ0QiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCdcclxuXHJcbmltcG9ydCBjb29raWVzIGZyb20gJy4vY29va2llcyc7XHJcbmltcG9ydCB1dWlkIGZyb20gJy4uL3V0aWxzL3V1aWQnO1xyXG5cclxuLyoqXHJcbiAqIFByb3ZpZGVzIG1ldGhvZHMgdG8gc2V0LCBnZXQsIGFuZCB3b3JrIHdpdGggZGF0YSBzdG9yZWQgb24gdGhlIGNsaWVudCBzaWRlIGluIGNvb2tpZXMuXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDbGllbnREYXRhIHtcclxuICAvKipcclxuICAgKiBHZXRzIHRoZSBHYW1lR3VhcmQgcGxheWVyIGlkIGZyb20gdGhlIGN1cnJlbnQgcGxheWVyLCBpZiBpdCBkb2Vzbid0IGV4aXN0IHRoZW4gYSBwbGF5ZXIgaWQgd2lsbCBiZSBhc3NpZ25lZCB0byB0aGUgcGxheWVyIGFuZCByZXR1cm5lZC5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBwbGF5ZXIgaWQuXHJcbiAgICovXHJcbiAgZ2V0UGxheWVySWQoKTogc3RyaW5nIHtcclxuICAgIGxldCBwbGF5ZXJJZDogc3RyaW5nID0gY29va2llcy5nZXQoJ2dhbWVndWFyZFBsYXllcklkJyk7XHJcblxyXG4gICAgaWYgKCFwbGF5ZXJJZCkge1xyXG4gICAgICBwbGF5ZXJJZCA9IHV1aWQudjQoKTtcclxuXHJcbiAgICAgIGNvb2tpZXMuc2V0KCdnYW1lZ3VhcmRQbGF5ZXJJZCcsIHBsYXllcklkKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcGxheWVySWQ7XHJcbiAgfVxyXG59Il19