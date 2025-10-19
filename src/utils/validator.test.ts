// Unit tests for validator.ts
// Run with: npm test

import { 
    validateAnswer, 
    validateSyntax, 
    checkPartialMatch 
    } from './validator';

    describe('validateAnswer', () => {
    describe('Basic validation', () => {
        test('should accept exact match', () => {
        const correctAnswers = ['replace("field", \'No\', \'NO\')'];
        expect(validateAnswer('replace("field", \'No\', \'NO\')', correctAnswers)).toBe(true);
        });

        test('should accept answer with different spacing', () => {
        const correctAnswers = ['replace("field", \'No\', \'NO\')'];
        expect(validateAnswer('replace( "field" , \'No\' , \'NO\' )', correctAnswers)).toBe(true);
        });

        test('should REJECT answer with wrong quote types', () => {
        const correctAnswers = ['replace("field", \'No\', \'NO\')'];
        // Field with single quotes is WRONG in QGIS
        expect(validateAnswer("replace('field', 'No', 'NO')", correctAnswers)).toBe(false);
        // String with double quotes is WRONG in QGIS
        expect(validateAnswer('replace("field", "No", "NO")', correctAnswers)).toBe(false);
        });

        test('should accept answer with different case for function name', () => {
        const correctAnswers = ['replace("field", \'No\', \'NO\')'];
        expect(validateAnswer('REPLACE("field", \'No\', \'NO\')', correctAnswers)).toBe(true);
        expect(validateAnswer('Replace("field", \'No\', \'NO\')', correctAnswers)).toBe(true);
        });

        test('should accept field name without quotes', () => {
        const correctAnswers = ['replace(field, \'No\', \'NO\')'];
        expect(validateAnswer('replace(field, \'No\', \'NO\')', correctAnswers)).toBe(true);
        });

        test('should reject completely wrong answer', () => {
        const correctAnswers = ['replace("field", \'No\', \'NO\')'];
        expect(validateAnswer('upper("field")', correctAnswers)).toBe(false);
        });

        test('should reject answer with wrong parameters', () => {
        const correctAnswers = ['replace("field", \'No\', \'NO\')'];
        expect(validateAnswer('replace("field", \'NO\', \'No\')', correctAnswers)).toBe(false);
        });
    });

    describe('Multiple correct answers', () => {
        test('should accept any of the correct answers', () => {
        const correctAnswers = [
            'replace("field", "No", "NO")',
            'replace(field, "No", "NO")',
            'replace("field","No","NO")'
        ];
        
        expect(validateAnswer('replace("field", "No", "NO")', correctAnswers)).toBe(true);
        expect(validateAnswer('replace(field, "No", "NO")', correctAnswers)).toBe(true);
        expect(validateAnswer('replace("field","No","NO")', correctAnswers)).toBe(true);
        });
    });

    describe('Edge cases', () => {
        test('should handle empty answer', () => {
        const correctAnswers = ['replace("field", "No", "NO")'];
        expect(validateAnswer('', correctAnswers)).toBe(false);
        });

        test('should handle answer with only whitespace', () => {
        const correctAnswers = ['replace("field", "No", "NO")'];
        expect(validateAnswer('   ', correctAnswers)).toBe(false);
        });

        test('should trim leading and trailing whitespace', () => {
        const correctAnswers = ['replace("field", "No", "NO")'];
        expect(validateAnswer('  replace("field", "No", "NO")  ', correctAnswers)).toBe(true);
        });
    });
    });

    describe('validateSyntax', () => {
    test('should accept valid expression', () => {
        const result = validateSyntax('replace("field", "old", "new")');
        expect(result.isValid).toBe(true);
        expect(result.error).toBeUndefined();
    });

    test('should reject empty expression', () => {
        const result = validateSyntax('');
        expect(result.isValid).toBe(false);
        expect(result.error).toBe('Expression cannot be empty');
    });

    test('should reject unbalanced opening parentheses', () => {
        const result = validateSyntax('replace("field", "old"');
        expect(result.isValid).toBe(false);
        expect(result.error).toContain('parentheses');
    });

    test('should reject unbalanced closing parentheses', () => {
        const result = validateSyntax('replace"field", "old"))');
        expect(result.isValid).toBe(false);
        expect(result.error).toContain('parentheses');
    });

    test('should reject unbalanced single quotes', () => {
        const result = validateSyntax("replace('field, 'old', 'new')");
        expect(result.isValid).toBe(false);
        expect(result.error).toContain('single quotes');
    });

    test('should reject unbalanced double quotes', () => {
        const result = validateSyntax('replace("field, "old", "new")');
        expect(result.isValid).toBe(false);
        expect(result.error).toContain('double quotes');
    });

    test('should accept expression with both quote types', () => {
        const result = validateSyntax(`replace("field", 'old', "new")`);
        expect(result.isValid).toBe(true);
    });
    });

    describe('checkPartialMatch', () => {
    const correctAnswers = ['replace("field_name", "No", "NO")'];

    test('should return correct for exact match', () => {
        const result = checkPartialMatch('replace("field_name", "No", "NO")', correctAnswers);
        expect(result.isCorrect).toBe(true);
        expect(result.similarity).toBeGreaterThan(0.97);
    });

    test('should return high similarity for close match', () => {
        const result = checkPartialMatch('replace("field_name", "No", "no")', correctAnswers);
        expect(result.similarity).toBeGreaterThan(0.8);
        expect(result.suggestion).toBeDefined();
    });

    test('should return low similarity for very different answer', () => {
        const result = checkPartialMatch('upper("field")', correctAnswers);
        expect(result.similarity).toBeLessThan(0.5);
        expect(result.isCorrect).toBe(false);
    });

    test('should detect missing parentheses', () => {
        const result = checkPartialMatch('replace"field_name", "No", "NO"', correctAnswers);
        expect(result.errors).toBeDefined();
        expect(result.errors?.some(e => e.includes('parentheses'))).toBe(true);
    });

    test('should detect wrong function name', () => {
        const result = checkPartialMatch('substitute("field_name", "No", "NO")', correctAnswers);
        expect(result.errors).toBeDefined();
        expect(result.errors?.some(e => e.includes('function name'))).toBe(true);
    });
    });

    describe('Real QGIS expressions', () => {
        describe('Step 1 - String replace', () => {
        const correctAnswers = [
            'replace("field_name", \'No\', \'NO\')',
            'replace(field_name, \'No\', \'NO\')'
        ];

        test('should accept valid solutions', () => {
            expect(validateAnswer('replace("field_name", \'No\', \'NO\')', correctAnswers)).toBe(true);
            expect(validateAnswer('replace(field_name, \'No\', \'NO\')', correctAnswers)).toBe(true);
            expect(validateAnswer('REPLACE("field_name", \'No\', \'NO\')', correctAnswers)).toBe(true);
        });

        test('should reject wrong quote types', () => {
            // Field with single quotes is wrong
            expect(validateAnswer("replace('field_name', 'No', 'NO')", correctAnswers)).toBe(false);
            // Strings with double quotes is wrong
            expect(validateAnswer('replace("field_name", "No", "NO")', correctAnswers)).toBe(false);
        });

        test('should reject wrong parameter order', () => {
            expect(validateAnswer('replace(\'No\', "field_name", \'NO\')', correctAnswers)).toBe(false);
        });
        });

        describe('Step 2 - Upper case', () => {
        const correctAnswers = [
            'upper("city_name")',
            'upper(city_name)'
        ];

        test('should accept valid solutions', () => {
            expect(validateAnswer('upper("city_name")', correctAnswers)).toBe(true);
            expect(validateAnswer('upper(city_name)', correctAnswers)).toBe(true);
            expect(validateAnswer('UPPER("city_name")', correctAnswers)).toBe(true);
        });

        test('should reject wrong quote type for field', () => {
            expect(validateAnswer("upper('city_name')", correctAnswers)).toBe(false);
        });

        test('should reject wrong function', () => {
            expect(validateAnswer('lower("city_name")', correctAnswers)).toBe(false);
        });
        });

        describe('Step 3 - Concatenation', () => {
        const correctAnswers = [
            "first_name || ' ' || last_name",
            '"first_name" || \' \' || "last_name"',
            "concat(first_name, ' ', last_name)",
            'concat("first_name", \' \', "last_name")'
        ];

        test('should accept valid solutions', () => {
            expect(validateAnswer("first_name || ' ' || last_name", correctAnswers)).toBe(true);
            expect(validateAnswer('"first_name" || \' \' || "last_name"', correctAnswers)).toBe(true);
            expect(validateAnswer("concat(first_name, ' ', last_name)", correctAnswers)).toBe(true);
        });

        test('should accept different spacing', () => {
            expect(validateAnswer("first_name||' '||last_name", correctAnswers)).toBe(true);
            expect(validateAnswer("concat(first_name,' ',last_name)", correctAnswers)).toBe(true);
        });

        test('should reject wrong quote type for string literal', () => {
            // Space should use single quotes, not double
            expect(validateAnswer('first_name || " " || last_name', correctAnswers)).toBe(false);
        });
        });
    });