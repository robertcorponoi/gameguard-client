'use strict';
/**
 * Provides methods to get, set, or edit data in cookies.
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  /**
   * Gets the value for a specified cookie name.
   * 
   * @param {string} name The name of the cookie to get.
   * 
   * @returns {string} Returns the value of the cookie or an empty string if the cookie does not exist.
   */
  get: function get(name) {
    var cname = "".concat(name, "=");
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = ca[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var c = _step.value;

        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }

        if (c.indexOf(cname) == 0) return c.substring(cname.length, c.length);
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator["return"] != null) {
          _iterator["return"]();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    return '';
  },

  /**
   * Sets a new cookie with the desired name, value, and expiration date in days.
   * 
   * @param {string} name The name of the cookie to set.
   * @param {string} value The value of the cookie to set.
   * @param {number} [daysToExpire=365] The number of days until this cookie expires.
   */
  set: function set(name, value) {
    var daysToExpire = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 365;
    var d = new Date();
    d.setTime(d.getTime() + daysToExpire * 24 * 60 * 60 * 1000);
    var expires = "expires=".concat(d.toUTCString());
    document.cookie = "".concat(name, "=").concat(value, ";").concat(expires, ";path=/");
  }
};
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kYXRhL2Nvb2tpZXMudHMiXSwibmFtZXMiOlsiZ2V0IiwibmFtZSIsImNuYW1lIiwiZGVjb2RlZENvb2tpZSIsImRlY29kZVVSSUNvbXBvbmVudCIsImRvY3VtZW50IiwiY29va2llIiwiY2EiLCJzcGxpdCIsImMiLCJjaGFyQXQiLCJzdWJzdHJpbmciLCJpbmRleE9mIiwibGVuZ3RoIiwic2V0IiwidmFsdWUiLCJkYXlzVG9FeHBpcmUiLCJkIiwiRGF0ZSIsInNldFRpbWUiLCJnZXRUaW1lIiwiZXhwaXJlcyIsInRvVVRDU3RyaW5nIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUVBOzs7Ozs7OztlQUdlO0FBQ2I7Ozs7Ozs7QUFPQUEsRUFBQUEsR0FSYSxlQVFUQyxJQVJTLEVBUWE7QUFFeEIsUUFBTUMsS0FBYSxhQUFNRCxJQUFOLE1BQW5CO0FBRUEsUUFBTUUsYUFBcUIsR0FBR0Msa0JBQWtCLENBQUNDLFFBQVEsQ0FBQ0MsTUFBVixDQUFoRDtBQUVBLFFBQU1DLEVBQWlCLEdBQUdKLGFBQWEsQ0FBQ0ssS0FBZCxDQUFvQixHQUFwQixDQUExQjtBQU53QjtBQUFBO0FBQUE7O0FBQUE7QUFReEIsMkJBQWNELEVBQWQsOEhBQWtCO0FBQUEsWUFBVEUsQ0FBUzs7QUFDaEIsZUFBT0EsQ0FBQyxDQUFDQyxNQUFGLENBQVMsQ0FBVCxLQUFlLEdBQXRCO0FBQTJCRCxVQUFBQSxDQUFDLEdBQUdBLENBQUMsQ0FBQ0UsU0FBRixDQUFZLENBQVosQ0FBSjtBQUEzQjs7QUFFQSxZQUFJRixDQUFDLENBQUNHLE9BQUYsQ0FBVVYsS0FBVixLQUFvQixDQUF4QixFQUEyQixPQUFPTyxDQUFDLENBQUNFLFNBQUYsQ0FBWVQsS0FBSyxDQUFDVyxNQUFsQixFQUEwQkosQ0FBQyxDQUFDSSxNQUE1QixDQUFQO0FBQzVCO0FBWnVCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBY3hCLFdBQU8sRUFBUDtBQUNELEdBdkJZOztBQXlCYjs7Ozs7OztBQU9BQyxFQUFBQSxHQWhDYSxlQWdDVGIsSUFoQ1MsRUFnQ0tjLEtBaENMLEVBZ0NnRDtBQUFBLFFBQTVCQyxZQUE0Qix1RUFBTCxHQUFLO0FBQzNELFFBQU1DLENBQU8sR0FBRyxJQUFJQyxJQUFKLEVBQWhCO0FBRUFELElBQUFBLENBQUMsQ0FBQ0UsT0FBRixDQUFVRixDQUFDLENBQUNHLE9BQUYsS0FBZUosWUFBWSxHQUFHLEVBQWYsR0FBb0IsRUFBcEIsR0FBeUIsRUFBekIsR0FBOEIsSUFBdkQ7QUFFQSxRQUFNSyxPQUFlLHFCQUFjSixDQUFDLENBQUNLLFdBQUYsRUFBZCxDQUFyQjtBQUVBakIsSUFBQUEsUUFBUSxDQUFDQyxNQUFULGFBQXFCTCxJQUFyQixjQUE2QmMsS0FBN0IsY0FBc0NNLE9BQXRDO0FBQ0Q7QUF4Q1ksQyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0J1xyXG5cclxuLyoqXHJcbiAqIFByb3ZpZGVzIG1ldGhvZHMgdG8gZ2V0LCBzZXQsIG9yIGVkaXQgZGF0YSBpbiBjb29raWVzLlxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIC8qKlxyXG4gICAqIEdldHMgdGhlIHZhbHVlIGZvciBhIHNwZWNpZmllZCBjb29raWUgbmFtZS5cclxuICAgKiBcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBUaGUgbmFtZSBvZiB0aGUgY29va2llIHRvIGdldC5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSB2YWx1ZSBvZiB0aGUgY29va2llIG9yIGFuIGVtcHR5IHN0cmluZyBpZiB0aGUgY29va2llIGRvZXMgbm90IGV4aXN0LlxyXG4gICAqL1xyXG4gIGdldChuYW1lOiBzdHJpbmcpOiBzdHJpbmcge1xyXG5cclxuICAgIGNvbnN0IGNuYW1lOiBzdHJpbmcgPSBgJHtuYW1lfT1gO1xyXG5cclxuICAgIGNvbnN0IGRlY29kZWRDb29raWU6IHN0cmluZyA9IGRlY29kZVVSSUNvbXBvbmVudChkb2N1bWVudC5jb29raWUpO1xyXG5cclxuICAgIGNvbnN0IGNhOiBBcnJheTxzdHJpbmc+ID0gZGVjb2RlZENvb2tpZS5zcGxpdCgnOycpO1xyXG5cclxuICAgIGZvciAobGV0IGMgb2YgY2EpIHtcclxuICAgICAgd2hpbGUgKGMuY2hhckF0KDApID09ICcgJykgYyA9IGMuc3Vic3RyaW5nKDEpO1xyXG5cclxuICAgICAgaWYgKGMuaW5kZXhPZihjbmFtZSkgPT0gMCkgcmV0dXJuIGMuc3Vic3RyaW5nKGNuYW1lLmxlbmd0aCwgYy5sZW5ndGgpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiAnJztcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgKiBTZXRzIGEgbmV3IGNvb2tpZSB3aXRoIHRoZSBkZXNpcmVkIG5hbWUsIHZhbHVlLCBhbmQgZXhwaXJhdGlvbiBkYXRlIGluIGRheXMuXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgVGhlIG5hbWUgb2YgdGhlIGNvb2tpZSB0byBzZXQuXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlIFRoZSB2YWx1ZSBvZiB0aGUgY29va2llIHRvIHNldC5cclxuICAgKiBAcGFyYW0ge251bWJlcn0gW2RheXNUb0V4cGlyZT0zNjVdIFRoZSBudW1iZXIgb2YgZGF5cyB1bnRpbCB0aGlzIGNvb2tpZSBleHBpcmVzLlxyXG4gICAqL1xyXG4gIHNldChuYW1lOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcsIGRheXNUb0V4cGlyZTogbnVtYmVyID0gMzY1KSB7XHJcbiAgICBjb25zdCBkOiBEYXRlID0gbmV3IERhdGUoKTtcclxuXHJcbiAgICBkLnNldFRpbWUoZC5nZXRUaW1lKCkgKyAoZGF5c1RvRXhwaXJlICogMjQgKiA2MCAqIDYwICogMTAwMCkpO1xyXG5cclxuICAgIGNvbnN0IGV4cGlyZXM6IHN0cmluZyA9IGBleHBpcmVzPSR7ZC50b1VUQ1N0cmluZygpfWA7XHJcblxyXG4gICAgZG9jdW1lbnQuY29va2llID0gYCR7bmFtZX09JHt2YWx1ZX07JHtleHBpcmVzfTtwYXRoPS9gO1xyXG4gIH1cclxufSJdfQ==