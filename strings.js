import pluralize from './pluralize/pluralize.js';

const Strings = {

    /**
     * Returns the english plural form of the given input string.
     * @param {String} input - The value to be pluralized.
     * @returns {String}
     */
    plural(input) {
        return pluralize.plural(input);
    },

    /**
     * Returns the english singular form of the given input string.
     * @param {String} input - The value to be made into it's singular form.
     * @returns {String}
     */
    singular(input) {
        return pluralize.singular(input);
    },

    /**
     * Performs a smart-split operation to split the string using any given separators and trimming whitespace for
     * each value. This allows for mixed-inputs of separate values to be easily processed. 
     * Any empty values are omitted.
     * 
     * @param {String} input - The string to be split.
     * @param {Boolean} [trim=true] - Indicates whitespace should be removed from each split value (default = `true`).
     * @param {...String} [separators] - Spread of seperating strings/characters. Defaults to `",", "\n", ";", "|"`.
     * @returns {Array.<String>}
     */
    ssplit(input, trim = true, ...separators) {
        if (input === null) {
            return null;
        } else if (typeof input !== 'string') {
            throw new Error('Argument for the paramater "input" is not a string or null value type.');
        }
        if (!separators || separators.length === 0) {
            separators = [',', '\n', ';', '|'];
        }
        let results = separators.reduce((a, c, ci) => ci ? a.map(v => v.split(c)).flat() : input.split(c), []);
        if (trim) {
            for (let i = 0; i < results.length; i++) {
                results[i] = results[i].replace(/^\s+/g, '').replace(/\s+$/g, '');
            }
        }
        return results;
    },

    /**
     * Attempts to parse a regular expression literal string, potentially including flags.
     * @param {String|RegExp} input - The regular expression literal string.
     * @returns {RegExp}
     */
    toRegExp: function (input) {
        if (input instanceof RegExp) {
            return input;
        }
        if (typeof input === 'string') {
            let firstSlash = input.indexOf('/');
            let lastSlash = input.lastIndexOf('/');
            let flags = null;
            //check if the regexp is in literal format and may include flags
            if (firstSlash === 0 && lastSlash > -1 && firstSlash !== lastSlash) {
                //looks like a regex string with potential flags
                flags = input.substr(lastSlash + 1);
                //strip slashes.
                input = input.substring(firstSlash + 1, lastSlash);
            }
            if (flags) {
                return new RegExp(input, flags);
            } else {
                return new RegExp(input);
            }
        }
        return null;
    },

    /**
     * Escape a string value using the given method so it can be safely parsed.
     * @param {String} input - The string value to escape.
     * @param {Strings.EscapeMethod|Number} method - The escape method to use.
     * @returns {String}
     */
    escape: function (input, method) {
        if (method == Strings.EscapeMethod.URI) {
            return escape(input);
        } else if (method === Strings.EscapeMethod.REGEXP) {
            //eslint-disable-next-line no-useless-escape
            return input.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
        }
        throw new Error('A valid "method" argument is reguired.');
    },

    /**
     * Checks if the input string matches any one of the given test values.
     * @param {String} input - The string to test for a match.
     * @param {String|String[]|RegExp|RegExp[]} test - The string(s) or RegExp to test the input against.
     * @param {Boolean} [insensitive=false] - If true, the test will be made case-insensitive.
     * @returns {Boolean}
     */
    some: function (input, test, insensitive) {
        if (typeof input === 'undefined') {
            return false;
        } else if (input === null && input === test) {
            return true;
        }
        if (Array.isArray(test) === false) {
            test = [test];
        }
        for (let t of test) {
            if (typeof t === 'string') {
                if (input === t || (insensitive && input.toLowerCase() === t.toLowerCase())) {
                    return true;
                }
            } else if (t instanceof RegExp) {
                if (insensitive && t.ignoreCase === false) {
                    t = new RegExp(t.source, t.flags + 'i');
                }
                return t.test(input);
            }
        }
        return false;
    },

    /**
     * @param {String} input - The input string to convert to a URL-friendly slug.
     * @param {String} [sep="-"] - The seperator string between words. Defaults to a "-".
     * @param {Boolean} [lower=true] - Toggles whether to convert the output slug to lower-case. Defaults to true.
     * @param {Boolean} [camel=false] - Converts camel or VB -case inputs to a friendly slug. Defaults to false.
     * @returns {String}
     */
    slugify: function (input, sep, lower, camel) {
        if (input === null) {
            return null;
        } else if (typeof input !== 'string') {
            throw new Error('Argument for the paramater "input" is not a string or null value type.');
        }
        if (typeof sep === 'undefined') {
            sep = '-';
        } else if (sep === null) {
            sep = '';
        }
        let escSep = Strings.escape(sep, Strings.EscapeMethod.REGEXP);
        //normalize diacritics and remove un-processable characters.
        input = input
            .normalize('NFKD')
            .replace(/[^\w\s.\-_\\/,:;<>|`~!@#$%^&*()[\]]/g, '');
        //handle camel-case inputs
        if (camel) {
            input = input.split('').reduce((pv, cv, index, arr) => {
                if (cv.match(/[A-Z]/) && pv.match(/[^A-Z]$/)) {
                    return pv + sep + cv;
                } else if (cv.match(/[A-Z]/) && pv.match(/[A-Z]/) && arr.length > index + 1 && arr[index + 1].match(/[a-z-]/)) {
                    //current is upper, last was upper, but next is lower (possible tail of uppercase chain)
                    return pv + sep + cv;
                }
                return pv + cv;
            }, '');
        }
        input = input
            .replace(/[\s.\-_\\/,:;<>|`~!@#$%^&*()[\]]+/g, sep) //replace allowed punctuation
            .replace(new RegExp(`^${escSep}*|${escSep}*$`, 'g'), '') //trim ends
            .replace(new RegExp(escSep + '+', 'g'), sep); //collapse dashes
        //make the output lowercase if specified.
        if (typeof lower === 'undefined' || lower) {
            input = input.toLowerCase();
        }
        return input;
    },

    /**
     * Converts an input string to a consistent camel-Case name.
     * @param {String} input - The name to be standardized.
     * @param {Boolean} [pascal=false] - Optional flag that when `true` will always capitalize the first letter.
     * @returns {String}
     */
    camelify: function (input, pascal = false) {
        if (input) {
            const alwaysUpper = /^(GU|UU)?ID$/i;
            if (alwaysUpper.test(input)) {
                return input.toUpperCase();
            }
            //normalize diacritics and remove un-processable characters and split into words.
            let words = input
                .normalize('NFKD')
                .replace(/[^\w\s.\-_\\/,:;<>|`~!@#$%^&*()[]]/g, '')
                .split(/(?<=[a-z0-9])(?=[A-Z])|(?<=[A-Z])(?=[A-Z][a-z0-9])|[^A-Za-z0-9]/g);
            input = words.reduce((pv, cv, i) => {
                if (cv.length) {
                    let uppered = cv.toUpperCase();
                    let lowered = cv.toLowerCase();
                    //if a single word name and uppercase, always just return lowercase, except when a reserved
                    //keyword or only two characters.
                    if ((uppered.length <= 2 && uppered === cv) || alwaysUpper.test(cv)) {
                        return pv + uppered;
                    }
                    if (!pv) {
                        return pv + lowered;
                    } else {
                        return pv + uppered.substring(0, 1) + lowered.substring(1);
                    }
                }
                return pv + cv;
            }, '');
            if (pascal) {
                return input[0].toUpperCase() + input.substring(1);
            }
        }
        return input;
    },

    /**
     * Truncates a given string up to the max. length, and adds an ellipsis if necessary.
     * @param {String} input - The string to (potentially) truncate.
     * @param {Number} max - The max. length of the input string allowed before it is truncated.
     * @returns {String}
     */
    truncate: function (input, max) {
        return (input.length < max) ? input : input.substring(0, max).replace(/.{3}$/gi, '...');
    },

    /**
     * Truncates a given string from the tail-end (reverse truncate) up to the max. length, and adds an ellipsis if
     * necessary.
     * @param {String} input - The string to (potentially) truncate.
     * @param {Number} max - The max. length of the input string allowed before it is truncated.
     * @returns {String}
     */
    tail: function (input, max) {
        return (input.length < max) ? input : input.substring(input.length - max).replace(/^.{3}/gi, '...');
    },

    /**
     * Indents all or specific lines of text in a string.
     * @param {String} input - The string to indent.
     * @param {Number} [start] - The line index to start indenting.
     * @param {Number} [end] - The line index to stop indenting after.
     * @param {String} [indent="    "] - The indentation to use on each matched line. 
     * @returns {String}
     */
    indent: function (input, start, end, indent = '    ') {
        if (typeof input === 'string') {
            let hasStart = !(typeof start === 'undefined' || start === null);
            let hasEnd = !(typeof end === 'undefined' || end === null);
            let counter = 0;
            return input.replace(/^/gm, (_match, _index, _str) => {
                let output = '';
                if (hasStart === false || (hasStart && counter >= start)) {
                    if (hasEnd === false || (hasEnd && counter <= end)) {
                        output = indent;
                    }
                }
                counter++;
                return output;
            });
        }
        return input;
    },

    /**
     * Converts a string to title case, where each word and segment has the first character capitalized.
     * @param {String} input - The string to convert to title-case.
     * @returns {String}
     * @example
     * ```js
     * Strings.title('this IS_a.bunch-OF words.');
     * //"This Is_A.Bunch-Of Words"
     * ```
     */
    title: function (input) {
        return input.toLowerCase().replace(/[^\s_'-]+/g,
            (word) => {
                return word.replace(/^./, (firstLetter) => firstLetter.toUpperCase());
            });
    }

};

/**
 * @enum {Number}
 * @readonly
 */
Strings.EscapeMethod = {
    URI: 0,
    REGEXP: 1
};

/** @exports Strings */
export default Strings;