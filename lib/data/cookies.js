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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kYXRhL2Nvb2tpZXMudHMiXSwibmFtZXMiOlsiZ2V0IiwibmFtZSIsImNuYW1lIiwiZGVjb2RlZENvb2tpZSIsImRlY29kZVVSSUNvbXBvbmVudCIsImRvY3VtZW50IiwiY29va2llIiwiY2EiLCJzcGxpdCIsImMiLCJjaGFyQXQiLCJzdWJzdHJpbmciLCJpbmRleE9mIiwibGVuZ3RoIiwic2V0IiwidmFsdWUiLCJkYXlzVG9FeHBpcmUiLCJkIiwiRGF0ZSIsInNldFRpbWUiLCJnZXRUaW1lIiwiZXhwaXJlcyIsInRvVVRDU3RyaW5nIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUVBOzs7Ozs7OztlQUdlO0FBQ2I7Ozs7Ozs7QUFPQUEsRUFBQUEsR0FSYSxlQVFUQyxJQVJTLEVBUWE7QUFFeEIsUUFBTUMsS0FBYSxhQUFNRCxJQUFOLE1BQW5CO0FBRUEsUUFBTUUsYUFBcUIsR0FBR0Msa0JBQWtCLENBQUNDLFFBQVEsQ0FBQ0MsTUFBVixDQUFoRDtBQUVBLFFBQU1DLEVBQWlCLEdBQUdKLGFBQWEsQ0FBQ0ssS0FBZCxDQUFvQixHQUFwQixDQUExQjtBQU53QjtBQUFBO0FBQUE7O0FBQUE7QUFReEIsMkJBQWNELEVBQWQsOEhBQWtCO0FBQUEsWUFBVEUsQ0FBUzs7QUFDaEIsZUFBT0EsQ0FBQyxDQUFDQyxNQUFGLENBQVMsQ0FBVCxLQUFlLEdBQXRCO0FBQTJCRCxVQUFBQSxDQUFDLEdBQUdBLENBQUMsQ0FBQ0UsU0FBRixDQUFZLENBQVosQ0FBSjtBQUEzQjs7QUFFQSxZQUFJRixDQUFDLENBQUNHLE9BQUYsQ0FBVVYsS0FBVixLQUFvQixDQUF4QixFQUEyQixPQUFPTyxDQUFDLENBQUNFLFNBQUYsQ0FBWVQsS0FBSyxDQUFDVyxNQUFsQixFQUEwQkosQ0FBQyxDQUFDSSxNQUE1QixDQUFQO0FBQzVCO0FBWnVCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBY3hCLFdBQU8sRUFBUDtBQUNELEdBdkJZOztBQXlCYjs7Ozs7OztBQU9BQyxFQUFBQSxHQWhDYSxlQWdDVGIsSUFoQ1MsRUFnQ0tjLEtBaENMLEVBZ0NnRDtBQUFBLFFBQTVCQyxZQUE0Qix1RUFBTCxHQUFLO0FBQzNELFFBQU1DLENBQU8sR0FBRyxJQUFJQyxJQUFKLEVBQWhCO0FBRUFELElBQUFBLENBQUMsQ0FBQ0UsT0FBRixDQUFVRixDQUFDLENBQUNHLE9BQUYsS0FBZUosWUFBWSxHQUFHLEVBQWYsR0FBb0IsRUFBcEIsR0FBeUIsRUFBekIsR0FBOEIsSUFBdkQ7QUFFQSxRQUFNSyxPQUFlLHFCQUFjSixDQUFDLENBQUNLLFdBQUYsRUFBZCxDQUFyQjtBQUVBakIsSUFBQUEsUUFBUSxDQUFDQyxNQUFULGFBQXFCTCxJQUFyQixjQUE2QmMsS0FBN0IsY0FBc0NNLE9BQXRDO0FBQ0Q7QUF4Q1ksQyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0J1xuXG4vKipcbiAqIFByb3ZpZGVzIG1ldGhvZHMgdG8gZ2V0LCBzZXQsIG9yIGVkaXQgZGF0YSBpbiBjb29raWVzLlxuICovXG5leHBvcnQgZGVmYXVsdCB7XG4gIC8qKlxuICAgKiBHZXRzIHRoZSB2YWx1ZSBmb3IgYSBzcGVjaWZpZWQgY29va2llIG5hbWUuXG4gICAqIFxuICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBUaGUgbmFtZSBvZiB0aGUgY29va2llIHRvIGdldC5cbiAgICogXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIHZhbHVlIG9mIHRoZSBjb29raWUgb3IgYW4gZW1wdHkgc3RyaW5nIGlmIHRoZSBjb29raWUgZG9lcyBub3QgZXhpc3QuXG4gICAqL1xuICBnZXQobmFtZTogc3RyaW5nKTogc3RyaW5nIHtcblxuICAgIGNvbnN0IGNuYW1lOiBzdHJpbmcgPSBgJHtuYW1lfT1gO1xuXG4gICAgY29uc3QgZGVjb2RlZENvb2tpZTogc3RyaW5nID0gZGVjb2RlVVJJQ29tcG9uZW50KGRvY3VtZW50LmNvb2tpZSk7XG5cbiAgICBjb25zdCBjYTogQXJyYXk8c3RyaW5nPiA9IGRlY29kZWRDb29raWUuc3BsaXQoJzsnKTtcblxuICAgIGZvciAobGV0IGMgb2YgY2EpIHtcbiAgICAgIHdoaWxlIChjLmNoYXJBdCgwKSA9PSAnICcpIGMgPSBjLnN1YnN0cmluZygxKTtcblxuICAgICAgaWYgKGMuaW5kZXhPZihjbmFtZSkgPT0gMCkgcmV0dXJuIGMuc3Vic3RyaW5nKGNuYW1lLmxlbmd0aCwgYy5sZW5ndGgpO1xuICAgIH1cblxuICAgIHJldHVybiAnJztcbiAgfSxcblxuICAvKipcbiAgICogU2V0cyBhIG5ldyBjb29raWUgd2l0aCB0aGUgZGVzaXJlZCBuYW1lLCB2YWx1ZSwgYW5kIGV4cGlyYXRpb24gZGF0ZSBpbiBkYXlzLlxuICAgKiBcbiAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgVGhlIG5hbWUgb2YgdGhlIGNvb2tpZSB0byBzZXQuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZSBUaGUgdmFsdWUgb2YgdGhlIGNvb2tpZSB0byBzZXQuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbZGF5c1RvRXhwaXJlPTM2NV0gVGhlIG51bWJlciBvZiBkYXlzIHVudGlsIHRoaXMgY29va2llIGV4cGlyZXMuXG4gICAqL1xuICBzZXQobmFtZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nLCBkYXlzVG9FeHBpcmU6IG51bWJlciA9IDM2NSkge1xuICAgIGNvbnN0IGQ6IERhdGUgPSBuZXcgRGF0ZSgpO1xuXG4gICAgZC5zZXRUaW1lKGQuZ2V0VGltZSgpICsgKGRheXNUb0V4cGlyZSAqIDI0ICogNjAgKiA2MCAqIDEwMDApKTtcblxuICAgIGNvbnN0IGV4cGlyZXM6IHN0cmluZyA9IGBleHBpcmVzPSR7ZC50b1VUQ1N0cmluZygpfWA7XG5cbiAgICBkb2N1bWVudC5jb29raWUgPSBgJHtuYW1lfT0ke3ZhbHVlfTske2V4cGlyZXN9O3BhdGg9L2A7XG4gIH1cbn0iXX0=