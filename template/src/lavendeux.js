/**
 * A Lavendeux integer value
 */
export class LavendeuxInteger extends Number {
    constructor(value) {
        super(Math.round(value));
    }

    /**
     * Cooerce to a floating point value
     * @returns {float} result
     */
    toFloat() { return 1.0 * this; }
    
    /**
     * Cooerce to a string value
     * @returns {string} result
     */
    toString(base) { return super.toString(base); }

    /**
     * Cooerce to a boolean value
     * @returns {boolean} result
     */
    toBoolean() { return (this!=0); }

    /**
     * Convert to a lavendeux value that can be returned to the parser
     * @returns {Object} result
     */
    toValue() { return {"Integer": 1*this}; }

    /**
     * Instantiate the value from a Lavendeux function argument
     * Throws an exception if the value could not be cooerced to integer
     * @param {Value} value 
     * @returns {LavendeuxInteger} result
     */
    static fromValue(value) {
        let _value = value.Integer !== undefined ? value.Integer : value.Float;
        if (_value === undefined) throw new Error("expected an integer or a float");

        return new LavendeuxInteger(_value);
    }
}

/**
 * A Lavendeux float value
 */
export class LavendeuxFloat extends Number {
    constructor(value) {
        super(1.0 * value);
    }

    /**
     * Cooerce to a integer value
     * @returns {float} result
     */
    toInteger() { return Math.round(this); }
    
    /**
     * Cooerce to a string value
     * @returns {string} result
     */
    toString(base) { return super.toString(base); }

    /**
     * Cooerce to a boolean value
     * @returns {boolean} result
     */
    toBoolean() { return (this!=0.0); }

    /**
     * Convert to a lavendeux value that can be returned to the parser
     * @returns {Object} result
     */
    toValue() { return {"Float": 1.0*this}; }

    /**
     * Instantiate the value from a Lavendeux function argument
     * Throws an exception if the value could not be cooerced to float
     * @param {Value} value 
     * @returns {LavendeuxFloat} result
     */
    static fromValue(value) {
        let _value = value.Float !== undefined ? value.Float : value.Integer;
        if (_value === undefined) throw new Error("expected an integer or a float");

        return new LavendeuxFloat(_value);
    }
}

/**
 * A Lavendeux string value
 */
export class LavendeuxString extends String {
    constructor(value) {
        super(`${value}`);
    }

    /**
     * Cooerce to a boolean value
     * @returns {boolean} result
     */
    toBoolean() { return `${this}`.length != 0; }

    /**
     * Convert to a lavendeux value that can be returned to the parser
     * @returns {Object} result
     */
    toValue() { return {"String": `${this}`}; }

    /**
     * Instantiate the value from a Lavendeux function argument
     * Throws an exception if the value could not be cooerced to float
     * @param {Value} value 
     * @returns {LavendeuxString} result
     */
    static fromValue(value) {
        return new LavendeuxString(`${Object.values(value)[0]}`);
    }
}

/**
 * A Lavendeux boolean value
 */
export class LavendeuxBoolean extends Boolean {
    constructor(value) {
        super(value);
    }

    /**
     * Convert to a lavendeux value that can be returned to the parser
     * @returns {Object} result
     */
    toValue() { return {"Boolean": this?true:false}; }

    /**
     * Instantiate the value from a Lavendeux function argument
     * @param {Value} value 
     * @returns {LavendeuxString} result
     */
    static fromValue(value) {
        return new LavendeuxBoolean(!!Object.values(value)[0]);
    }
}

/**
 * A Lavendeux array value
 */
export class LavendeuxArray extends Array {
    constructor(value) {
        super();
        let _value = Array.isArray(value) ? value : [value];
        this.push(..._value);
    }

    /**
     * Cooerce to a boolean value
     * @returns {boolean} result
     */
    toBoolean() { return this.length>0; }

    /**
     * Cooerce to a boolean value
     * @returns {boolean} result
     */
    toString() { return `[${super.toString()}]`; }

    /**
     * Convert to a lavendeux value that can be returned to the parser
     * @returns {Object} result
     */
    toValue() { return {"Array": this.map(e => e.toValue()) }; }

    /**
     * Instantiate the value from a Lavendeux function argument
     * @param {Value} value 
     * @returns {LavendeuxString} result
     */
    static fromValue(value) {
        let root = Object.values(value)[0];
        return new LavendeuxArray(root.map(e => new LavendeuxValue(e)));
    }
}

/**
 * A value passed from Lavendeux
 */
export class LavendeuxValue {
    /**
     * Build a new value from a Lavendeux function argument
     * @param {Object} value 
     * @returns Exported value
     */
    constructor(value) {
        switch(Object.keys(value)[0]) {
            case 'Integer': return LavendeuxValue.asInteger(value);
            case 'Float': return LavendeuxValue.asFloat(value);
            case 'Boolean': return LavendeuxValue.asBoolean(value);
            case 'String': return LavendeuxValue.asString(value);
            case 'Array': return LavendeuxValue.asArray(value);

            default: throw new Error(`Unrecognized type ${Object.keys(value)[0]}. Is this template out of date?`);
        }
    }

    /**
     * Retrieve the value as an integer
     * Throws an exception if the value is not numeric
     * @param {Object} value 
     * @returns An integer value
     */
    static asInteger(value) {
        return LavendeuxInteger.fromValue(value);
    }

    /**
     * Retrieve the value as a float
     * Throws an exception if the value is not numeric
     * @param {Object} value 
     * @returns A float value
     */
    static asFloat(value) {
        return LavendeuxFloat.fromValue(value);
    }

    /**
     * Retrieve the value as a boolean
     * @param {Object} value 
     * @returns A boolean value
     */
    static asBoolean(value) {
        return LavendeuxBoolean.fromValue(value);
    }

    /**
     * Retrieve the value as a string
     * @param {Object} value 
     * @returns A string value
     */
    static asString(value) {
        return LavendeuxString.fromValue(value);
    }

    /**
     * Retrieve the value as an array
     * @param {Object} value 
     * @returns An array value
     */
    static asArray(value) {
        return LavendeuxArray.fromValue(value);
    }

    static returnInteger(value) {
        return new LavendeuxInteger(value).toValue();
    }

    static returnFloat(value) {
        return new LavendeuxFloat(value).toValue();
    }

    static returnString(value) {
        return new LavendeuxString(value).toValue();
    }

    static returnBoolean(value) {
        return new LavendeuxBoolean(value).toValue();
    }

    static returnArray(value) {
        return new LavendeuxArray(value).toValue();
    }
}