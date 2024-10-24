import Strings from './strings.js';

describe('.ssplit', () => {
    it('handles nulls.', () => {
        expect(Strings.ssplit(null)).toBeNull();
    });
    it('splits complex lists cleanly.', () => {
        expect(Strings.ssplit('this;is,an\ninput,of,     sorts; or;is it;;;,,,')).toEqual([
            'this', 'is', 'an',
            'input', 'of', 'sorts',
            'or', 'is it', '',
            '', '', '',
            '', ''
        ]);
    });
});

describe('.escape', () => {
    it('escapes for a URI.', () => {
        expect(Strings.escape('why? x=hello world', Strings.EscapeMethod.URI)).toBe('why%3F%20x%3Dhello%20world');
    });

    it('escapes for a regular expression.', () => {
        expect(Strings.escape('Look! at [this]...', Strings.EscapeMethod.REGEXP)).toBe('Look! at \\[this\\]\\.\\.\\.');
    });
});

describe('.some', () => {
    it('matches correctly against a string test.', () => {
        expect(Strings.some(null, 'aaa')).toBe(false);
        expect(Strings.some(null, null)).toBe(true);
        expect(Strings.some('abcDEFG', 'abcDEFG')).toBe(true);
        expect(Strings.some('abcDEFG', '123')).toBe(false);
        expect(Strings.some('abcDEFG', 'abcdefg', true)).toBe(true);
        expect(Strings.some('abcDEFG', 'abcdefg')).toBe(false);
    });
    it('matches correctly against a string array of tests.', () => {
        expect(Strings.some(null, [])).toBe(false);
        expect(Strings.some(null, ['aaa'])).toBe(false);
        expect(Strings.some('abcDEFG', ['abcDEFG'])).toBe(true);
        expect(Strings.some('abcDEFG', [])).toBe(false);
        expect(Strings.some('abcDEFG', ['123'])).toBe(false);
        expect(Strings.some('abcDEFG', ['abcdefg'], true)).toBe(true);
        expect(Strings.some('abcDEFG', ['abcdefg'])).toBe(false);
    });
    it('matches correctly against a RegExp test.', () => {
        expect(Strings.some(null, /aaa/)).toBe(false);
        expect(Strings.some('abcDEFG', /abcDEFG/)).toBe(true);
        expect(Strings.some('abcDEFG', /123/)).toBe(false);
        expect(Strings.some('abcDEFG', /ABCDEfg/, true)).toBe(true);
        expect(Strings.some('abcDEFG', /abcdefg/)).toBe(false);
        expect(Strings.some('abcDEFG', /abc/)).toBe(true);
    });
    it('matches correctly against a string array of tests.', () => {
        expect(Strings.some(null, [/aaa/])).toBe(false);
        expect(Strings.some('abcDEFG', [/abcDEFG/])).toBe(true);
        expect(Strings.some('abcDEFG', [/123/])).toBe(false);
        expect(Strings.some('abcDEFG', [/abcdefg/], true)).toBe(true);
        expect(Strings.some('abcDEFG', [/abcdefg/])).toBe(false);
    });
});

