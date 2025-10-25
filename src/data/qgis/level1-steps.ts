import { ExerciseStep } from '@/types';

// QGIS Level 1 - 20
// src/data/qgis/level1-steps.ts
// QGIS Expression Editor - Level 1 (10 steps + intro)


export const qgisLevel1Steps: ExerciseStep[] = [
    {
        id: 1,
        pathType: 'QGIS',
        level: 1,
        title: 'Call a field',
        description: `Learn how to reference a field directly. 
When creating a new field, you can make its value equal to another existing field.
Field names without spaces can be written directly; field names with spaces must be enclosed in double quotes.`,
        example: `Syntax: field_name  or  "field_name"
Example:
new_field = source_field`,
        question: `Write an expression to make the new_field equal to the source_field.`,
        initialData: 'Before: source_field = "ABC123"',
        expectedResult: 'After: new_field = "ABC123"',
        correctAnswers: [
            'source_field',
            '"source_field"'
        ],
        hints: [
            'Simply reference the field name.',
            'No quotes needed for field names without spaces.'
        ],
        tableData: {
            field1: 'source_field',
            field2: 'new_field',
            value1: ['ABC123', 'DEF456', 'GHI789'],
            value2: ['ABC123', 'DEF456', 'GHI789']
        }
    },
    {
        id: 2,
        pathType: 'QGIS',
        level: 1,
        title: 'Field name with space',
        description: `Some field names may contain spaces. In this case, you must use double quotes around the field name.`,
        example: `Syntax: "Field with space"

Example:
new_field = "Field with space"`,
        question: `Write an expression to make new_field equal to "Field with space".`,
        initialData: 'Before: "Field with space" = "London"',
        expectedResult: 'After: new_field = "London"',
        correctAnswers: ['"Field with space"'],
        hints: [
            'Always use double quotes when field names contain spaces.'
        ],
        tableData: {
            field1: 'Field with space',
            field2: 'new_field',
            value1: ['London', 'Paris', 'Berlin'],
            value2: ['London', 'Paris', 'Berlin']
        }
    },
    {
        id: 3,
        pathType: 'QGIS',
        level: 1,
        title: 'Numeric field (Integer)',
        description: `Learn how to use numeric values. 
In this example, the new field 'month' is of integer type, so you can only use numbers, not text.`,
        example: `Example:
month = 10
// October represented as number`,
        question: `Set the month field to 10 (October).`,
        initialData: 'Before: year = 2025',
        expectedResult: 'After: month = 10',
        correctAnswers: ['10'],
        hints: [
            'Do not use quotes for numbers.',
            'Integer fields can only store whole numbers.'
        ],
        tableData: {
            field1: 'year',
            field2: 'month',
            value1: ['2025', '2025', '2025'],
            value2: ['10', '10', '10']
        }
    },
    {
        id: 4,
        pathType: 'QGIS',
        level: 1,
        title: 'String data type',
        description: `Strings are text values and must be enclosed in single quotes.`,
        example: `Example:
weekday = 'Wednesday'`,
        question: `Set the weekday field to the string 'Wednesday'.`,
        initialData: 'Before: month = 10',
        expectedResult: "After: weekday = 'Wednesday'",
        correctAnswers: ["'Wednesday'"],
        hints: [
            'Use single quotes around text values.',
            'Text fields cannot store numeric values directly.'
        ],
        tableData: {
            field1: 'month',
            field2: 'weekday',
            value1: ['10', '10', '10'],
            value2: ['Wednesday', 'Wednesday', 'Wednesday']
        }
    },
    {
        id: 5,
        pathType: 'QGIS',
        level: 1,
        title: 'Numeric calculation (Decimal)',
        description: `You can perform mathematical operations between numeric fields.
In this example, you will convert 'meter' to 'hectare' using the formula hectare = meter / 10000.`,
        example: `Example:
hectare = meter / 10000`,
        question: `Write an expression to calculate hectare from meter.`,
        initialData: 'Before: meter = 52300',
        expectedResult: 'After: hectare = 5.23',
        correctAnswers: [
            'meter/10000',
            '"meter"/10000',
            '(meter/10000)',
            '("meter"/10000)'
        ],
        hints: [
            'Use / for division.',
            'Make sure the output field type is decimal (real) and set to 2 decimal places.'
        ],
        tableData: {
            field1: 'meter',
            field2: 'hectare',
            value1: ['52300', '110000', '30450'],
            value2: ['5.23', '11.00', '3.05']
        }
    },
    {
        id: 6,
        pathType: 'QGIS',
        level: 1,
        title: 'Combine field and string',
        description: `Combine a field value with a string using the || operator.
Here, you will add a surname to an existing first_name field.`,
        example: `Example:
full_name = first_name || ' Smith'`,
        question: `Write an expression to create full_name by combining first_name with ' Smith'.`,
        initialData: 'Before: first_name = "Peter"',
        expectedResult: 'After: full_name = "Peter Smith"',
        correctAnswers: [
            "first_name||' Smith'",
            "first_name || ' Smith'",
            '"first_name"||\' Smith\'',
            '"first_name" || \' Smith\''
        ],
        hints: [
            'Use || to concatenate text.',
            'Strings must be enclosed in single quotes.'
        ],
        tableData: {
            field1: 'first_name',
            field2: 'full_name',
            value1: ['Peter', 'Anna', 'Tom'],
            value2: ['Peter Smith', 'Anna Smith', 'Tom Smith']
        }
    },
    {
        id: 7,
        pathType: 'QGIS',
        level: 1,
        title: 'Use two fields - area calculation',
        description: `You can combine multiple fields in one expression. 
Here, multiply 'length' and 'width' to calculate 'area'.
You can also edit the ID field if needed.`,
        example: `Example:
area = length * width`,
        question: `Write an expression to calculate area using length and width.`,
        initialData: 'Before: length = 10, width = 5',
        expectedResult: 'After: area = 50',
        correctAnswers: [
            'length*width',
            '"length"*"width"',
            '(length*width)',
            '("length"*"width")'
        ],
        hints: [
            'Use * for multiplication.',
            'Ensure both fields are numeric.'
        ],
        tableData: {
            field1: 'length / width',
            field2: 'area',
            value1: ['10 / 5', '12 / 6', '8 / 4'],
            value2: ['50', '72', '32']
        }
    },
    {
        id: 8,
        pathType: 'QGIS',
        level: 1,
        title: 'Update an existing field',
        description: `In the Field Calculator, you can either create a new field or update an existing one. 
Here, the field 'fullname' already exists but only contains surnames. 
You will update it using another field 'firstname'.`,
        example: `Example:
fullname = firstname || ' ' || fullname`,
        question: `Write an expression to update fullname by adding firstname in front of it.`,
        initialData: 'Before: firstname = "Jane", fullname = "Smith"',
        expectedResult: 'After: fullname = "Jane Smith"',
        correctAnswers: [
            "firstname||' '||fullname",
            "firstname || ' ' || fullname",
            '"firstname"||\' \'||"fullname"',
            '"firstname" || \' \' || "fullname"'
        ],
        hints: [
            'Use the same expression structure as concatenation.',
            'Choose "Update existing field" instead of "Create new field".'
        ],
        tableData: {
            field1: 'firstname / fullname',
            field2: 'fullname (updated)',
            value1: ['Jane / Smith', 'Alex / Johnson', 'Eva / Brown'],
            value2: ['Jane Smith', 'Alex Johnson', 'Eva Brown']
        }
    },
    {
        id: 9,
        pathType: 'QGIS',
        level: 1,
        title: 'Boolean (True / False)',
        description: `Boolean expressions return True or False. 
You can test conditions such as whether a value is greater than a threshold.`,
        example: `Example:
length_over_five = length > 5`,
        question: `Write an expression to check if length is greater than 5.`,
        initialData: 'Before: length = 3, 5, 8',
        expectedResult: 'After: False, False, True',
        correctAnswers: [
            'length>5',
            '"length">5',
            '(length>5)',
            '("length">5)'
        ],
        hints: [
            'Use comparison operators like >, <, =.',
            'The result will be True or False.'
        ],
        tableData: {
            field1: 'length',
            field2: 'length_over_five',
            value1: ['3', '5', '8'],
            value2: ['false', 'false', 'true']
        }
    },
    {
        id: 10,
        pathType: 'QGIS',
        level: 1,
        title: 'Date and Time (function without variable)',
        description: `Some functions do not need input fields. 
You can use them to return system values such as the current date or time. 
This introduces you to functions without variables.`,
        example: `Example:
today_date = to_date(now())`,
        question: `Write an expression that returns today's date (dd/mm/yyyy format).`,
        initialData: 'No input fields needed.',
        expectedResult: 'After: today_date = 24/11/2025',
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
        tableData: {
            field1: '(none)',
            field2: 'today_date',
            value1: ['-', '-', '-'],
            value2: ['24/11/2025', '24/11/2025', '24/11/2025']
        }
    }
];

export const getTotalSteps = () => qgisLevel1Steps.length;
