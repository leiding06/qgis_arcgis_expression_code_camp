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
    Please assume that you have already chosen "new_field" as the field to update in the QGIS field calculator.`,


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
        question: `Write an expression to make new_field equal to "Field with space".
        Please assume we have selected the "new_field" field to update in the QGIS field calculator.`,
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
        In this practice, the new field 'month' is an Integer type, so you can only use numbers, not text.
        You do not need to use quotes when entering numeric values, but you are allowed to do so.`,

        example: `Example:
    10 or "10"
    // October represented as number`,
        question: `Set the month field to 10 (October).
        Please assume we have selected the "month" field to update in the QGIS field calculator.`,
        correctAnswers: [10, '10'],
        hints: [
        'You can use single quotes, but not necessary.',
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
        In this Practice, you will set the "weekday" field to a string value representing a day of the week.`,
        example: `Example: 'This is a string value'`,
        question: `Set the weekday field to the string 'Wednesday'.
        Please assume we have selected the "weekday" field to update in the QGIS field calculator.`,

        correctAnswers: ["'Wednesday'"],
        hints: [
        'Use single quotes around text values.',
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
        In this practice, the new field "hectare" is a Decimal type and the "meter" field is Int type.
        Both are numeric fields, so you can perform division to convert "meter" to "hectare".
        `,
        example: `Example:
    numeric_field_name * 12  .`,
        question: `Write an expression to calculate hectare from meter. Tip: 1 hectare = 10,000 meter.
        Please assume we have selected the "hectare" field to update in the QGIS field calculator.`,

        correctAnswers: [
        'meter/10000',
        '"meter"/10000',
        ],
        hints: [
        'Use / for division.',
        'If you are tring this in your QGIS, make sure the output field type is decimal (real) and set to 2 decimal places.',
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
        description: `Combine a field value with a string using the || operator or just the numeric + operator.
        If you want to join two field value and both them are string fields, you can also use || or + operator.
        In this practice, , you will add a surname to an existing first_name field.
        `,
        example: `Example:
        string_field || 'a string' OR string_field_one + 'a string'`,
        question: `Write an expression to create full_name by combining first_name with ' Smith'. Don't forget the space before Smith.
        Please assume we have selected the "full_name" field to update in the QGIS field calculator.`,
        correctAnswers: [
        "first_name||' Smith'",
        "first_name+' Smith'"
        ],
        hints: [
        'Use || or + to concatenate text.',
        'Strings must be enclosed in single quotes.',
        'There should be a space between first name and last name.',
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
        title: 'Use two numeric fields - area calculation',
        description: `You can combine multiple fields in one expression. 
        Make sure they are same data type (numeric) when performing calculations.
        You can use +, -, *, / operators to perform addition, subtraction, multiplication, and division respectively.
        In this practice, you will calculate area using length and width fields.
        `,
        example: `Example:
    field_one * field_two OR field_one + field_two .`,
        question: `Write an expression to calculate area using length and width. Area should equal to the product of length and width.
        Please assume we have selected the "area" field to update in the QGIS field calculator.`,
        correctAnswers: [
        'length*width',
        '"length"*"width"',
        'width*length',
        '"width"*"length"',
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
    Here, the field 'fullname' already exists but only contains surnames.We will practice updating an existing field here.
    Like we mentioned in the step 6, you can use the || operator or + operator to concatenate strings.
    When both the fields are string types, you can use either || or + to concatenate them.
    In this practice, you will update the existing 'fullname' field by adding 'firstname' in front of it.`,
        example: `Example:
        field_name_one || ' ' || field_name_two`,
        question: `Write an expression to update fullname by adding firstname in front of it.
            Please assume we have selected the "fullname" field to update in the QGIS field calculator.`,

        correctAnswers: [
        "firstname||' '||fullname",
        '"firstname"||\' \'||"fullname"',
        "firstname+' '+fullname",
        '"firstname"+\' \'+"fullname"',
        ],
        hints: [
        'Use the same expression structure as as step 6. || or + can be used.',
        'Choose "Update existing field" instead of "Create new field" in QGIS field calculator.',
        'Do not forget the space between first name and last name. It is just a string of space \'  \'', 
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
        columns: ['firstname', 'fullname'],
        values: [
            ['Jane','Jane Smith'],
            ['Alex','Alex Johnson'],
            ['Eva','Eva Brown'],
        ],
        },
    },
    {
        id: 9,
        pathType: 'QGIS',
        moduleKey: 'basic',
        level: 1,
        title: 'Slightly more complex numeric calculation',
        description: `You may need to calculate three or more numeric fields together.
        For example, you have a vector point layer representing all your store locations.
        Each store has fields for reviews from different platforms: google_review, yelp_review, facebook_review.
        You want to calculate the average review score across all platforms for each store and store it in a new field called average_review.
        You need to use parentheses to ensure the addition happens before the division.
        In this practice, you will calculate the average of three numeric fields.`,
        example: `Example:
    (field_one + field_two) * 10 .`,
        question: `Write an expression to calculate the average of google_review, yelp_review, and facebook_review.
        Please assume we have selected the "average_review" field to update in the QGIS field calculator.
        The average field is a decimal type with 2 decimal places.`,

        correctAnswers: [
        '(google_review+yelp_review+facebook_review)/3',
        '("google_review"+"yelp_review"+"facebook_review")/3',
        '(facebook_review+yelp_review+google_review)/3',
        '("facebook_review"+"yelp_review"+"google_review")/3',
        '(yelp_review+google_review+facebook_review)/3',
        '("yelp_review"+"google_review"+"facebook_review")/3',
        ],
        hints: [
        'Use parentheses to group the addition before division.',
        'Use + for addition and / for division.',
        'Average = total / group count',
        ],
        initialTable: {
        id_field: 'fid',
        id_value: ['1', '2', '3', '4'],
        columns: ['google_review', 'yelp_review', 'facebook_review'],
        values: [
            ['4.5', '4.0', '5.0'],
            ['3.8', '4.2', '4.6'], 
            ['5.0', '5.0', '5.0'], 
            ['3.0', '2.5', '4.0'], 
        ],
    },
    

        expectedTable: {
        id_field: 'fid',
        id_value: ['1', '2', '3', '4'],
        columns: ['google_review', 'yelp_review', 'facebook_review', 'average_review'],
        values: [
            ['4.5', '4.0', '5.0', '4.50'],
            ['3.8', '4.2', '4.6', '4.20'],
            ['5.0', '5.0', '5.0', '5.00'],
            ['3.0', '2.5', '4.0', '3.17'], 
        ],
    },
    },
    {
        id: 10,
        pathType: 'QGIS',
        moduleKey: 'basic',
        level: 1,
        title: 'Boolean (True / False)',
        description: `Boolean expressions return True or False. 
    You can test conditions such as whether a value is greater than a threshold.`,
        example: `Example:
    For field 'Pass', I input score > 50. The Pass fied will be True if score is greater than 50, otherwise False.`,
        question: `Write an expression to check if length is greater than 5.
    Please assume we have selected the "length_over_five" field to update in the QGIS field calculator.`,

        correctAnswers: [
        'length>5',
        '"length">5'
        ],
        hints: [
        'Use comparison operators like >, <, =.',
        'The result will be True or False.',
        ],
        initialTable: {
        id_field: 'fid',
        id_value: ['1', '2', '3'],
        columns: ['length','length_over_five'],
        values: [
            ['3', 'NULL'],
            ['5', 'NULL'],
            ['8', 'NULL'],
        ],
        },
        expectedTable: {
        id_field: 'fid',
        id_value: ['1', '2', '3'],
        columns: ['length', 'length_over_five'],
        values: [
            ['3', 'False'],
            ['5', 'False'],
            ['8', 'True'],
        ],
        },
    },
    


    // Steps 12-20...
    
    // ==========================================
    // LEVEL 2: Frequent use functions and variables (Steps 21-30)
    // ==========================================
    {
        id: 11,
        pathType: 'QGIS',
        moduleKey: 'basic',
        level: 2,
        title: 'Function without variable',
        description: `In QGIS expressions, *functions* are built-in tools that perform specific tasks — a bit like formulas in a spreadsheet. 
        They can calculate values, extract information, or return system data such as the current time or project details.

        Some functions don’t need any input values or fields. These are called **parameter-free functions**, and they simply return a default or constant result.
        For example, \`now()\` returns the current date and time, and \`pi()\` returns the mathematical constant π.

        Most other functions, however, require one or more input variables inside the brackets — for example, \`area($geometry)\` calculates the area of a feature.

        In this step, you’ll learn how to use a function that doesn’t need any variables.  
        Tip: you can open the **Help** tab in the QGIS Expression Editor to explore all available functions, their syntax, and examples.`,

        example: `Example: now() returns the current date and time.
        pi() returns the value of Pi (3.14159...)
        `,
        question: `Write an expression that returns the current date and time.`,

        correctAnswers: [
            'now()'
        ],
        hints: [
            'Use now() to get the current date and time.',
            'Make sure to include the parentheses () and with no spaces.'
            
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
        columns: ['date_time'],
        values: [
            ['24/10/2025 22:36:24'],
            ['24/10/2025 22:36:24'],
            ['24/10/2025 22:36:24'],
        ],
        }
    },


    {
    id: 12,
    pathType: 'QGIS',
    moduleKey: 'basic',
    level: 2,
    title: 'Function with String as Variable',
    description: `Most functions in QGIS require input variables — usually existing fields or constant values. Only a few functions work without any variables.

A function can take a string as its input variable, meaning you can pass text directly inside the brackets.

For example:
- \`upper('qgis')\` returns 'QGIS' because it converts the input string to uppercase.
- \`length('Open Source')\` returns the number of characters in the string.
- \`to_string(123)\` converts the number 123 into the string '123', allowing you to combine it with other text fields. (You can’t concatenate values of different types without converting them first.) This is a very handy function — for instance, you might use it when creating labels or formatting mixed data fields.

You can use these functions to clean, format, or analyze text data. For example, you might standardize all text in a field to uppercase before joining tables, or count characters to check for missing information.

We can’t cover all frequently used functions here, but you can explore the full list in the QGIS documentation:
https://docs.qgis.org/3.40/en/docs/user_manual/expressions/functions_list.html`,

    example: `Example: upper('qgis') → 'QGIS'
length('Open Source') → 11
to_string(1) `,

    question: `Write an expression that returns the uppercase version of the word 'hello'.`,

    correctAnswers: [
        "upper('hello')"
    ],

    hints: [
        "Use the upper() function to convert text to uppercase.",
        "Remember to use single quotes around the string: 'hello'."
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
        columns: ['upper_text'],
        values: [
            ['HELLO'],
            ['HELLO'],
            ['HELLO'],
        ],
    },
},
{
    id: 13,
    pathType: 'QGIS',
    moduleKey: 'basic',
    level: 2,
    title: 'Function with Numeric Variable',
    description: `Many QGIS functions take numeric values as input. 
These functions are used for mathematical calculations, data normalization, or rounding results. 
A numeric variable can be a constant (like 3.14) or a numeric field from your layer.

For example, \`sqrt(9)\` returns 3, and \`round(12.3456, 2)\` returns 12.35.
You can use these functions to simplify data or control decimal precision in numeric fields.

When combining numeric functions with fields, make sure the field data type is numeric, otherwise QGIS will return an error.`,

    example: `Example: round(12.3456, 2) → 12.35
sqrt(16) → 4`,

    question: `Write an expression that rounds the number 15.6789 to 1 decimal place.`,

    correctAnswers: [
        "round(15.6789, 1)"
    ],

    hints: [
        "Use the round() function with two parameters: the number and the number of decimals.",
        "round(15.6789, 1) → 15.7"
    ],

    initialTable: {
        id_field: 'fid',
        id_value: ['1', '2', '3'],
        columns: ['(none)'],
        values: [
            ['-'],
            ['-'],
            ['-']
        ],
    },

    expectedTable: {
        id_field: 'fid',
        id_value: ['1', '2', '3'],
        columns: ['rounded_value'],
        values: [
            ['15.7'],
            ['15.7'],
            ['15.7'],
        ],
    },
},
{
    id: 14,
    pathType: 'QGIS',
    moduleKey: 'basic',
    level: 2,
    title: 'Function with Field',
    description: `Functions can also operate directly on layer fields. 
When you reference a field in a QGIS expression, you don’t use quotes — simply type the field name inside the brackets.

For example, \`upper(name)\` converts the text in the field “name” to uppercase, and \`round(population, 0)\` rounds the field values.

Using functions with fields lets you transform your data dynamically — each feature gets its own calculated result based on that field’s value.`,

    example: `Example: upper(city_name) → 'LONDON'
round(population, 0) → 12500`,

    question: `Write an expression that converts the values in field 'city' to uppercase.`,

    correctAnswers: [
        "upper(city)"
    ],

    hints: [
        "Use upper() with the field name inside the brackets.",
        "Do not use quotes around the field name."
    ],

    initialTable: {
        id_field: 'fid',
        id_value: ['1', '2', '3'],
        columns: ['city'],
        values: [
            ['london'],
            ['paris'],
            ['rome']
        ],
    },

    expectedTable: {
        id_field: 'fid',
        id_value: ['1', '2', '3'],
        columns: ['upper_city'],
        values: [
            ['LONDON'],
            ['PARIS'],
            ['ROME'],
        ],
    },
},

{
    id: 15,
    pathType: 'QGIS',
    moduleKey: 'basic',
    level: 2,
    title: 'Default Variables: $ Variables',
    description: `In QGIS, variables that start with a **$** symbol are built-in system variables. 
They are automatically provided by QGIS and often relate to the current feature’s geometry or attributes.

For example:
- \`$area\` returns the area of the current feature.
- \`$length\` returns the length of a line.
- \`$x\` and \`$y\` return the centroid coordinates of a feature.

You don’t need to define these variables — QGIS calculates them automatically for each feature. 
They are extremely useful for geometry-based calculations and labeling.`,

    example: `Example: round($area, 2) → returns area of each feature rounded to 2 decimals`,

    question: `Write an expression that returns the area of each feature rounded to 0 decimal places.`,

    correctAnswers: [
        "round($area, 0)"
    ],

    hints: [
        "Use the $area variable and wrap it with the round() function.",
        "round($area, 0) removes decimals from the area value."
    ],

    initialTable: {
        id_field: 'fid',
        id_value: ['1', '2', '3'],
        columns: ['$area'],
        values: [
            ['24.56'],
            ['35.12'],
            ['10.89'],
        ],
    },

    expectedTable: {
        id_field: 'fid',
        id_value: ['1', '2', '3'],
        columns: ['rounded_area'],
        values: [
            ['25'],
            ['35'],
            ['11'],
        ],
    },
},


{
    id: 16,
    pathType: 'QGIS',
    moduleKey: 'basic',
    level: 2,
    title: 'Default Variables: @ Variables',
    description: `Variables starting with **@** are called *context variables*. 
They store information about the project, layer, map, or current expression context.

For example:
- \`@project_title\` gives the name of your current QGIS project.
- \`@layer_name\` returns the active layer name.
- \`@row_number\` can be used to number features when evaluating an expression.

Unlike $ variables, @ variables are not tied to geometry — they describe the project or environment in which the expression runs.`,

    example: `Example: 'Project: ' || @project_title → 'Project: Site Survey'`,

    question: `Write an expression that combines the text 'Row ' with the @row_number variable.`,

    correctAnswers: [
        "'Row ' || @row_number"
    ],

    hints: [
        "Use string concatenation (||) to join text and variables.",
        "Remember: @row_number gives the current row index in an expression context."
    ],

    initialTable: {
        id_field: 'fid',
        id_value: ['1', '2', '3'],
        columns: ['(none)'],
        values: [
            ['-'],
            ['-'],
            ['-']
        ],
    },

    expectedTable: {
        id_field: 'fid',
        id_value: ['1', '2', '3'],
        columns: ['row_label'],
        values: [
            ['Row 1'],
            ['Row 2'],
            ['Row 3'],
        ],
    },
},

{
    id: 17,
    pathType: 'QGIS',
    moduleKey: 'basic',
    level: 2,
    title: 'Function with Default Variable',
    description: `You can combine built-in variables like $area or $length with functions. 
This allows you to calculate geometry-based values more precisely or format them for display.

For example:
- \`round($length, 1)\` rounds line length to 1 decimal.
- \`to_string($area)\` converts numeric area to text.
- \`concat('Area: ', round($area, 2))\` creates a formatted label.

Combining functions with variables is very common in QGIS — it helps you turn raw data into readable outputs.`,

    example: `Example: concat('Area: ', round($area, 2)) → 'Area: 12.34'`,

    question: `Write an expression that returns 'Length: ' followed by the line length rounded to 0 decimal places.`,

    correctAnswers: [
        "concat('Length: ', round($length, 0))"
    ],

    hints: [
        "Combine text with the $length variable using concat().",
        "Use round($length, 0) to remove decimals."
    ],

    initialTable: {
        id_field: 'fid',
        id_value: ['1', '2', '3'],
        columns: ['$length'],
        values: [
            ['12.34'],
            ['8.76'],
            ['25.9'],
        ],
    },

    expectedTable: {
        id_field: 'fid',
        id_value: ['1', '2', '3'],
        columns: ['length_label'],
        values: [
            ['Length: 12'],
            ['Length: 9'],
            ['Length: 26'],
        ],
    },
},

{
    id: 18,
    pathType: 'QGIS',
    moduleKey: 'basic',
    level: 2,
    title: 'Function with Function',
    description: `Functions can be nested — one function can use the result of another as its input. 
This is called **function nesting** and it’s a powerful way to build complex expressions.

For example:
- \`upper(concat('id_', to_string(123)))\` → 'ID_123'
- \`round(sqrt(9), 0)\` → 3

When nesting, QGIS always evaluates the innermost function first. 
Make sure parentheses are balanced and the data types match.`,

    example: `Example: upper(concat('id_', to_string(45))) → 'ID_45'`,

    question: `Write an expression that converts the number 100 to string and then to uppercase.`,

    correctAnswers: [
        "upper(to_string(100))"
    ],

    hints: [
        "Start with to_string(100) → '100'.",
        "Then wrap it with upper()."
    ],

    initialTable: {
        id_field: 'fid',
        id_value: ['1', '2', '3'],
        columns: ['(none)'],
        values: [
            ['-'],
            ['-'],
            ['-']
        ],
    },

    expectedTable: {
        id_field: 'fid',
        id_value: ['1', '2', '3'],
        columns: ['upper_text'],
        values: [
            ['100'],
            ['100'],
            ['100'],
        ],
    },
},


{
    id: 19,
    pathType: 'QGIS',
    moduleKey: 'basic',
    level: 2,
    title: 'Function with Two Variables (Same Type)',
    description: `Some functions can take multiple variables of the same type. 
For example, numeric functions can accept two numbers, or string functions can accept two text values.

Examples:
- \`max(5, 10)\` → 10
- \`concat('Q', 'GIS')\` → 'QGIS'

These are very useful for comparing or combining values of the same data type.`,

    example: `Example: max(12, 30) → 30
concat('geo', 'map') → 'geomap'`,

    question: `Write an expression that returns the larger number between 8 and 12.`,

    correctAnswers: [
        "max(8, 12)"
    ],

    hints: [
        "Use the max() function for comparing two numeric values.",
        "max(8,12) → 12"
    ],

    initialTable: {
        id_field: 'fid',
        id_value: ['1', '2', '3'],
        columns: ['(none)'],
        values: [
            ['-'],
            ['-'],
            ['-']
        ],
    },

    expectedTable: {
        id_field: 'fid',
        id_value: ['1', '2', '3'],
        columns: ['max_value'],
        values: [
            ['12'],
            ['12'],
            ['12'],
        ],
    },
},

{
    id: 20,
    pathType: 'QGIS',
    moduleKey: 'basic',
    level: 2,
    title: 'Function with Two Variables (Different Types)',
    description: `Some functions allow combining variables of different data types, such as strings and numbers. 
In such cases, you often need to convert one type to another using helper functions like to_string().

For example:
- \`concat('Area: ', to_string($area))\` combines text with numeric area.
- \`substr(to_string(year), 3, 2)\` extracts text from a numeric value after conversion.

This flexibility lets you mix numbers, strings, and fields in the same expression.`,

    example: `Example: concat('Value: ', to_string(10)) → 'Value: 10'`,

    question: `Write an expression that combines the text 'Total: ' with the number 25.`,

    correctAnswers: [
        "concat('Total: ', to_string(25))"
    ],

    hints: [
        "Use concat() to combine text and numeric values.",
        "Convert numbers to text using to_string()."
    ],

    initialTable: {
        id_field: 'fid',
        id_value: ['1', '2', '3'],
        columns: ['(none)'],
        values: [
            ['-'],
            ['-'],
            ['-']
        ],
    },

    expectedTable: {
        id_field: 'fid',
        id_value: ['1', '2', '3'],
        columns: ['combined_text'],
        values: [
            ['Total: 25'],
            ['Total: 25'],
            ['Total: 25'],
        ],
    },
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
