/**
 * Represents a message sent by the client to the server.
 *
 * This provides structure for messages sent along with metadata that can be helpful to the server.
 */
export default class Message {
    /**
     * The type of message being sent.
     *
     * @property {string}
     */
    type: string;
    /**
     * The actual contents of the message.
     *
     * @property {string}
     */
    contents: string;
    /**
     * The timestamp of when this message was created and sent.
     *
     * @property {number}
     */
    timestamp: number;
    /**
     * The message represented as an arraybuffer.
     *
     * @property {ArrayBuffer}
     */
    buffer: ArrayBuffer;
    /**
     * @param {string} type The type of message that is being sent.
     * @param {string} contents The actual contents of the message.
     */
    constructor(type: string, contents: string);
    /**
     * Prepare this message to be sent by stringifying the contents of it.
     *
     * @returns {string} Returns the stringified version of this message.
     */
    stringify(): string;
    /**
     * Creates an array buffer of the stringified version of the message.
     *
     * @returns {ArrayBuffer} Returns the arraybuffer representation of the message.
     */
    toBuffer(): ArrayBuffer;
}
