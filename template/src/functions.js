import { LavendeuxValue } from './lavendeux';

/**
 * Function that takes in an array of values and returns a value
 * Can be called from the lavendeux parser
 * It takes in an array of value objects, which will have one of the following properties:
 *  Integer, Float, String
 * 
 * It then returns a value object
 * @param {Value} args 
 * @returns {Value} result
 */
globalThis.myFunction = (args, _state) => {
    if (args.length != 1) {
        throw new Error("myFunction(n): expected 1 argument");
    }

    let inputValue = LavendeuxValue.asInteger(args[0]);

    return LavendeuxValue.returnString(inputValue.toString());
}