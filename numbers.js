
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
    }
};

export default Numbers;