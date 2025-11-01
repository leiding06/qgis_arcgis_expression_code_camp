// Answer validation utilities
// Strict validation to teach proper QGIS expression syntax
// IMPORTANT: QGIS follows SQL standard:
// - Field names use DOUBLE quotes: "field_name"
// - String literals use SINGLE quotes: 'text'

/**
 * Validate if the user's answer matches any of the correct answers
 * @param userAnswer User's submitted code
 * @param correctAnswers Array of acceptable correct answers
 * @returns true if answer is correct
 */
export const validateAnswer = (
    userAnswer: string,
    correctAnswers:  (string | number)[] 
    ): boolean => {
    // Only trim leading/trailing whitespace, preserve everything else
    const trimmedAnswer = userAnswer.trim();
    
    // Check exact match against all correct answers
    return correctAnswers.some(answer => {
        // For teaching purposes, we allow some flexibility:
        // 1. Case-insensitive for function names (QGIS is case-insensitive)
        // 2. Flexible with spaces around operators and commas
        // 3. Field names can be with or without quotes (QGIS allows both)
        // 4. BUT: Quote types are STRICT (double for fields, single for strings)
        
        const normalizedUser = normalizeForComparison(trimmedAnswer);
        const normalizedCorrect = normalizeForComparison(answer);
        
        return normalizedUser === normalizedCorrect;
    });
    };

    /**
     * Normalize expression for comparison while preserving important syntax
     * Only normalizes things that QGIS itself treats as equivalent
     * DOES NOT change quote types - they must match SQL standard
     */
    const normalizeForComparison = (expr: string | number): string => {
        const strExpr = String(expr);
        return strExpr
// QGIS functions are case-insensitive
        .replace(/\s+/g, ' ') // Normalize multiple spaces to single space
        .replace(/\s*,\s*/g, ',') // Normalize spaces around commas
        .replace(/\s*\(\s*/g, '(') // Normalize spaces after opening parenthesis
        .replace(/\s*\)\s*/g, ')') // Normalize spaces before closing parenthesis
        .replace(/\s*\|\|\s*/g, '||') // Normalize spaces around concatenation operator
        .replace(/\s*([+\-*/=<>!]+)\s*/g, (match, p1) => p1) // Normalize spaces around operators
        .trim();
    // NOTE: We do NOT normalize quotes - they must be correct!
    };

    /**
     * Strict validation - requires exact match (for advanced mode)
     * @param userAnswer User's submitted code
     * @param correctAnswers Array of acceptable correct answers
     * @returns true if answer matches exactly
     */
    export const validateAnswerStrict = (
    userAnswer: string,
    correctAnswers: string[]
    ): boolean => {
    const trimmedAnswer = userAnswer.trim();
    return correctAnswers.some(answer => trimmedAnswer === answer.trim());
    };

    /**
     * Check partial match and provide helpful feedback
     * @param userAnswer User's submitted code
     * @param correctAnswers Array of correct answers
     * @returns Match result with similarity score and suggestions
     */
    export const checkPartialMatch = (
    userAnswer: string,
    correctAnswers: string[]
    ): {
    isCorrect: boolean;
    similarity: number;
    suggestion?: string;
    errors?: string[];
    } => {
    const trimmedAnswer = userAnswer.trim();
    
    let maxSimilarity = 0;
    let closestAnswer = '';
    let errors: string[] = [];
    
    correctAnswers.forEach(answer => {
        const similarity = calculateSimilarity(
        normalizeForComparison(trimmedAnswer),
        normalizeForComparison(answer)
        );
        
        if (similarity > maxSimilarity) {
        maxSimilarity = similarity;
        closestAnswer = answer;
        errors = detectCommonErrors(trimmedAnswer, answer);
        }
    });
    
    return {
        isCorrect: maxSimilarity >= 0.98, // Nearly exact match
        similarity: maxSimilarity,
        suggestion: maxSimilarity < 1 && maxSimilarity > 0.7 
        ? `Close! Expected something like: ${closestAnswer}`
        : maxSimilarity <= 0.7
        ? 'Your answer is quite different. Check the example and try again.'
        : undefined,
        errors: errors.length > 0 ? errors : undefined
    };
    };

    /**
     * Detect common syntax errors to provide specific feedback
     * @param userAnswer User's answer
     * @param correctAnswer One of the correct answers
     * @returns Array of detected errors
     */
    const detectCommonErrors = (userAnswer: string, correctAnswer: string): string[] => {
    const errors: string[] = [];
    
    // Check for missing parentheses
    const userParenCount = (userAnswer.match(/\(/g) || []).length;
    const correctParenCount = (correctAnswer.match(/\(/g) || []).length;
    if (userParenCount !== correctParenCount) {
        errors.push('Check your parentheses - make sure they are balanced');
    }
    
    // Check for incorrect quote usage (CRITICAL for QGIS)
    const quoteErrors = detectQuoteErrors(userAnswer, correctAnswer);
    if (quoteErrors.length > 0) {
        errors.push(...quoteErrors);
    }
    
    // Check for missing commas
    const userCommaCount = (userAnswer.match(/,/g) || []).length;
    const correctCommaCount = (correctAnswer.match(/,/g) || []).length;
    if (userCommaCount !== correctCommaCount) {
        errors.push('Check your commas - function parameters should be separated by commas');
    }
    
    // Check if function name is correct (case-insensitive)
    const functionPattern = /^([a-z_]+)\(/i;
    const userFunction = userAnswer.match(functionPattern)?.[1]?.toLowerCase();
    const correctFunction = correctAnswer.match(functionPattern)?.[1]?.toLowerCase();
    if (userFunction && correctFunction && userFunction !== correctFunction) {
        errors.push(`Wrong function name - expected "${correctFunction}()"`);
    }
    
    return errors;
    };

    /**
     * Detect incorrect quote usage
     * QGIS follows SQL standard:
     * - Field names: "field_name" (double quotes)
     * - String literals: 'text' (single quotes)
     */
    const detectQuoteErrors = (userAnswer: string, correctAnswer: string): string[] => {
    const errors: string[] = [];
    
    // Check if user swapped quote types
    const userDoubleQuotes = (userAnswer.match(/"/g) || []).length;
    const correctDoubleQuotes = (correctAnswer.match(/"/g) || []).length;
    const userSingleQuotes = (userAnswer.match(/'/g) || []).length;
    const correctSingleQuotes = (correctAnswer.match(/'/g) || []).length;
    
    // If counts don't match, likely wrong quote type
    if (userDoubleQuotes !== correctDoubleQuotes || userSingleQuotes !== correctSingleQuotes) {
        // Check if they're just swapped
        if (userDoubleQuotes === correctSingleQuotes && userSingleQuotes === correctDoubleQuotes) {
        errors.push(
            'Wrong quote type! In QGIS: Use DOUBLE quotes "..." for field names, SINGLE quotes \'...\' for text strings'
        );
        } else {
        errors.push('Check your quotes - make sure string values are properly quoted');
        }
    }
    
    return errors;
    };

    /**
     * Calculate string similarity using Levenshtein distance
     * @param str1 First string
     * @param str2 Second string
     * @returns Similarity score (0 to 1)
     */
    const calculateSimilarity = (str1: string, str2: string): number => {
    if (str1 === str2) return 1;
    
    const longer = str1.length > str2.length ? str1 : str2;
    const shorter = str1.length > str2.length ? str2 : str1;
    
    if (longer.length === 0) return 1;
    
    const editDistance = levenshteinDistance(longer, shorter);
    return (longer.length - editDistance) / longer.length;
    };

    /**
     * Calculate Levenshtein distance between two strings
     * @param str1 First string
     * @param str2 Second string
     * @returns Edit distance
     */
    const levenshteinDistance = (str1: string, str2: string): number => {
    const matrix: number[][] = [];
    
    // Initialize first column
    for (let i = 0; i <= str2.length; i++) {
        matrix[i] = [i];
    }
    
    // Initialize first row
    for (let j = 0; j <= str1.length; j++) {
        matrix[0][j] = j;
    }
    
    // Fill the matrix
    for (let i = 1; i <= str2.length; i++) {
        for (let j = 1; j <= str1.length; j++) {
        if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
            matrix[i][j] = matrix[i - 1][j - 1];
        } else {
            matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1, // Substitution
            matrix[i][j - 1] + 1,     // Insertion
            matrix[i - 1][j] + 1      // Deletion
            );
        }
        }
    }
    
    return matrix[str2.length][str1.length];
    };

    /**
     * Validate expression syntax (basic syntax checking)
     * @param expression User's expression
     * @returns Object with isValid flag and error message if invalid
     */
    export const validateSyntax = (expression: string): {
    isValid: boolean;
    error?: string;
    } => {
    const trimmed = expression.trim();
    
    // Check if empty
    if (!trimmed) {
        return { isValid: false, error: 'Expression cannot be empty' };
    }
    
    // Check balanced parentheses
    let parenCount = 0;
    for (const char of trimmed) {
        if (char === '(') parenCount++;
        if (char === ')') parenCount--;
        if (parenCount < 0) {
        return { isValid: false, error: 'Unbalanced parentheses - too many closing parentheses' };
        }
    }
    if (parenCount > 0) {
        return { isValid: false, error: 'Unbalanced parentheses - missing closing parentheses' };
    }
    if (parenCount < 0) {
        return { isValid: false, error: 'Unbalanced parentheses - missing opening parentheses' };
    }
    
    // Check balanced quotes
    const singleQuotes = (trimmed.match(/'/g) || []).length;
    const doubleQuotes = (trimmed.match(/"/g) || []).length;
    if (singleQuotes % 2 !== 0) {
        return { isValid: false, error: 'Unbalanced single quotes' };
    }
    if (doubleQuotes % 2 !== 0) {
        return { isValid: false, error: 'Unbalanced double quotes' };
    }
    
    return { isValid: true };
    };