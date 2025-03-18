import Objects from './objects';

describe('.toCamelCase', () => {
    it('converts object keys from snake_case to camelCase.', () => {
        const input = {
            first_key: 'value1',
            second_key: 'value2',
            nested_object: {
                nested_key: 'nestedValue'
            }
        };
        const expectedOutput = {
            firstKey: 'value1',
            secondKey: 'value2',
            nestedObject: {
                nestedKey: 'nestedValue'
            }
        };
        expect(Objects.toCamelCase(input)).toEqual(expectedOutput);
    });
    it('converts object keys from snake_case to camelCase but retains always-caps words if non-first word in key.', () => {
        const input = {
            first_id: 'value1',
            second_http: 'value2',
            ftp: {
                nested_key: 'nestedValue',
                some_id: 133,
                id_some: 323
            }
        };
        const expectedOutput = {
            firstID: 'value1',
            secondHTTP: 'value2',
            ftp: {
                nestedKey: 'nestedValue',
                someID: 133,
                idSome: 323
            }
        };
        expect(Objects.toCamelCase(input)).toEqual(expectedOutput);
    });
    it('converts array of objects keys from snake_case to camelCase.', () => {
        const input = [
            { first_key: 'value1' },
            { second_key: 'value2' }
        ];
        const expectedOutput = [
            { firstKey: 'value1' },
            { secondKey: 'value2' }
        ];
        expect(Objects.toCamelCase(input)).toEqual(expectedOutput);
    });
    it('returns null if input is null.', () => {
        expect(Objects.toCamelCase(null)).toBeNull();
    });
    it('returns the same value if input is not an object or array.', () => {
        expect(Objects.toCamelCase('string')).toBe('string');
        expect(Objects.toCamelCase(123)).toBe(123);
        expect(Objects.toCamelCase(true)).toBe(true);
    });
    it('handles nested arrays and objects.', () => {
        const input = {
            first_key: 'value1',
            nested_array: [
                { second_key: 'value2' },
                { third_key: 'value3' }
            ],
            nested_object: {
                fourth_key: 'value4',
                another_nested_object: {
                    fifth_key: 'value5'
                }
            }
        };
        const expectedOutput = {
            firstKey: 'value1',
            nestedArray: [
                { secondKey: 'value2' },
                { thirdKey: 'value3' }
            ],
            nestedObject: {
                fourthKey: 'value4',
                anotherNestedObject: {
                    fifthKey: 'value5'
                }
            }
        };
        expect(Objects.toCamelCase(input)).toEqual(expectedOutput);
    });
});

describe('.toSnakeCase', () => {
    it('converts object keys from camelCase to snake_case.', () => {
        const input = {
            firstKey: 'value1',
            secondKey: 'value2',
            nestedObject: {
                nestedKey: 'nestedValue'
            }
        };
        const expectedOutput = {
            first_key: 'value1',
            second_key: 'value2',
            nested_object: {
                nested_key: 'nestedValue'
            }
        };
        expect(Objects.toSnakeCase(input)).toEqual(expectedOutput);
    });
    it('converts array of objects keys from camelCase to snake_case.', () => {
        const input = [
            { firstKey: 'value1' },
            { secondKey: 'value2' }
        ];
        const expectedOutput = [
            { first_key: 'value1' },
            { second_key: 'value2' }
        ];
        expect(Objects.toSnakeCase(input)).toEqual(expectedOutput);
    });
    it('returns null if input is null.', () => {
        expect(Objects.toSnakeCase(null)).toBeNull();
    });
    it('returns the same value if input is not an object or array.', () => {
        expect(Objects.toSnakeCase('string')).toBe('string');
        expect(Objects.toSnakeCase(123)).toBe(123);
        expect(Objects.toSnakeCase(true)).toBe(true);
    });
    it('handles nested arrays and objects.', () => {
        const input = {
            firstKey: 'value1',
            nestedArray: [
                { secondKey: 'value2' },
                { thirdKey: 'value3' }
            ],
            nestedObject: {
                fourthKey: 'value4',
                anotherNestedObject: {
                    fifthKey: 'value5'
                }
            }
        };
        const expectedOutput = {
            first_key: 'value1',
            nested_array: [
                { second_key: 'value2' },
                { third_key: 'value3' }
            ],
            nested_object: {
                fourth_key: 'value4',
                another_nested_object: {
                    fifth_key: 'value5'
                }
            }
        };
        expect(Objects.toSnakeCase(input)).toEqual(expectedOutput);
    });
});

