import Compare from './compare.js';

describe('.same', () => {
    let vals = [null, undefined, 0, 1, true, false, [], [1, 2, 3], new Date(), 'abc', '', {}, { a: 2 }, { a: 1, b: 2 }];
    it('handles nulls.', () => {
        expect(Compare.same(null, null)).toBe(true);
        for (let x = 0; x < vals.length; x++) {
            if (vals[x] !== null) {
                expect(Compare.same(null, vals[x])).toBe(false);
                expect(Compare.same(vals[x], null)).toBe(false);
            }
        }
    });
    it('handles undefined.', () => {
        expect(Compare.same(undefined, undefined)).toBe(true);
        expect(Compare.same(undefined)).toBe(true);
        expect(Compare.same()).toBe(true);
        for (let x = 0; x < vals.length; x++) {
            if (vals[x] !== undefined) {
                expect(Compare.same(undefined, vals[x])).toBe(false);
                expect(Compare.same(vals[x], undefined)).toBe(false);
            }
        }
    });
    it('handles numbers.', () => {
        expect(Compare.same(1, 1)).toBe(true);
        for (let x = 0; x < vals.length; x++) {
            expect(Compare.same(123, vals[x])).toBe(false);
            expect(Compare.same(vals[x], 123)).toBe(false);
        }
    });
    it('handles booleans.', () => {
        expect(Compare.same(true, true)).toBe(true);
        expect(Compare.same(false, false)).toBe(true);
        for (let x = 0; x < vals.length; x++) {
            if (typeof vals[x] !== 'boolean') {
                expect(Compare.same(true, vals[x])).toBe(false);
                expect(Compare.same(vals[x], true)).toBe(false);
                expect(Compare.same(false, vals[x])).toBe(false);
                expect(Compare.same(vals[x], false)).toBe(false);
            }
        }
    });
    it('handles strings.', () => {
        expect(Compare.same('', '')).toBe(true);
        expect(Compare.same('abc', 'abc')).toBe(true);
        for (let x = 0; x < vals.length; x++) {
            expect(Compare.same('zxy', vals[x])).toBe(false);
            expect(Compare.same(vals[x], 'zxy')).toBe(false);
        }
    });
    it('handles arrays.', () => {
        expect(Compare.same([], [])).toBe(true);
        expect(Compare.same([1, 2, 3], [1, 2, 3])).toBe(true);
        for (let x = 0; x < vals.length; x++) {
            expect(Compare.same([1], vals[x])).toBe(false);
            expect(Compare.same(vals[x], [1])).toBe(false);
        }
    });
    it('handles dates.', () => {
        expect(Compare.same(new Date(2025, 1, 1), new Date(2025, 1, 1))).toBe(true);
        for (let x = 0; x < vals.length; x++) {
            expect(Compare.same(new Date(2025, 1, 1), vals[x])).toBe(false);
            expect(Compare.same(vals[x], new Date(2025, 1, 1))).toBe(false);
        }
    });
    it('handles objects.', () => {
        expect(Compare.same({}, {})).toBe(true);
        expect(Compare.same({ a: 1 }, { a: 1 })).toBe(true);
        for (let x = 0; x < vals.length; x++) {
            expect(Compare.same({ a: 1 }, vals[x])).toBe(false);
            expect(Compare.same(vals[x], { a: 1 })).toBe(false);
        }
    });
});