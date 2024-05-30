const assert = require('assert');
const {describe, test} = require('node:test');

const Calculator = require('../src/calculator');

// TODO: write your test cases here to kill mutants

describe('getting error from Calculator main', () => {
    test('if month1 is invalid', () => {
        assert.throws(() => Calculator.main(0, 1, 1, 1, 1), (err) => err instanceof Error && err.message === "invalid month1");
        assert.throws(() => Calculator.main(13, 1, 1, 1, 1), (err) => err instanceof Error && err.message === "invalid month1");
    });

    test('if month2 is invalid', () => {
        assert.throws(() => Calculator.main(1, 1, 0, 1, 1), (err) => err instanceof Error && err.message === "invalid month2");
        assert.throws(() => Calculator.main(1, 1, 13, 1, 1), (err) => err instanceof Error && err.message === "invalid month2");
    });

    test('if day1 is invalid', () => {
        assert.throws(() => Calculator.main(1, 0, 1, 1, 1), (err) => err instanceof Error && err.message === "invalid day1");
        assert.throws(() => Calculator.main(1, 32, 1, 1, 1), (err) => err instanceof Error && err.message === "invalid day1");
    });

    test('if day2 is invalid', () => {
        assert.throws(() => Calculator.main(1, 1, 1, 0, 1), (err) => err instanceof Error && err.message === "invalid day2");
        assert.throws(() => Calculator.main(1, 1, 1, 32, 1), (err) => err instanceof Error && err.message === "invalid day2");
    });

    test('if year is invalid', () => {
        assert.throws(() => Calculator.main(1, 1, 1, 1, 0), (err) => err instanceof Error && err.message === "invalid year");
        assert.throws(() => Calculator.main(1, 1, 1, 1, 10001), (err) => err instanceof Error && err.message === "invalid year");
    });

    test('if two months are equal and day1 is greater than day2', () => {
        assert.throws(() => Calculator.main(1, 2, 1, 1, 1), (err) => err instanceof Error && err.message === "day1 must be less than day2 if month1 is equal to month2");
    });

    test('if month1 is greater than month2', () => {
        assert.throws(() => Calculator.main(2, 1, 1, 1, 1), (err) => err instanceof Error && err.message === "month1 must be less than month2");
    });
});

describe('running successfully', () => {
    test('boundary values', () => {
        assert.strictEqual(Calculator.main(12, 31, 12, 31, 10000), 0);
        assert.strictEqual(Calculator.main(1, 2, 2, 1, 1), 30);
    });

    test('leap year', () => {
        assert.strictEqual(Calculator.main(2, 1, 3, 1, 1), 28);
        assert.strictEqual(Calculator.main(2, 1, 3, 1, 4), 29);
        assert.strictEqual(Calculator.main(2, 1, 3, 1, 100), 28);
        assert.strictEqual(Calculator.main(2, 1, 3, 1, 400), 29);
    });

    test('for loop', () => {
        assert.strictEqual(Calculator.main(1, 1, 12, 31, 1), 364);
    });
});