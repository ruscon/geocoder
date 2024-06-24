/**
 * Example from https://googlemaps.github.io/url-signing/urlSigner.js
 */
import crypto from 'crypto';

/**
 * Convert from 'web safe' base64 to true base64.
 *
 * @param  {string} safeEncodedString The code you want to translate
 *                                    from a web safe form.
 * @return {string}
 */
function removeWebSafe(safeEncodedString: string): string {
    return safeEncodedString.replace(/-/g, '+').replace(/_/g, '/');
}

/**
 * Convert from true base64 to 'web safe' base64
 *
 * @param  {string} encodedString The code you want to translate to a
 *                                web safe form.
 * @return {string}
 */
function makeWebSafe(encodedString: string): string {
    return encodedString.replace(/\+/g, '-').replace(/\//g, '_');
}

/**
 * Takes a base64 code and decodes it.
 *
 * @param  {string} code The encoded data.
 * @return {Buffer}
 */
function decodeBase64Hash(code: string): Buffer {
    // "new Buffer(...)" is deprecated. Use Buffer.from if it exists.
    return Buffer.from ? Buffer.from(code, 'base64') : new Buffer(code, 'base64');
}

/**
 * Takes a key and signs the data with it.
 *
 * @param  {string} key  Your unique secret key.
 * @param  {string} data The url to sign.
 * @return {string}
 */
function encodeBase64Hash(key: string, data: string): string {
    return crypto.createHmac('sha1', key).update(data).digest('base64');
}

/**
 * Sign a URL using a secret key.
 *
 * @param  {string} path   The url you want to sign.
 * @param  {string} secret Your unique secret key.
 * @param  {Object} query Query object
 * @return {string}
 */
export function urlSign(path: string, query: any, secret: string, ): string {
    const queryString = new URLSearchParams(JSON.stringify(query)).toString();
    const safeSecret = decodeBase64Hash(removeWebSafe(secret)).toString('base64');
    return makeWebSafe(encodeBase64Hash(safeSecret, path + queryString));
}
