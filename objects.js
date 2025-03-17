
const Objects = {
    /**
     * Converts an object's keys from snake_case to camelCase recursively. Accepts an array of objects or single
     * object.
     * @param {Array|Object} obj - The object to convert keys to camelCase.
     * @returns {Array|Object}
     */
    toCamelCase: function (obj) {
        if (Array.isArray(obj)) {
            return obj.map(v => Objects.toCamelCase(v));
        } else if (obj !== null && obj.constructor === Object) {
            return Object.keys(obj).reduce((result, key) => {
                const camelCaseKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
                result[camelCaseKey] = Objects.toCamelCase(obj[key]);
                return result;
            }, {});
        }
        return obj;
    },

    /**
     * Converts an object's keys from camelCase to snake_case recursively. Accepts an array of objects or single
     * object.
     * @param {Array|Object} obj - The object to convert keys to snake_case.
     * @returns {Array|Object}
     */
    toSnakeCase: function (obj) {
        if (Array.isArray(obj)) {
            return obj.map(v => Objects.toSnakeCase(v));
        } else if (obj !== null && obj.constructor === Object) {
            return Object.keys(obj).reduce((result, key) => {
                const snakeCaseKey = key.replace(/([A-Z])/g, '_$1').toLowerCase();
                result[snakeCaseKey] = Objects.toSnakeCase(obj[key]);
                return result;
            }, {});
        }
        return obj;
    },

    /**
     * Flattens a recursive object.
     * @param {Object} obj - The object to flatten.
     * @param {String} [separator='.'] - The separator for the keys.
     * @param {String} [prefix=''] - The prefix for the keys.
     * @param {Object} [result={}] - The result object.
     * @returns {Object} - The flattened object.
     */
    flatten: function (obj, separator = '.', prefix = '', result) {
        if (obj === null || typeof obj !== 'object') {
            if (typeof result !== 'undefined') {
                return result;
            }
            return obj;
        }
        result = result || {};
        for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                const value = obj[key];
                let newKey = prefix ? `${prefix}${separator}${key}` : key;
                if (separator === '' || separator === null) { //no separator, make camelCase-like
                    newKey = prefix ? `${prefix}${key.substring(0, 1).toUpperCase() + key.substring(1)}` : key;
                }
                if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
                    Objects.flatten(value, separator, newKey, result);
                } else {
                    result[newKey] = value;
                }
            }
        }
        return result;
    }
};

export default Objects;