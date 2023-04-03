import { test, expect } from 'vitest';
import '../src/index';

test('extension', () => {
    expect(Object.keys(extension())).toStrictEqual([
        'name', 'author', 'version', 'functions', 'decorators'
    ]);
});