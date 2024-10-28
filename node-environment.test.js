import NodeEnvironment from './node-environment.js';

let tests = [
    {
        inputs: ['dev', 'development', 'DEVelop', 'DEVELOP', 'developMENT'],
        expected: 'development'
    },
    {
        inputs: ['staging', 'test', 'STAGE', 'STAging', 'Testing'],
        expected: 'staging'
    },
    {
        inputs: ['review', 'preprod', 'pre-prod', 'REV'],
        expected: 'review'
    },
    {
        inputs: ['production', 'live', 'PROD', 'ProduCTION', 'LIVE'],
        expected: 'production'
    },
];

describe('.name', () => {
    it('returns "development" when unknown.', () => {
        process.env.NODE_ENV = '';
        expect(NodeEnvironment.name).toBe('development');
        process.env.NODE_ENV = 'abcd';
        expect(NodeEnvironment.name).toBe('development');
    });
    for (let t of tests) {
        let expected = t.expected;
        let inputs = t.inputs;
        it(`returns "${expected}" when: "${inputs.join('", "')}"`, () => {
            for (let i of inputs) {
                process.env.NODE_ENV = i;
                expect(NodeEnvironment.name).toBe(expected);
            }
        });
    }
});

describe('.production', () => {
    it('returns false when unknown.', () => {
        process.env.NODE_ENV = '';
        expect(NodeEnvironment.production).toBe(false);
        process.env.NODE_ENV = 'abcd';
        expect(NodeEnvironment.production).toBe(false);
    });
    for (let t of tests) {
        let expected = t.expected;
        let inputs = t.inputs;
        it(`returns "${expected === 'production'}" when: "${inputs.join('", "')}"`, () => {
            for (let i of inputs) {
                process.env.NODE_ENV = i;
                expect(NodeEnvironment.production).toBe(expected === 'production');
            }
        });
    }
});

describe('.review', () => {
    it('returns false when unknown.', () => {
        process.env.NODE_ENV = '';
        expect(NodeEnvironment.review).toBe(false);
        process.env.NODE_ENV = 'abcd';
        expect(NodeEnvironment.review).toBe(false);
    });
    for (let t of tests) {
        let expected = t.expected;
        let inputs = t.inputs;
        it(`returns "${expected === 'review'}" when: "${inputs.join('", "')}"`, () => {
            for (let i of inputs) {
                process.env.NODE_ENV = i;
                expect(NodeEnvironment.review).toBe(expected === 'review');
            }
        });
    }
});

describe('.staging', () => {
    it('returns false when unknown.', () => {
        process.env.NODE_ENV = '';
        expect(NodeEnvironment.staging).toBe(false);
        process.env.NODE_ENV = 'abcd';
        expect(NodeEnvironment.staging).toBe(false);
    });
    for (let t of tests) {
        let expected = t.expected;
        let inputs = t.inputs;
        it(`returns "${expected === 'staging'}" when: "${inputs.join('", "')}"`, () => {
            for (let i of inputs) {
                process.env.NODE_ENV = i;
                expect(NodeEnvironment.staging).toBe(expected === 'staging');
            }
        });
    }
});

describe('.development', () => {
    it('returns true when unknown.', () => {
        process.env.NODE_ENV = '';
        expect(NodeEnvironment.development).toBe(true);
        process.env.NODE_ENV = 'abcd';
        expect(NodeEnvironment.development).toBe(true);
    });
    for (let t of tests) {
        let expected = t.expected;
        let inputs = t.inputs;
        it(`returns "${expected === 'development'}" when: "${inputs.join('", "')}"`, () => {
            for (let i of inputs) {
                process.env.NODE_ENV = i;
                expect(NodeEnvironment.development).toBe(expected === 'development');
            }
        });
    }
});