import util from 'util';

const Compare = {

    /**
     * Returns `true` or `false` if the two values are essentially equal, specially accounting for `null`, 
     * `undefined`, `Date`, Array, and object values.
     * 
     * If the values are dates, their ISO string equivalent is compared.
     * If the values are Arrays, their inner values are compared.
     * If the value is any other object, they are deeply compared (see: `util.isDeepStrictEqual`).
     * @param {*} source - The left comparative value.
     * @param {*} target - The right comparative value.
     * @returns {Boolean}
     */
    same(source, target) {
        if (source === null && target === null) {
            return true;
        } else if (source === target) { //we have strict equality already, return true!
            return true;
        } else if (source instanceof Date && target instanceof Date) {
            return source.toISOString() === target.toISOString();
        } else if (source?.constructor?.name === 'Moment') {
            //support moment dates
            if (target?.constructor?.name === 'Moment' || target instanceof Date) {
                return source.valueOf() === target.valueOf();
            }
        } else if (typeof source?.toNumber === 'function') {
            //support Decimal type numbers
            if (typeof target?.toNumber === 'function' || typeof target === 'number') {
                return source == target;
            }
        } else if (typeof source === 'object' && typeof target === 'object') {
            return util.isDeepStrictEqual(source, target);
        }
        return false;
    }

};

/** @exports Compare */
export default Compare;