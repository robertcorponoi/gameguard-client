'use strict'

/**
 * Provides methods to get, set, or edit data in cookies.
 */
export default {
  /**
   * Gets the value for a specified cookie name.
   * 
   * @param {string} name The name of the cookie to get.
   * 
   * @returns {string} Returns the value of the cookie or an empty string if the cookie does not exist.
   */
  get(name: string): string {

    const cname: string = `${name}=`;

    const decodedCookie: string = decodeURIComponent(document.cookie);

    const ca: Array<string> = decodedCookie.split(';');

    for (let c of ca) {
      while (c.charAt(0) == ' ') c = c.substring(1);

      if (c.indexOf(cname) == 0) return c.substring(cname.length, c.length);
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
  set(name: string, value: string, daysToExpire: number = 365) {
    const d: Date = new Date();

    d.setTime(d.getTime() + (daysToExpire * 24 * 60 * 60 * 1000));

    const expires: string = `expires=${d.toUTCString()}`;

    document.cookie = `${name}=${value};${expires};path=/`;
  }
}