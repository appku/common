
const Numbers = {
    /**
     * Rounds an energy value to it's nearest .25 value.
     * 
     * If a `null` is passed, a `null` is returned. 
     * If a non-number type is passed, a `NaN` is returned.
     * @param {Number} value - The numeric value to round.
     * @returns {Number}
     */
    roundEnergy(value) {
        if (value === null) {
            return null;
        } else if (typeof value === 'number' && Number.isNaN(value) === false) {
            //round to two decimals
            value = +(Math.round(value + 'e+' + 2) + 'e-' + 2);
            //get nearest 0.25
            return Math.round(value * 4) / 4;
        }
        return NaN;
    },

    /**
     * Returns either a `"+"` or a `"-"` for the given number. If the number is `0` or `null`, a blank is returned.
     * 
     * If a non-number type is passed, a `NaN` is returned.
     * @param {Number} value - The numeric value to evaluate as positive or negative (or neither).
     * @returns {String}
     */
    sign(value) {
        let vtype = typeof value;
        if (vtype === 'object' && typeof value?.toNumber === 'function') {
            //handle specialized numeric frameworks like Decimal.js
            value = value.toNumber();
            vtype = typeof value;
        }
        if (value == 0 || value === null) {
            return '';
        } else if (vtype === 'boolean') {
            value = (value >>> 0);
        } else if (vtype === 'string') {
            value = parseInt(value);
            if (Number.isNaN(value)) {
                return NaN;
            }
        } else if (vtype !== 'number' || Number.isNaN(value)) {
            return NaN;
        }
        if (value > 0) {
            return '+';
        } else {
            return '-';
        }
    }

};

export default Numbers;