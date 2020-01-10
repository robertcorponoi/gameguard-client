declare const _default: {
    /**
     * Gets the value for a specified cookie name.
     *
     * @param {string} name The name of the cookie to get.
     *
     * @returns {string} Returns the value of the cookie or an empty string if the cookie does not exist.
     */
    get(name: string): string;
    /**
     * Sets a new cookie with the desired name, value, and expiration date in days.
     *
     * @param {string} name The name of the cookie to set.
     * @param {string} value The value of the cookie to set.
     * @param {number} [daysToExpire=365] The number of days until this cookie expires.
     */
    set(name: string, value: string, daysToExpire?: number): void;
};
/**
 * Provides methods to get, set, or edit data in cookies.
 */
export default _default;
