import { test, expect } from 'vitest';
import '../src/decorators';

test('myDecorator', () => {
    expect(myDecorator({'Integer': 5})).toStrictEqual('5');
});