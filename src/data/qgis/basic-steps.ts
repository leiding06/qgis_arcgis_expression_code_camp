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
        description: `In QGIS expressions, *functions* are built-in tools that perform specific tasks, a bit like formulas in a spreadsheet. 
        They can calculate values, extract information, or return system data such as the current time or project details.

        Some functions don’t need any input values or fields. These are called **parameter-free functions**, and they simply return a default or constant result.
        For example, \`now()\` returns the current date and time, and \`pi()\` returns the mathematical constant π.

        Most other functions, however, require one or more input variables inside the brackets. For example, \`area($geometry)\` calculates the area of a feature. Don't worry, we will cover those in later steps.

        In this step, you’ll learn how to use a function that doesn’t need any variables.  
        
        Tip: you can open the **Help** tab in the QGIS Expression Editor to explore all available functions, their syntax, and examples.`,

        example: `Example: now() returns the current date and time.
        pi() returns the value of Pi (3.14159...)
        `,
        question: `You have surveyed three locations today and want to record the date and time of the survey in the 'date_time' field. 
        Write an expression to get the current date and time.`,

        correctAnswers: [
            'now()',
            'NOW()',
            'Now()'
        ],
        hints: [
            'Use now() to get the current date and time.',
            'Make sure to include the parentheses () and with no spaces.'
            
        ],
        initialTable: {
        id_field: 'fid',
        id_value: ['1', '2', '3'],
        columns: ['date_time'],
        values: [
            ['Null'],
            ['Null'],
            ['Null'],
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
description: `Most functions in QGIS require input variables—usually existing fields or constant values. Only a few functions work without variables.

    A function can take a string as its input variable, meaning you can pass text directly inside the brackets.

    For example:
    - \`upper('qgis')\` returns 'QGIS' because it converts the input string to uppercase.
    - \`length('Open Source')\` returns the number of characters in the string.
    - \`to_string(123)\` converts the number 123 into the string '123', allowing you to combine it with other text fields. (You can’t concatenate values of different types without converting them first.) This is a very handy function. For instance, you might use it when creating labels or formatting mixed data fields.

    We can’t cover all frequently used functions here, but you can explore the full list in the QGIS documentation:
    https://docs.qgis.org/3.40/en/docs/user_manual/expressions/functions_list.html`,

example: `Example: upper('qgis') → 'QGIS' OR 
    length('Open Source') → 11`,

question: `We have received the container ID from the customer. It comes in as a lowercase string containing letters and numbers. However, we need to use all uppercase so that it aligns with the data design.

    This is the container ID: oiwljdn25nwjd01.
    
    Can you use it to update the empty CONTAINER_ID column in the correct format?
    It’s a long ID, so please copy it directly from here to avoid typos.`,

correctAnswers: [
    "upper('oiwljdn25nwjd01')",
    "Upper('oiwljdn25nwjd01')",
    "UPPER('oiwljdn25nwjd01')"
    ],

hints: [
    "Use the upper() function to convert the container ID to uppercase.",
    "Remember to use single quotes around the text: 'oiwljdn25nwjd01'."
    ],

    initialTable: {
        id_field: 'PRODUCT_ID',
        id_value: ['A001', 'A002', 'A003'],
        columns: ['PORT_ID','CONTAINER_ID'],
        values: [
            ['P01','TBC'],
            ['P01','TBC'],
            ['P01','TBC'],
        ],
    },

    expectedTable: {
        id_field: 'PRODUCT_ID',
        id_value: ['A001', 'A002', 'A003'],
        columns: ['PORT_ID','CONTAINER_ID'],
        values: [
            ['P01','OIWLJDN25NWJD01'],
            ['P01','OIWLJDN25NWJD01'],
            ['P01','OIWLJDN25NWJD01'],
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

For example, \`sqrt(9)\` returns 3 because it calculates the square root of 9.
You can use these functions to simplify data or control decimal precision in numeric fields.

When combining numeric functions with fields, make sure the field data type is numeric, otherwise QGIS will return an error. Or, you need to use type conversion functions first to convert text to numbers.`,

    example: `Example: sqrt(16) → 4  OR to_string(100) → '100'` ,

    question: `Imagine you are working as a tree surveyor. 
    The current RECORD_ID field stored your name initials. 
    You need to format the field 'RECORD_ID' of all your recorded points data with a suffix of your ID as a surveyor - 1013. 
    Please be aware that the field 'RECORD_ID' is a String field. Do you remember how we add two strings together in level 1 practice? 
    However, this time, the suffix is a numeric value. `,

    correctAnswers: [
        "RECORD_ID || to_string(1013)",
        "RECORD_ID + to_string(1013)",
        "RECORD_ID + TO_STRING(1013)",
        "RECORD_ID || TO_STRING(1013)",
    ],

    hints: [
        "Make sure you have converted the numeric suffix 1013 to string using to_string().",
        "Use || or + to concatenate the RECORD_ID field with the converted string.",
        "Numeric values do not need quotes."
    ],

    initialTable: {
        id_field: 'fid',
        id_value: ['1', '2', '3'],
        columns: ['RECORD_ID'],
        values: [
            ['AB'],
            ['AB'],
            ['AB']
        ],
    },

    expectedTable: {
        id_field: 'fid',
        id_value: ['1', '2', '3'],
        columns: ['RECORD_ID'],
        values: [
            ['AB1013'],
            ['AB1013'],
            ['AB1013'],
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


For example, \`upper(name)\` converts the text in the field “name” to uppercase, and \`round(population, 0)\` rounds the field values.

Using functions with fields lets you transform your data dynamically — each feature gets its own calculated result based on that field’s value.`,

    example: `Example: field "country" original has value "japan", upper(country) → 'JAPAN'
OR field "height cm" orginal have value 168.53, round("height cm, 1) → 168.5`,

    question: `You have a polygon layer shows all the cities in the world. You want to display a label of the city name stored in "city" field. But you want them be uppercase.`,
        correctAnswers: [
        "upper(city)",
        "UPPER(city)",
        "UPPER(\"city\")",
        "upper(\"city\")",        
    ],

    hints: [
        "Use upper() with the field name inside the brackets.",
        "As we covered in level 1, you do not have to use quotes when the field name has no spaces. But if the field name contains spaces, you must use double quotes around it."
        
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
    description: `In QGIS, variables that start with a $ symbol are built-in system variables. 
They are automatically provided by QGIS and often relate to the current feature’s geometry or attributes.

For example:
- \`$area\` returns the area of the current feature for a polygon layer.
- \`$length\` returns the length of a line feature in a line layer.
- \`$x\` and \`$y\` return the coordinates for point feature.



The unit of the return area or length value is based on project unit. You can change it in project properties.
The x and y values are depends on the CRS of the layer. We will cover CRS transform in the future.
They are extremely useful for geometry-based calculations and labeling.
They are never user-defined.`,

    example: `Example: For a 2m * 2m square feature - $area → 4`,

    question: `Imagine we are working on a point layer of borehole. We need to export it to a csv table with the location information.
    We have two fields to store the location inforamation. X and Y. But the values in Y is broken, so we need to retrieve it by expression. `,

    correctAnswers: [
        "$y",
        "$Y"
    ],

    hints: [
        "$y returns the Y value of the current feature."
    ],

    initialTable: {
        id_field: 'CRS',
        id_value: ['EPSG:27700', 'EPSG:27700', 'EPSG:27700'],
        columns: ['X', 'Y'],
        values: [
            ['606594.42','NULL'],
            ['603940.03','NULL'],
            ['603939.24','NULL'],
        ],
    },

    expectedTable: {
        id_field: 'CRS',
        id_value: ['EPSG:27700', 'EPSG:27700', 'EPSG:27700'],
        columns: ['X', 'Y'],
        values: [
            ['606594.42','240175.25'],
            ['603940.03','235142.74'],
            ['603939.24','235146.19'],
        ],
    },

},


{
    id: 16,
    pathType: 'QGIS',
    moduleKey: 'basic',
    level: 2,
    title: 'Default Variables: @ Variables (context variables)',
    description: `Variables starting with @ are called *context variables*. 
They store information about the project, layer, map, or current expression context.

For example:
- \`@project_title\` gives the name of your current QGIS project.
- \`@layer_name\` returns the active layer name.
- \`@row_number\` can be used to number features with sequential numbers.
- \`@map_title\` returns the title of the current map.
- \`@map_scale\` returns the scale of the current map.
- \`@project_crs\` returns the current project CRS.
- \`@user_account_name\` returns current user's operating system account name.

Unlike $ variables, @ variables can be set by the user: Project → Properties → Variables.
You are set your own custom variables. 
Some are static. For example, @user_account_name is the name of the current OS user.
Some are dynamic. For example, @map_scale is the scale of the current map.`, 

    example: `Example: You have a layer named as'Planned mail box'. And you want to have the layer name stored in as a field value: @layer_name → 'Planned mail box'`,

    question: `We have a layer with a Unique_ID field. However, it was a merged layer that contains rows from separated individual survyed result.  which can cause issues for referencing. Can you update the field 'Unique_ID' with unique sequential numbers?`,
    correctAnswers: [
        "@row_number"
    ],

    hints: [
        "Read the description again for frequent used variables.",
        "@row_number gives the current row index in an expression context."
    ],

    initialTable: {
        id_field: 'Unique_ID',
        id_value: ['1', '1', '2'],
        columns: ['Record_by', 'Record_at'],
        values: [
            ['Iris.Smith', '2025-01-01'],
            ['Jane.Cheng', '2025-03-15'],
            ['Jane.Cheng', '2025-03-16'],
        ],
    },

    expectedTable: {
        id_field: 'Unique_ID',
        id_value: ['1', '2', '3'],
        columns: ['Record_by', 'Record_at'],
        values: [
            ['Iris.Smith', '2025-01-01'],
            ['Jane.Cheng', '2025-03-15'],
            ['Jane.Cheng', '2025-03-16'],
        ],
    },
},

{
    id: 17,
    pathType: 'QGIS',
    moduleKey: 'basic',
    level: 2,
    title: 'Function with Default Variable or Context Variable',
    description: `Functions in QGIS Expressions can be applied to both default variables (starting with $) and context variables (starting with @). 
    Default variables such as $x and $y describe geometric properties of the current feature, while context variables like @layer_name or @map_scale describe information coming from the project or environment. 
    Regardless of which type they are, you can always wrap them inside functions to manipulate, transform, or extract derived values. 
    For example, math functions, string functions, and geometry functions all work with both types. 
    Combining functions with variables is very common in QGIS — it helps you turn raw data into readable outputs.`,

    example: `Example: \`to_string($area)\` converts numeric area to text.
OR \`upper(@layer_name)\` returns the layer name in uppercase. OR \`round(@map_scale)\` returns the current map scale rounded to the nearest integer.`,

    question: `We have a line layer here. Can you update the 'rounded_length_label' field to show the length of each line feature? Please make it integer.`,

    correctAnswers: [
        "round($length)",
        "round($length, 0)"
    ],

    hints: [
        "Use $length to access the length of each feature.",
        "when rounding, you can use round($length) to get the nearest integer."
    ],

    initialTable: {
        id_field: 'fid',
        id_value: ['1', '2', '3'],
        columns: ['rounded_length_label'],
        values: [
            ['NULL'],
            ['NULL'],
            ['NULL'],
        ],
    },

    expectedTable: {
        id_field: 'fid',
        id_value: ['1', '2', '3'],
        columns: ['rounded_length_label'],
        values: [
            ['12'],
            ['9'],
            ['26'],
        ],
    },
},

{
    id: 18,
    pathType: 'QGIS',
    moduleKey: 'basic',
    level: 2,
    title: 'Function with Function',
    description: `Functions can be nested. One function can use the result of another as its input. 
This is called **function nesting** and it’s a powerful way to build complex expressions.

When nesting, QGIS always evaluates the innermost function first. 
Make sure parentheses are balanced and the data types match.`,

    example: `Example: \`upper(concat('id_', to_string(123)))\` → 'ID_123'
OR \`floor(to_int('2.3'))\` → 2' OR imagine you have a polygon layer, but you need to fill the X and Y for it. The default $x and $y only work for points. You can use x( centroid($geometry) ) and y( centroid($geometry) ) to get the X and Y value of the centroid of the current polygon feature.`,

    question: `We have two fields here 'sales' and 'expenses' for each shop location. Can you update the 'profit' field to show the profit of each location?
    Becasue the field unit are all 'million', a rounded value will be good enough. We also would like to have the unit after it. For example: 3 million.`,

    correctAnswers: [
        "to_string(round(sales - expenses)) || 'million'",
        "to_string(round(sales - expenses)) + 'million'"
    ],

    hints: [
        "Profie should be sales - expenses.",
        "Remember you can use round() to get the nearest integer.",
        "Remember you can't use || or + to concatenate string and integer. You need to convert the data type first by using to_string().",
    ],

    initialTable: {
        id_field: 'fid',
        id_value: ['1', '2', '3'],
        columns: ['sales', 'expenses', 'profit'],
        values: [
            ['13.301', '10.23', 'NULL'],
            ['14.55', '11.935', 'NULL'],
            ['9.78', '8.2', 'NULL'],
        ],
    },

    expectedTable: {
        id_field: 'fid',
        id_value: ['1', '2', '3'],
        columns: ['sales', 'expenses', 'profit'],
        values: [
            ['13.31', '10.23', '3 million'],
            ['14.55', '11.93', '3 million'],
            ['9.78', '8.2', '1 million'],
        ],
    },
},


{
    id: 19,
    pathType: 'QGIS',
    moduleKey: 'basic',
    level: 2,
    title: 'Function with Two Parameters',
    description: `We have seen many different functions with one parameter. Some functions can take two parameters. 
They may be used to compare or combine values of the same data type.
Or maybe use field name for the first variable and a numeric value for the second variable for substring.
Or maybe the first parameter is a field name and second parameter is a numeric value for the number of characters to extract from the beginning of the field value.
Or maybe two geometry and calculate the distance between them.`,

    example: `Example: max(12, 30) → 30 OR
concat('geo', 'map') → 'geomap' OR left('geomap', 3) → 'geo' `,

    question: `Remember our previous step, we got the profit of each location as a rounded number with a unit. This time, let's get a more precise profit number, with 1 decimal place. 
    When you use round() with only one parameter, it return an integer. But if you add a second parameter about how many decimal places you want, and you can get a decimal number.
    We don't need to use to_string() and add the 'million' unit this time. Please use a comma to separate the first parameter and the second parameter.
    `,

    correctAnswers: [
        "round(sales - expenses, 1)",
    ],

    hints: [
        "Remember you can use round(368.561) to get the nearest integer 368.",
        "You can use round(368.561, 1) to get the nearest decimal number with one decimal place, which is 368.6."
    ],

    initialTable: {
        id_field: 'fid',
        id_value: ['1', '2', '3'],
        columns: ['sales', 'expenses', 'profit'],
        values: [
            ['13.301', '10.23', 'NULL'],
            ['14.55', '11.935', 'NULL'],
            ['9.78', '8.2', 'NULL'],
        ],
    },

    expectedTable: {
        id_field: 'fid',
        id_value: ['1', '2', '3'],
        columns: ['sales', 'expenses', 'profit'],
        values: [
            ['13.31', '10.23', '3.1'],
            ['14.55', '11.93', '2.6'],
            ['9.78', '8.2', '1.6'],
        ],
    },
},

{
    id: 20,
    pathType: 'QGIS',
    moduleKey: 'basic',
    level: 2,
    title: 'Function with three or more parameters',
    description: `Some functions can even take three or more parameters. You can read details from QGIS documentation or from 'Help' tab in the QGIS Expression Editor.
    You can search for key words and it will tell you details of parameter rules. 
    Some function can have 1 or 2 compulsory parameters and 1 or more optional parameters.
    In our last step for level 2 we will introduce few frequent used functions that take three or more parameters.
`,

    example: `Example: imagine you have a layer recorded overhead cables, and you have multiple fields for its type, height, and ownership, you want to create field to store all key informations in a list: array(type, height, owner) → [telecomms, 9, Virgin]
    OR imagine you have field named student_ID but they all have different length of values like 1013, 02045, 223. You want to standardise the format, you can use lpad(student_ID, 8, '0') → 00001013. First parameter is the field name, second parameter is the length of the field, third parameter is the character to pad with. There is also rpad(), adds characters to the right of the field.
    OR imagine you gave an array field named 'sales_of_2024', which contains sales for each month of 2024 by calendar order.'243.12,281,230.2,...'. But your manager ask you to get the second quarter's value in a new field 'sales_of_2024_second_quarter'. You can use array_slice(string_to_array("sales_of_2024"), 3, 5) → [271.5, 231.28, 255.6]. 
    The first parameter is an array. You can transfer a field to an array by string_to_array(field_name). The second parameter is the start index (0 based, the first element will be 0 instead of 1), and start index is included, third parameter is end index, which also included.
    The second quarter will be the fourth month till the sixth month, that's why it is 3 and 5.
    OR imagine you have a field named 'date_of_built' and it stores date in the format of YYYY-MM-DD, but all the year is wrong, it says 2024 and need to be update to 2025, you can use replace(date_of_built, '2024', '2025') → 2025-01-01. The first parameter is the field name, second parameter is the old value to replace, third parameter is the new value to replace.`,

    question: `We have an array field named 'land_info', it stores the information of each land parcel in the order of land type, land use, land ownership, last check date.
    You have been asked to create a new field as land_type_and_use, which only stores the information of land type and land use. Please use array_slice() to get the first two elements of the array field.`,

    correctAnswers: [
        "array_slice(string_to_array('land_info'), 0, 1)",
    ],

    hints: [
        "You can use array_slice() to get the first two elements of the array field.",
        "If you noticed there is no space after comma, it is because we want to transfer it to an array, this is not an error.",
        "To get the first two elements, you should use 0 as the start position and 1 as the end position.",
    ],

    initialTable: {
        id_field: 'fid',
        id_value: ['1', '2', '3'],
        columns: ['land_info', 'land_type_and_use'],
        values: [
            ['plains, agriculture, private, 2025-01-01', 'NULL' ],
            ['forests, greenfield, public, 2024-12-31', 'NULL'],
            ['pasture, grazing, private, 2024-12-31', 'NULL'],
        ],
    },

    expectedTable: {
        id_field: 'fid',
        id_value: ['1', '2', '3'],
        columns: ['land_info', 'land_type_and_use'],
        values: [
            ['plains, agriculture, private, 2025-01-01', 'plains, agriculture' ],
            ['forests, greenfield, public, 2024-12-31', 'forests, greenfield'],
            ['pasture, grazing, private, 2024-12-31', 'pasture, grazing'],
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