describe('.slugify', () => {
    it('creates valid slugs.', () => {
        expect(Strings.slugify(null)).toBe(null);
        expect(Strings.slugify('hello WORLD 123...')).toBe('hello-world-123');
        expect(Strings.slugify('Lala^**## Stuff')).toBe('lala-stuff');
        expect(Strings.slugify('Lala^**## Stuff-today,test')).toBe('lala-stuff-today-test');
        expect(Strings.slugify('Lala^**## Stuff-today,test', '|-|')).toBe('lala|-|stuff|-|today|-|test');
        expect(Strings.slugify('....hello WORLD 123...', '.',)).toBe('hello.world.123');
        expect(Strings.slugify('hello WORLD 123...', '***',)).toBe('hello***world***123');
        expect(Strings.slugify('hello-world...', '.',)).toBe('hello.world');
        expect(Strings.slugify('helloWorldFox', '_', false, true)).toBe('hello_World_Fox');
        expect(Strings.slugify('helloWorldFox', '-', true, true)).toBe('hello-world-fox');
        expect(Strings.slugify('HelloWorldFox', '-', false, true)).toBe('Hello-World-Fox');
        expect(Strings.slugify('Hello_World_Fox', '-', false, true)).toBe('Hello-World-Fox');
        expect(Strings.slugify('Hello_WORLD_Fox', '-', false, true)).toBe('Hello-WORLD-Fox');
        expect(Strings.slugify('HelloWORLDFox', '-', false, true)).toBe('Hello-WORLD-Fox');
        expect(Strings.slugify('HelloToTHEA-team', '-', false, true)).toBe('Hello-To-THE-A-team');
        expect(Strings.slugify('APPEND_world', '-', false, true)).toBe('APPEND-world');
        expect(Strings.slugify('Aàáäâyeeèéóöôùúü Thats nuts.')).toBe('aaaaayeeeeooouuu-thats-nuts');
    });
});

describe('.camelify', () => {
    it('creates valid camel-case strings.', () => {
        expect(Strings.camelify('ID')).toBe('ID');
        expect(Strings.camelify('UUID')).toBe('UUID');
        expect(Strings.camelify('GUID')).toBe('GUID');
        expect(Strings.camelify('Id')).toBe('ID');
        expect(Strings.camelify('uuID')).toBe('UUID');
        expect(Strings.camelify('GUId')).toBe('GUID');
        expect(Strings.camelify('hello WORLD 123...')).toBe('helloWorld123');
        expect(Strings.camelify('Lala^**## Stuff')).toBe('lalaStuff');
        expect(Strings.camelify('the quick brown fox')).toBe('theQuickBrownFox');
        expect(Strings.camelify('the quick brown fox', false)).toBe('theQuickBrownFox');
        expect(Strings.camelify('Order-id')).toBe('orderID');
        expect(Strings.camelify('Order-guid')).toBe('orderGUID');
        expect(Strings.camelify('Order-uuid')).toBe('orderUUID');
        expect(Strings.camelify('OrderID')).toBe('orderID');
        expect(Strings.camelify('Order_ID')).toBe('orderID');
        expect(Strings.camelify('Order_Guid')).toBe('orderGUID');
        expect(Strings.camelify('Order_Uuid')).toBe('orderUUID');
        expect(Strings.camelify('SQL server')).toBe('sqlServer');
        expect(Strings.camelify('SQL-server')).toBe('sqlServer');
        expect(Strings.camelify('SQL_Server')).toBe('sqlServer');
        expect(Strings.camelify('AddressEntityTypesX3')).toBe('addressEntityTypesX3');
        expect(Strings.camelify('vServerStorage')).toBe('vServerStorage');
        expect(Strings.camelify('Crazy-letters:áäâyeeèéóöôùú')).toBe('crazyLettersAAAYeeeEOOOUU');
        expect(Strings.camelify('a,bunch.of.value^together')).toBe('aBunchOfValueTogether');
        expect(Strings.camelify('Comma,sEParated,values')).toBe('commaSEParatedValues');
        expect(Strings.camelify('dot.notation.knows.BEST...right')).toBe('dotNotationKnowsBestRight');
        expect(Strings.camelify('[john].[jumped[')).toBe('johnJumped');
        expect(Strings.camelify('[acro.NYM].[OK[')).toBe('acroNymOK');
        expect(Strings.camelify(null)).toBe(null);
        expect(Strings.camelify('')).toBe('');
    });
    it('creates valid pascal-case strings.', () => {
        expect(Strings.camelify('ID', true)).toBe('ID');
        expect(Strings.camelify('UUID', true)).toBe('UUID');
        expect(Strings.camelify('GUID', true)).toBe('GUID');
        expect(Strings.camelify('Id', true)).toBe('ID');
        expect(Strings.camelify('uuID', true)).toBe('UUID');
        expect(Strings.camelify('GUId', true)).toBe('GUID');
        expect(Strings.camelify('hello WORLD 123...', true)).toBe('HelloWorld123');
        expect(Strings.camelify('Lala^**## Stuff', true)).toBe('LalaStuff');
        expect(Strings.camelify('the quick brown fox', true)).toBe('TheQuickBrownFox');
        expect(Strings.camelify('Order-id', true)).toBe('OrderID');
        expect(Strings.camelify('Order-guid', true)).toBe('OrderGUID');
        expect(Strings.camelify('Order-uuid', true)).toBe('OrderUUID');
        expect(Strings.camelify('OrderID', true)).toBe('OrderID');
        expect(Strings.camelify('Order_ID', true)).toBe('OrderID');
        expect(Strings.camelify('Order_Guid', true)).toBe('OrderGUID');
        expect(Strings.camelify('Order_Uuid', true)).toBe('OrderUUID');
        expect(Strings.camelify('SQL server', true)).toBe('SqlServer');
        expect(Strings.camelify('SQL-server', true)).toBe('SqlServer');
        expect(Strings.camelify('SQL_Server', true)).toBe('SqlServer');
        expect(Strings.camelify('AddressEntityTypesX3', true)).toBe('AddressEntityTypesX3');
        expect(Strings.camelify('vServerStorage', true)).toBe('VServerStorage');
        expect(Strings.camelify('Crazy-letters:áäâyeeèéóöôùú', true)).toBe('CrazyLettersAAAYeeeEOOOUU');
        expect(Strings.camelify('a,bunch.of.value^together', true)).toBe('ABunchOfValueTogether');
        expect(Strings.camelify('Comma,sEParated,values', true)).toBe('CommaSEParatedValues');
        expect(Strings.camelify('dot.notation.knows.BEST...right', true)).toBe('DotNotationKnowsBestRight');
        expect(Strings.camelify('[john].[jumped[', true)).toBe('JohnJumped');
        expect(Strings.camelify('[acro.NYM].[OK[', true)).toBe('AcroNymOK');
        expect(Strings.camelify(null, true)).toBe(null);
        expect(Strings.camelify('', true)).toBe('');
    });
});