describe('.isLiteral', () => {
    it('returns true when object is an object literal.', () => {
        expect(Objects.isLiteral({})).toEqual(true);
        expect(Objects.isLiteral(Object.create({}))).toEqual(true);
        expect(Objects.isLiteral(Object.create(null))).toEqual(true);
        expect(Objects.isLiteral(new Object())).toEqual(true);
    });
    it('returns true when object is not an object literal.', () => {
        expect(Objects.isLiteral(new Date())).toEqual(false);
        expect(Objects.isLiteral([{}])).toEqual(false);
        expect(Objects.isLiteral(null)).toEqual(false);
        expect(Objects.isLiteral(undefined)).toEqual(false);
    });
});

describe('.flatten', () => {
    it('flattens a simple object.', () => {
        const input = {
            a: 1,
            b: 2,
            c: 3
        };
        const expectedOutput = {
            a: 1,
            b: 2,
            c: 3
        };
        expect(Objects.flatten(input)).toEqual(expectedOutput);
    });
    it('flattens a nested object.', () => {
        const input = {
            a: 1,
            b: {
                c: 2,
                d: {
                    e: 3
                }
            }
        };
        const expectedOutput = {
            'a': 1,
            'b.c': 2,
            'b.d.e': 3
        };
        expect(Objects.flatten(input)).toEqual(expectedOutput);
    });
    it('flattens an object with arrays.', () => {
        const input = {
            a: 1,
            b: [2, 3, { c: 4 }]
        };
        const expectedOutput = {
            'a': 1,
            'b': [2, 3, { c: 4 }]
        };
        expect(Objects.flatten(input)).toEqual(expectedOutput);
    });
    it('flattens an object with other non-array, non-object, values.', () => {
        let h = new Date();
        const input = {
            a: 1,
            b: [2, 3, { c: 4 }],
            c: true,
            d: 'hello world',
            e: {
                f: null,
                g: undefined,
                h: h
            }
        };
        const expectedOutput = {
            a: 1,
            b: [2, 3, { c: 4 }],
            c: true,
            d: 'hello world',
            'e.f': null,
            'e.g': undefined,
            'e.h': h
        };
        expect(Objects.flatten(input)).toEqual(expectedOutput);
    });
    it('flattens an object with a custom separator.', () => {
        const input = {
            a: 1,
            b: {
                c: 2,
                d: {
                    e: 3
                }
            }
        };
        const expectedOutput = {
            'a': 1,
            'b-c': 2,
            'b-d-e': 3
        };
        expect(Objects.flatten(input, { separator: '-' })).toEqual(expectedOutput);
    });
    it('flattens an object with a blank separator to camelCase.', () => {
        const input = {
            a: 1,
            b: {
                comma: 2,
                dongle: {
                    elephant: 3
                }
            }
        };
        const expectedOutput = {
            'a': 1,
            'bComma': 2,
            'bDongleElephant': 3
        };
        expect(Objects.flatten(input, { separator: '' })).toEqual(expectedOutput);
    });
    it('flattens an object with a blank separator to camelCase handling words that are always in caps.', () => {
        const input = {
            a: 1,
            b: {
                id: 21,
                dongle: {
                    http: 3
                }
            },
            id: 'hi'
        };
        const expectedOutput = {
            a: 1,
            bID: 21,
            bDongleHTTP: 3,
            id: 'hi'
        };
        expect(Objects.flatten(input, { separator: '' })).toEqual(expectedOutput);
    });
    it('flattens an object, removing any excised keys', () => {
        const input = {
            a: 1,
            dongle: {
                test: 1
            },
            b: {
                id: 21,
                dongle: {
                    http: 3
                }
            },
            id: 'hi'
        };
        const expectedOutput = {
            a: 1,
            bID: 21,
            id: 'hi'
        };
        expect(Objects.flatten(input, { separator: '', excise: ['dongle'] })).toEqual(expectedOutput);
    });
    it('flattens an object with a prefix.', () => {
        const input = {
            a: 1,
            b: {
                c: 2
            }
        };
        const expectedOutput = {
            'prefix.a': 1,
            'prefix.b.c': 2
        };
        expect(Objects.flatten(input, '.', 'prefix')).toEqual(expectedOutput);
    });
    it('returns an empty object if input is an empty object.', () => {
        const input = {};
        const expectedOutput = {};
        expect(Objects.flatten(input)).toEqual(expectedOutput);
    });
    it('returns a null if input is null.', () => {
        expect(Objects.flatten(null)).toBeNull();
    });
    it('returns a undefined if input is undefined.', () => {
        expect(Objects.flatten(undefined)).toBeUndefined();
    });
    it('returns the same value if input is not an object.', () => {
        expect(Objects.flatten('string')).toBe('string');
        expect(Objects.flatten(123)).toBe(123);
        expect(Objects.flatten(true)).toBe(true);
    });
});