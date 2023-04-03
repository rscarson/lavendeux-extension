import { test, expect, describe } from 'vitest';
import { LavendeuxInteger, LavendeuxFloat, LavendeuxString, LavendeuxBoolean, LavendeuxArray, LavendeuxValue } from '../src/lavendeux';

describe('LavendeuxInteger', () => {
    test('constructor', () => {
        expect((new LavendeuxInteger(38.3))).toStrictEqual((new LavendeuxInteger(38)));
    });
    
    test('toFloat', () => {
        expect((new LavendeuxInteger(38)).toFloat()).toStrictEqual(38.0);
    });
    
    test('toString', () => {
        expect((new LavendeuxInteger(38)).toString()).toStrictEqual("38");
    });
    
    test('toBoolean', () => {
        expect((new LavendeuxInteger(38)).toBoolean()).toStrictEqual(true);
        expect((new LavendeuxInteger(0)).toBoolean()).toStrictEqual(false);
    });
    
    test('toValue', () => {
        expect((new LavendeuxInteger(38)).toValue()).toStrictEqual({"Integer": 38});
    });
    
    test('fromValue', () => {
        expect(LavendeuxInteger.fromValue({"Integer": 38})).toStrictEqual(new LavendeuxInteger(38));
        expect(LavendeuxInteger.fromValue({"Float": 38.4})).toStrictEqual(new LavendeuxInteger(38));
        expect(() => LavendeuxInteger.fromValue({"String": "foo"})).toThrowError();
    });
});

describe('LavendeuxFloat', () => {
    test('constructor', () => {
        expect((new LavendeuxFloat(38))).toStrictEqual((new LavendeuxFloat(38.0)));
    });
    
    test('toInteger', () => {
        expect((new LavendeuxFloat(38.0)).toInteger()).toStrictEqual(38);
    });
    
    test('toString', () => {
        expect((new LavendeuxFloat(38.1)).toString()).toStrictEqual("38.1");
    });
    
    test('toBoolean', () => {
        expect((new LavendeuxFloat(38.0)).toBoolean()).toStrictEqual(true);
        expect((new LavendeuxFloat(0.0)).toBoolean()).toStrictEqual(false);
    });
    
    test('toValue', () => {
        expect((new LavendeuxFloat(38)).toValue()).toStrictEqual({"Float": 38.0});
    });
    
    test('fromValue', () => {
        expect(LavendeuxFloat.fromValue({"Integer": 38})).toStrictEqual(new LavendeuxFloat(38.0));
        expect(LavendeuxFloat.fromValue({"Float": 38.4})).toStrictEqual(new LavendeuxFloat(38.4));
        expect(() => LavendeuxFloat.fromValue({"String": "foo"})).toThrowError();
    });
});

describe('LavendeuxString', () => {
    test('constructor', () => {
        expect(`${new LavendeuxString(38)}`).toStrictEqual('38');
    });

    test('toBoolean', () => {
        expect((new LavendeuxString("test")).toBoolean()).toStrictEqual(true);
        expect((new LavendeuxString("")).toBoolean()).toStrictEqual(false);
    });
    
    test('toValue', () => {
        expect((new LavendeuxString(38)).toValue()).toStrictEqual({"String": "38"});
    });
    
    test('fromValue', () => {
        expect(LavendeuxString.fromValue({"Integer": 38})).toStrictEqual(new LavendeuxString("38"));
        expect(LavendeuxString.fromValue({"Float": 38.4})).toStrictEqual(new LavendeuxString("38.4"));
        expect(LavendeuxString.fromValue({"String": "test"})).toStrictEqual(new LavendeuxString("test"));
        expect(LavendeuxString.fromValue({"Boolean": true})).toStrictEqual(new LavendeuxString("true"));
    });
});

describe('LavendeuxBoolean', () => {
    test('constructor', () => {
        expect(new LavendeuxBoolean(38)).toStrictEqual(new LavendeuxBoolean(true));
    });

    test('toString', () => {
        expect((new LavendeuxBoolean(true)).toString()).toStrictEqual("true");
    });
    
    test('toValue', () => {
        expect((new LavendeuxBoolean(38)).toValue()).toStrictEqual({"Boolean": true});
    });
    
    test('fromValue', () => {
        expect(LavendeuxBoolean.fromValue({"Integer": 38})).toStrictEqual(new LavendeuxBoolean(true));
        expect(LavendeuxBoolean.fromValue({"Float": 0.0})).toStrictEqual(new LavendeuxBoolean(false));
        expect(LavendeuxBoolean.fromValue({"String": "test"})).toStrictEqual(new LavendeuxBoolean(true));
        expect(LavendeuxBoolean.fromValue({"Boolean": true})).toStrictEqual(new LavendeuxBoolean(true));
    });
});

describe('LavendeuxArray', () => {
    test('constructor', () => {
        expect(new LavendeuxArray(38)).toStrictEqual(new LavendeuxArray([38]));
        expect(new LavendeuxArray([1, 'test'])).toStrictEqual(new LavendeuxArray([1, 'test']));
    });

    test('toBoolean', () => {
        expect((new LavendeuxArray("test")).toBoolean()).toStrictEqual(true);
        expect((new LavendeuxArray([])).toBoolean()).toStrictEqual(false);
    });

    test('toString', () => {
        expect((new LavendeuxArray([1, 2])).toString()).toStrictEqual("[1,2]");
    });
    
    test('toValue', () => {
        expect((new LavendeuxArray(new LavendeuxInteger(5))).toValue()).toEqual({"Array": [
            {"Integer": 5}
        ]});
    });
    
    test('fromValue', () => {
        expect(LavendeuxArray.fromValue({"Array": [{"Integer": 38}]}).toString()).toStrictEqual('[38]');
    });
});

describe('LavendeuxValue', () => {
    test('constructor', () => {
        expect(new LavendeuxValue({"Integer": 3})).toBeInstanceOf(LavendeuxInteger);
        expect(new LavendeuxValue({"Float": 3})).toBeInstanceOf(LavendeuxFloat);
        expect(new LavendeuxValue({"Boolean": 3})).toBeInstanceOf(LavendeuxBoolean);
        expect(new LavendeuxValue({"String": 3})).toBeInstanceOf(LavendeuxString);
        expect(new LavendeuxValue({"Array": [{"Integer": 3}]})).toBeInstanceOf(LavendeuxArray);
    });

    test('return', () => {
        expect(LavendeuxValue.returnInteger(5)).toEqual({'Integer': 5});
        expect(LavendeuxValue.returnFloat(5)).toEqual({'Float': 5.0});
        expect(LavendeuxValue.returnBoolean(5)).toEqual({'Boolean': true});
        expect(LavendeuxValue.returnString(5)).toEqual({'String': '5'});
        expect(LavendeuxValue.returnArray(
            new LavendeuxInteger(5)
        )).toEqual({'Array': [{'Integer': 5}]});
    })
});