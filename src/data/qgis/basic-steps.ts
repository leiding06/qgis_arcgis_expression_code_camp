import { ExerciseStep } from '@/types';

// QGIS Basic - 3 levels - 30 steps, each level has 10 steps
// src/data/qgis/basic-steps.ts
// QGIS Expression Editor - Level 1 (10 steps + intro)


export const qgisBasicSteps: ExerciseStep[] = [
      // ==========================================
  // LEVEL 1: Data Types & Basic Operations (Steps 1-10)
  // ==========================================
    {
    id: 1,
    pathType: 'QGIS',
    moduleKey: 'basic',
    level: 1,
    title: 'Calling an attribute field',
    description: `Learn how to reference a field directly. 
    This is useful when you need to get the value from one field and assign it to another, 
    or when you want to use another field's value for calculations.

    Single quotes are for text values, and double quotes are for field names.
    However, you don’t need to use quotes for field names that contain no spaces.
    
    <p class="italic text-sm">
    Extra tip for new users: the 'Initial Attribute Table' shows the data before applying the expression,
    and the 'Expected Attribute Table' shows the data after applying it.
    Please enter your answer in the Expression box and click 'OK'. 
    We will check your answer against the expected result.
    If you are new to QGIS expressions, note that the expression area on this website simulates the QGIS Expression Editor.
    You can find the QGIS Expression Editor by right-clicking your layer in QGIS, selecting 'Open Attribute Table',
    and then clicking the 'Field Calculator' icon (the calculator symbol).
    You can use the same experessions here as you would in QGIS.
    </p>`,

    example: ['Syntax: field_name or "field_name"'],

    question: `Write an expression to make the new_field's values equal to the source_field's.
    Assume that you have already chosen "new_field" as the field to update in the QGIS field calculator.`,


    correctAnswers: [
        'source_field',
        '"source_field"',
        'new_field = source_field',
        'new_field = "source_field"'
    ],

    hints: [
        'Simply reference the field name, e.g. <strong>source_field</strong>.',
        'No quotes are needed for field names without spaces.',
        'However, you can also include double quotes around field names.<p><strong>new_field = source_field</strong> or <strong>new_field = "source_field"</strong></p>.'
    ],

    initialTable: {
        id_field: 'fid',
        id_value: ['1', '2', '3'],
        columns: ['source_field', 'new_field'],
        values: [
            ['123', 'NULL'],
            ['456', 'NULL'],
            ['789', 'NULL']
        ],
    },

    expectedTable: {
        id_field: 'fid',
        id_value: ['1', '2', '3'],
        columns: ['source_field', 'new_field'],
        values: [
            ['123', '123'],
            ['456', '456'],
            ['789', '789']
        ],
    },
},
        {
        id: 2,
        pathType: 'QGIS',
        moduleKey: 'basic',
        level: 1,
        title: 'Field name with space',
        description: `Some field names may contain spaces. In this case, you must use double quotes around the field name.`,
        example: `Syntax: "Field with space"\n\nExample:\nnew_field = "Field with space"`,
        question: `Write an expression to make new_field equal to "Field with space".`,
        correctAnswers: ['"Field with space"'],
        hints: ['Always use double quotes when field names contain spaces.'],
        initialTable: {
        id_field: 'fid',
        id_value: ['1', '2', '3'],
        columns: ['Field with space', 'new_field'],
        values: [
            ['London', ''],
            ['Paris', ''],
            ['Berlin', ''],
        ],
        },
        expectedTable: {
        id_field: 'fid',
        id_value: ['1', '2', '3'],
        columns: ['Field with space', 'new_field'],
        values: [
            ['London', 'London'],
            ['Paris', 'Paris'],
            ['Berlin', 'Berlin'],
        ],
        },
    },
    {
        id: 3,
        pathType: 'QGIS',
        moduleKey: 'basic',
        level: 1,
        title: 'Numeric field (Integer)',
        description: `Learn how to work with numeric values. 
        When defining an attribute field, you should consider what data type is suitable for your data.
        'Int' stands for Integer, which means whole numbers without decimals.
        You can also define length limits; for example, a length of 3 means the maximum storable value is 999.
        Please be aware that direct calculations between different data types (like text and numbers) are not possible. We will cover type conversion functions in later steps.
        In this example, the new field 'month' is an Integer type, so you can only use numbers, not text.
        You do not need to use quotes when entering numeric values, but you are allowed to do so.`,

        example: `Example:
    10 or "10"
    // October represented as number`,
        question: `Set the month field to 10 (October).`,
        correctAnswers: [10, '10'],
        hints: [
        'Do not use quotes for numbers.',
        'Integer fields can only store whole numbers.',
        ],
        initialTable: {
        id_field: 'fid',
        id_value: ['1', '2', '3'],
        columns: ['year', 'month'],
        values: [
            ['2025', ''],
            ['2025', ''],
            ['2025', ''],
        ],
        },
        expectedTable: {
        id_field: 'fid',
        id_value: ['1', '2', '3'],
        columns: ['year', 'month'],
        values: [
            ['2025', '10'],
            ['2025', '10'],
            ['2025', '10'],
        ],
        },
    },
    {
        id: 4,
        pathType: 'QGIS',
        moduleKey: 'basic',
        level: 1,
        title: 'String data type',
        description: `Strings are text values and must be enclosed in single quotes.
        When defining an attribute field, choose 'Text' as the data type for string values.
        You can specify the maximum length for text fields; for example, a length of 20 means the field can store up to 20 characters.
        Remember that text fields cannot store numeric values directly. We will cover type conversion functions in later steps.
        In this example, you will set the 'weekday' field to a string value representing a day of the week.
        Please assume we have selected the 'weekday' field to update in the QGIS field calculator.`,
        example: `Example:
    'This is a string value'`,
        question: `Set the weekday field to the string 'Wednesday'.`,

        correctAnswers: ["'Wednesday'"],
        hints: [
        'Use single quotes around text values.',
        'Text fields cannot store numeric values directly.',
        ],
        initialTable: {
        id_field: 'fid',
        id_value: ['1', '2', '3'],
        columns: ['month', 'weekday'],
        values: [
            ['10', ''],
            ['10', ''],
            ['10', ''],
        ],
        },
        expectedTable: {
        id_field: 'fid',
        id_value: ['1', '2', '3'],
        columns: ['month', 'weekday'],
        values: [
            ['10', 'Wednesday'],
            ['10', 'Wednesday'],
            ['10', 'Wednesday'],
        ],
        },
    },
    {
        id: 5,
        pathType: 'QGIS',
        moduleKey: 'basic',
        level: 1,
        title: 'Numeric calculation (Decimal)',
        description: `You can perform mathematical operations between numeric fields.
        Decimal fields can store numbers with fractional parts (decimals). 
        When defining an attribute field, choose 'Decimal' as the data type for fields that require decimal values.
        You can specify the total number of digits and the number of decimal places; for example, a total length of 5 with 2 decimal places means the maximum storable value is 999.99.
        In this example, the new field 'hectare' is a Decimal type, so you can perform division to convert 'meter' to 'hectare'.
        Please assume we have selected the 'hectare' field to update in the QGIS field calculator.`,
        example: `Example:
    'month_salary * 12' to calculate annual salary from monthly salary field.`,
        question: `Write an expression to calculate hectare from meter. Tip: 1 hectare = 10,000 meter.`,

        correctAnswers: [
        'meter/10000',
        '"meter"/10000',
        '(meter/10000)',
        '("meter"/10000)',
        ],
        hints: [
        'Use / for division.',
        'Make sure the output field type is decimal (real) and set to 2 decimal places.',
        ],
        initialTable: {
        id_field: 'fid',
        id_value: ['1', '2', '3'],
        columns: ['meter', 'hectare'],
        values: [
            ['52300', ''],
            ['110000', ''],
            ['30450', ''],
        ],
        },
        expectedTable: {
        id_field: 'fid',
        id_value: ['1', '2', '3'],
        columns: ['meter', 'hectare'],
        values: [
            ['52300', '5.23'],
            ['110000', '11.00'],
            ['30450', '3.05'],
        ],
        },
    },
    {
        id: 6,
        pathType: 'QGIS',
        moduleKey: 'basic',
        level: 1,
        title: 'Combine field and string',
        description: `Combine a field value with a string using the || operator.
    Here, you will add a surname to an existing first_name field.`,
        example: `Example:
    full_name = first_name || ' Smith'`,
        question: `Write an expression to create full_name by combining first_name with ' Smith'.`,
        correctAnswers: [
        "first_name||' Smith'",
        "first_name || ' Smith'",
        '"first_name"||\' Smith\'',
        '"first_name" || \' Smith\'',
        ],
        hints: [
        'Use || to concatenate text.',
        'Strings must be enclosed in single quotes.',
        ],
        initialTable: {
        id_field: 'fid',
        id_value: ['1', '2', '3'],
        columns: ['first_name', 'full_name'],
        values: [
            ['Peter', ''],
            ['Anna', ''],
            ['Tom', ''],
        ],
        },
        expectedTable: {
        id_field: 'fid',
        id_value: ['1', '2', '3'],
        columns: ['first_name', 'full_name'],
        values: [
            ['Peter', 'Peter Smith'],
            ['Anna', 'Anna Smith'],
            ['Tom', 'Tom Smith'],
        ],
        },
    },
    {
        id: 7,
        pathType: 'QGIS',
        moduleKey: 'basic',
        level: 1,
        title: 'Use two fields - area calculation',
        description: `You can combine multiple fields in one expression. 
    Here, multiply 'length' and 'width' to calculate 'area'.`,
        example: `Example:
    area = length * width`,
        question: `Write an expression to calculate area using length and width.`,
        correctAnswers: [
        'length*width',
        '"length"*"width"',
        '(length*width)',
        '("length"*"width")',
        'width*length',
        'width * length',
        ],
        hints: [
        'Use * for multiplication.',
        'Ensure both fields are numeric.',
        ],
        initialTable: {
        id_field: 'fid',
        id_value: ['1', '2', '3'],
        columns: ['length', 'width', 'area'],
        values: [
            ['10', '5', ''],
            ['12', '6', ''],
            ['8', '4', ''],
        ],
        },
        expectedTable: {
        id_field: 'fid',
        id_value: ['1', '2', '3'],
        columns: ['length', 'width', 'area'],
        values: [
            ['10', '5', '50'],
            ['12', '6', '72'],
            ['8', '4', '32'],
        ],
        },
    },
    {
        id: 8,
        pathType: 'QGIS',
        moduleKey: 'basic',
        level: 1,
        title: 'Update an existing field',
        description: `In the Field Calculator, you can either create a new field or update an existing one. 
    Here, the field 'fullname' already exists but only contains surnames. 
    You will update it using another field 'firstname'.`,
        example: `Example:
    fullname = firstname || ' ' || fullname`,
        question: `Write an expression to update fullname by adding firstname in front of it.`,

        correctAnswers: [
        "firstname||' '||fullname",
        "firstname || ' ' || fullname",
        '"firstname"||\' \'||"fullname"',
        '"firstname" || \' \' || "fullname"',
        ],
        hints: [
        'Use the same expression structure as concatenation.',
        'Choose "Update existing field" instead of "Create new field".',
        ],
        initialTable: {
        id_field: 'fid',
        id_value: ['1', '2', '3'],
        columns: ['firstname', 'fullname'],
        values: [
            ['Jane', 'Smith'],
            ['Alex', 'Johnson'],
            ['Eva', 'Brown'],
        ],
        },
        expectedTable: {
        id_field: 'fid',
        id_value: ['1', '2', '3'],
        columns: ['fullname'],
        values: [
            ['Jane Smith'],
            ['Alex Johnson'],
            ['Eva Brown'],
        ],
        },
    },
    {
        id: 9,
        pathType: 'QGIS',
        moduleKey: 'basic',
        level: 1,
        title: 'Boolean (True / False)',
        description: `Boolean expressions return True or False. 
    You can test conditions such as whether a value is greater than a threshold.`,
        example: `Example:
    length_over_five = length > 5`,
        question: `Write an expression to check if length is greater than 5.`,

        correctAnswers: [
        'length>5',
        '"length">5',
        '(length>5)',
        '("length">5)',
        ],
        hints: [
        'Use comparison operators like >, <, =.',
        'The result will be True or False.',
        ],
        initialTable: {
        id_field: 'fid',
        id_value: ['1', '2', '3'],
        columns: ['length'],
        values: [
            ['3'],
            ['5'],
            ['8'],
        ],
        },
        expectedTable: {
        id_field: 'fid',
        id_value: ['1', '2', '3'],
        columns: ['length', 'length_over_five'],
        values: [
            ['3', 'false'],
            ['5', 'false'],
            ['8', 'true'],
        ],
        },
    },
    {
        id: 10,
        pathType: 'QGIS',
        moduleKey: 'basic',
        level: 1,
        title: 'Date and Time (function without variable)',
        description: `Some functions do not need input fields. 
    You can use them to return system values such as the current date or time. 
    This introduces you to functions without variables.`,
        example: `Example:
    today_date = to_date(now())`,
        question: `Write an expression that returns today's date (dd/mm/yyyy format).`,

        correctAnswers: [
        'to_date(now())',
        'date(now())',
        'to_date( now() )',
        'date( now() )',
        ],
        hints: [
        'Use now() to get the current date and time.',
        'Wrap it with to_date() to show only the date.',
        ],
        initialTable: {
        id_field: 'fid',
        id_value: ['1', '2', '3'],
        columns: ['(none)'],
        values: [
            ['-'],
            ['-'],
            ['-'],
        ],
        },
        expectedTable: {
        id_field: 'fid',
        id_value: ['1', '2', '3'],
        columns: ['today_date'],
        values: [
            ['24/11/2025'],
            ['24/11/2025'],
            ['24/11/2025'],
        ],
        },
    },


    // Steps 12-20...
    
    // ==========================================
    // LEVEL 2: Conditional Logic (Steps 21-30)
    // ==========================================
    {
        id: 11,
        pathType: 'QGIS',
        moduleKey: 'basic',
        level: 2,
        title: 'Date and Time (function without variable)',
        description: `Some functions do not need input fields. 
You can use them to return system values such as the current date or time. 
This introduces you to functions without variables.`,
        example: `Example:
today_date = to_date(now())`,
        question: `Write an expression that returns today's date (dd/mm/yyyy format).`,

        correctAnswers: [
            'to_date(now())',
            'date(now())',
            'to_date( now() )',
            'date( now() )'
        ],
        hints: [
            'Use now() to get the current date and time.',
            'Wrap it with to_date() to show only the date.'
        ],
        initialTable: {
        id_field: 'fid',
        id_value: ['1', '2', '3'],
        columns: ['(none)'],
        values: [
            ['-'],
            ['-'],
            ['-'],
        ],
        },
        expectedTable: {
        id_field: 'fid',
        id_value: ['1', '2', '3'],
        columns: ['today_date'],
        values: [
            ['24/11/2025'],
            ['24/11/2025'],
            ['24/11/2025'],
        ],
        }
    },
    // Steps 22-30...

// ==========================================
// LEVEL 3: Advanced Functions (Steps 11-20)
// ==========================================
    {
        id: 21,
        pathType: 'QGIS',
        moduleKey: 'basic',
        level: 3,
        title: 'Date and Time (function without variable)',
        description: `Some functions do not need input fields. 
You can use them to return system values such as the current date or time. 
This introduces you to functions without variables.`,
        example: `Example:
today_date = to_date(now())`,
        question: `Write an expression that returns today's date (dd/mm/yyyy format).`,

        correctAnswers: [
            'to_date(now())',
            'date(now())',
            'to_date( now() )',
            'date( now() )'
        ],
        hints: [
            'Use now() to get the current date and time.',
            'Wrap it with to_date() to show only the date.'
        ],
        initialTable: {
        id_field: 'fid',
        id_value: ['1', '2', '3'],
        columns: ['(none)'],
        values: [
            ['-'],
            ['-'],
            ['-'],
        ],
        },
        expectedTable: {
        id_field: 'fid',
        id_value: ['1', '2', '3'],
        columns: ['today_date'],
        values: [
            ['24/11/2025'],
            ['24/11/2025'],
            ['24/11/2025'],
        ],
        }
    },

];

export const getTotalSteps = () => qgisBasicSteps.length;


export const getStepsByLevel = (level: number) => {
    return qgisBasicSteps.filter(step => step.level === level);
    };

    export const getLevelInfo = (level: number) => {
    const steps = getStepsByLevel(level);
    return {
        level,
        totalSteps: steps.length,
        firstStepId: steps[0]?.id || 0,
        lastStepId: steps[steps.length - 1]?.id || 0
    };
};