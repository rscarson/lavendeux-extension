import { test, expect } from 'vitest';
import '../src/functions';

test('myFunction', () => {
    expect(myFunction([{'Integer': 5}])).toEqual({'String': '5'})
});