describe('.indent', () => {
    it('indents a single line.', () => {
        expect(Strings.indent('hello')).toBe('    hello');
        expect(Strings.indent('hello', 0, 0, '---')).toBe('---hello');
    });
    it('indents all lines.', () => {
        expect(Strings.indent('hello\nworld\n    howdy')).toBe('    hello\n    world\n        howdy');
        expect(Strings.indent('hello\nworld\n    howdy', null, null, '♡♡♡♡')).toBe('♡♡♡♡hello\n♡♡♡♡world\n♡♡♡♡    howdy');
    });
    it('indents specific lines.', () => {
        expect(Strings.indent('hello\nworld\n    howdy', 2)).toBe('hello\nworld\n        howdy');
        expect(Strings.indent('hello\nworld\n    howdy', 1, 1)).toBe('hello\n    world\n    howdy');
        expect(Strings.indent('hello\nworld\n    howdy', 1, 2, '**')).toBe('hello\n**world\n**    howdy');
    });
});

describe('.title', () => {
    it('makes each word capitalized.', () => {
        expect(Strings.title('hello')).toBe('Hello');
        expect(Strings.title('BOB R. GOBMANG')).toBe('Bob R. Gobmang');
        expect(Strings.title('bob r. gobmang')).toBe('Bob R. Gobmang');
        expect(Strings.title('bOb R. GobmAnG')).toBe('Bob R. Gobmang');
    });
    it('captalizes diacritics.', () => {
        expect(Strings.title('ångus St3ak is\' gÚÚd!')).toBe('Ångus St3ak Is\' Gúúd!');
    });
});