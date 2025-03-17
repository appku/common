
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
    }

};

export default Objects;