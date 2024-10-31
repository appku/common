import Numbers from './numbers.js';

describe('.roundEnergy', () => {
    it('handles nulls.', () => {
        expect(Numbers.roundEnergy(null)).toBeNull();
    });
    it('non numbers return NaN if not parsable.', () => {
        expect(Numbers.roundEnergy('hi')).toBeNaN();
        expect(Numbers.roundEnergy(true)).toBeNaN();
        expect(Numbers.roundEnergy(false)).toBeNaN();
        expect(Numbers.roundEnergy(new Date())).toBeNaN();
    });
    it('properly rounds floating point values.', () => {
        for (let i = -100; i < 100; i += 0.12345) {
            let intv = Math.trunc(i);
            let decr = i - intv;
            let decv = Math.round(decr * 4) / 4;
            expect(Numbers.roundEnergy(i)).toBe(intv + decv);
        }
        for (let i = -100; i < 100; i += 0.25) { //should always be the same
            expect(Numbers.roundEnergy(i)).toBe(i);
        }
        //spot checks
        expect(Numbers.roundEnergy(12.12)).toBe(12);
        expect(Numbers.roundEnergy(59.125)).toBe(59.25);
        expect(Numbers.roundEnergy(12.37)).toBe(12.25);
        expect(Numbers.roundEnergy(59.375)).toBe(59.5);
        expect(Numbers.roundEnergy(12.62)).toBe(12.5);
        expect(Numbers.roundEnergy(59.625)).toBe(59.75);
        expect(Numbers.roundEnergy(12.87)).toBe(12.75);
        expect(Numbers.roundEnergy(59.875)).toBe(60);
    });
    it('does not affect integer values.', () => {
        for (let i = -1000; i < 10000; i++) {
            expect(Numbers.roundEnergy(i)).toBe(i);
        }
    });
});