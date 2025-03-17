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