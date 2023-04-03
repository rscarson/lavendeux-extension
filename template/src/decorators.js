import { LavendeuxValue } from './lavendeux';

/**
 * Decorator that expresses a value as a string
 *  Usage: <value> @color
 * Can be called from the lavendeux parser
 * It takes in a value object, which will have one of the following properties:
 *  Integer, Float, String
 * 
 * It then returns a string
 * @param {Value} args 
 * @returns {String} result
 */
globalThis.myDecorator = (value) => {
    let input = LavendeuxValue.asInteger(value);
    return `${input}`;
}