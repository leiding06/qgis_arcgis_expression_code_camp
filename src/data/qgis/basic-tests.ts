// src/data/qgis/basic-tests.ts

export interface TestQuestion {
    id: number;
    type: 'multiple-choice' | 'code-input';
    question: string;
    points: number; 
    
    // For multiple-choice
    options?: string[];
    correctOption?: number; // index of correct option
    explanation?: string; 
    
    // For code-input
    fieldContext?: string; 
    placeholder?: string;
    correctAnswers?: string[]; 

    }

    export interface LevelTest {
    level: number;
    title: string;
    description: string;
    passingScore: number; 
    totalScore: number;
    questions: TestQuestion[];
    }

    // Level 1 tests
    export const qgisBasicTests: LevelTest[] = [
    {
        level: 1,
        title: "Level 1: String Operations Test",
        description: "Test your understanding of basic string operations in QGIS Field Calculator",
        passingScore: 5,
        totalScore: 5,
        questions: [
        {
            id: 1,
            type: 'multiple-choice',
            question: "What does the || operator do in QGIS expressions?",
            points: 1,
            options: [
            "Adds two numbers together",
            "Concatenates (joins) two strings together",
            "Compares two values",
            "Creates a new field"
            ],
            correctOption: 1,
            explanation: "The || operator is used to concatenate (join) strings together. For example, 'Hello' || ' ' || 'World' produces 'Hello World'."
        },
        {
            id: 2,
            type: 'code-input',
            question: "Write an expression to combine the 'city' and 'country' fields with a comma and space between them.",
            points: 1,
            fieldContext: "You have a field called <code>city</code> and a field called <code>country</code>.",
            placeholder: "// Enter your expression here",
            correctAnswers: [
            "\"city\" || ', ' || \"country\"",
            "\"city\"||', '||\"country\"",
            "\"city\" || ',' || ' ' || \"country\"",
            "\"city\"||','||' '||\"country\""
            ],

        },
        {
            id: 3,
            type: 'multiple-choice',
            question: "Which of the following correctly adds a prefix 'ID_' to a field called 'number'?",
            points: 1,
            options: [
            "'ID_' + \"number\"",
            "'ID_' || \"number\"",
            "\"number\" || 'ID_'",
            "'ID_' & \"number\""
            ],
            correctOption: 1,
            explanation: "Use 'ID_' || \"number\" to add a prefix. The || operator concatenates strings, and the prefix comes first."
        },
        {
            id: 4,
            type: 'code-input',
            question: "Create a label field that shows: 'Name: [name] - Type: [type]'",
            points: 1,
            fieldContext: "You have fields <code>name</code> and <code>type</code>.",
            placeholder: "// Your expression",
            correctAnswers: [
            "'Name: ' || \"name\" || ' - Type: ' || \"type\"",
            "'Name: '||\"name\"||' - Type: '||\"type\"",
            "'Name: ' || \"name\" || ' - ' || 'Type: ' || \"type\""
            ],

        },
        {
            id: 5,
            type: 'code-input',
            question: "Write an expression to update the 'status' field to 'Active' for all features.",
            points: 1,
            fieldContext: "You want to set the <code>status</code> field to the text 'Active' for all rows.",
            placeholder: "// Your expression",
            correctAnswers: [
            "'Active'",
            "\"Active\""
            ]
        }
        ]
    },
    
    // Level 2 tests
{
        level: 2,
        title: "Level 2: Functions and Variables Test",
        description: "Test your understanding of QGIS functions, default variables ($), and context variables (@)",
        passingScore: 6,
        totalScore: 8,
        questions: [
        {
            id: 1,
            type: 'multiple-choice',
            question: "Which of the following statements correctly describes the $ and @ variables in QGIS expressions?",
            points: 1,
            options: [
            "$ variables can be user-defined, @ variables are system-defined",
            "$ variables relate to project/layer/context , @ variables relate to geometry/features",
            "$ variables are for strings, @ variables are for numbers",
            "There is no difference, they are interchangeable"
            ],
            correctOption: 1,
            explanation: "$ variables (like $area, $x, $y) are default variables related to the current feature's geometry. @ variables (like @layer_name, @row_number) are context variables that store information about the project, layer, or expression context."
        },
        {
            id: 2,
            type: 'code-input',
            question: "Write an expression to convert string value to uppercase.",
            points: 1,
            fieldContext: "Use the appropriate string function to convert 'hello world' to 'HELLO WORLD'.",
            placeholder: "// Your expression",
            correctAnswers: [
            "upper('hello world')",
            "UPPER('hello world')",
            "Upper('hello world')"
            ]
        },
        {
            id: 3,
            type: 'multiple-choice',
            question: "Which variable would you use to get the area of a polygon feature?",
            points: 1,
            options: [
            "@area",
            "$geometry",
            "$area",
            "area()"
            ],
            correctOption: 3,
            explanation: "$area returns the area of the current polygon feature. The unit depends on your project's CRS settings."
        },
        {
            id: 4,
            type: 'code-input',
            question: "You have a numeric field called \"price\" with value 123.456. Write an expression to convert it to a string so you can concatenate it with text 'dollars.",
            points: 1,
            fieldContext: "The <code>price</code> field contains numeric values that need to be converted to text. The result should be like '123.456 dollars'. Don't forget to include a space before 'dollars'.",
            placeholder: "// Your expression",
            correctAnswers: [
            "to_string(price)+' dollars'",
            "to/string(price) || ' dollars'",
            "to_string(\"price\")+' dollars'",
            "to/string(\"price\") || ' dollars'",
            "TO_STRING(price)+' dollars'",
            "TO_STRING(price) || ' dollars'",
            "TO_STRING(\"price\")+' dollars'",
            "TO_STRING(\"price\") || ' dollars'"
            ]
        },
        {
            id: 5,
            type: 'multiple-choice',
            question: "What does the now() function return as default (without field type setting or constraints)?",
            points: 1,
            options: [
            "Only the current time",
            "Only the current date",
            "The current date and time",
            "The project creation date"
            ],
            correctOption: 3,
            explanation: "now() returns both the current date and time. You can use to_date(now()) if you only need the date portion."
        },
        {
            id: 6,
            type: 'code-input',
            question: "Write an expression to give each feature a unique sequential number starting from 1.",
            points: 1,
            placeholder: "// Your expression",
            correctAnswers: [
            "@row_number",
            "@ROW_NUMBER"
            ]
        },
        {
            id: 7,
            type: 'code-input',
            question: "You have a line layer. Write an expression to get the length of each line feature rounded to the nearest whole number.",
            points: 1,
            fieldContext: "You will need one of the default geometry variables and a rounding function.",
            placeholder: "// Your expression",
            correctAnswers: [
            "round($length)",
            "round($length, 0)",
            "ROUND($length)",
            "ROUND($length, 0)",
            "round($LENGTH)",
            "round($LENGTH, 0)"
            ]
        },
        {
            id: 8,
            type: 'code-input',
            question: "You have a polygon layer and need to write an expression that combines a string field called \"name\" with a rounded area value, with one decimal place and in hectares.",
            points: 1,
            fieldContext: "The <code>name</code> field is a string field showing the registered name of parks. And you need to create a new field called 'description', which need to show things lile 'Name: [name] - Area: [area] hectares'. Remember that 1 hectare = 10,000 m², and your project's unit is meters, so the default area calculation will return in square meters.",
            placeholder: "// Your expression",
            correctAnswers: [
            "'Name: ' || \"name\" || ' - Area: ' || to_string(round($area / 10000, 1)) || ' hectares'",
            "'Name: '+\"name\"+' - Area: '+ to_string(round($area/10000,1))+' hectares'",
            "'Name: ' || name || ' - Area: ' || to_string(round($area / 10000, 1)) || ' hectares'",
            "'Name: '+name+' - Area: '+ to_string(round($area/10000,1))+' hectares'",
            "'Name: '||\"name\"||' - Area: '||to_string(round($area/10000,1))||' hectares'",
            "'Name: '||name||' - Area: '||to_string(round($area/10000,1))||' hectares'"
        ]   
        }
        ]
    },
    // Level 3 tests
{
    level: 3,
    title: "Level 3: Conditional Logic & Advanced Operations Test",
    description: "Test your understanding of conditional statements, pattern matching, and complex logical operations in QGIS",
    passingScore: 7,
    totalScore: 10,
    questions: [
        {
            id: 1,
            type: 'multiple-choice',
            question: "What is the correct syntax for a basic IF function in QGIS?",
            points: 1,
            options: [
                "if condition then value1 else value2",
                "if(condition, value_if_true, value_if_false)",
                "if[condition, value_if_true, value_if_false]",
                "IF condition THEN value1 ELSE value2 END"
            ],
            correctOption: 1,
            explanation: "The IF function in QGIS uses the syntax: if(condition, value_if_true, value_if_false). The condition is tested first, and depending on whether it's true or false, the corresponding value is returned."
        },
        {
            id: 2,
            type: 'code-input',
            question: "Write an expression using IF to check if a 'price' field is greater than 100. If true, return 'Expensive', otherwise return 'Affordable'.",
            points: 1,
            fieldContext: "You have a numeric field called <code>price</code>.",
            placeholder: "// Your expression",
            correctAnswers: [
                "if(price > 100, 'Expensive', 'Affordable')",
                "if(\"price\" > 100, 'Expensive', 'Affordable')",
                "if( price > 100, 'Expensive', 'Affordable' )",
                "if( \"price\" > 100, 'Expensive', 'Affordable' )"
            ]
        },
        {
            id: 3,
            type: 'multiple-choice',
            question: "When should you use CASE WHEN instead of nested IF functions?",
            points: 1,
            options: [
                "CASE WHEN is faster for all situations",
                "When you have 3 or more possible outcomes, CASE WHEN is cleaner and more readable",
                "CASE WHEN can only be used with numeric values",
                "You should always use nested IF instead of CASE WHEN"
            ],
            correctOption: 1,
            explanation: "CASE WHEN is recommended when you have 3 or more conditions to test. It makes your code much more readable and maintainable compared to deeply nested IF statements."
        },
        {
            id: 4,
            type: 'code-input',
            question: "Write a CASE WHEN expression to classify 'age' field: 'Child' if age < 13, 'Teenager' if age < 20, 'Adult' if age < 65, otherwise 'Senior'. It is always recommended to use same format for your key words, for example, keep all operator words like CASE, WHEN, END captialized or keep them all lowercase.",
            points: 1,
            fieldContext: "You have a numeric field called <code>age</code>.",
            placeholder: "// Your expression",
            correctAnswers: [
                "CASE WHEN age < 13 THEN 'Child' WHEN age < 20 THEN 'Teenager' WHEN age < 65 THEN 'Adult' ELSE 'Senior' END",
                "CASE WHEN \"age\" < 13 THEN 'Child' WHEN \"age\" < 20 THEN 'Teenager' WHEN \"age\" < 65 THEN 'Adult' ELSE 'Senior' END",
                "case when age < 13 then 'Child' when age < 20 then 'Teenager' when age < 65 then 'Adult' else 'Senior' end",
                "case when \"age\" < 13 then 'Child' when \"age\" < 20 then 'Teenager' when \"age\" < 65 then 'Adult' else 'Senior' end"
            ]
        },
        {
            id: 5,
            type: 'multiple-choice',
            question: "What is the correct way to check if a field has a NULL value?",
            points: 1,
            options: [
                "field = NULL",
                "field == NULL",
                "field IS NULL",
                "field != NULL"
            ],
            correctOption: 2,
            explanation: "You must use 'IS NULL' to check for NULL values. Using = or != with NULL won't work correctly because NULL represents unknown data and cannot be compared with standard operators."
        },
        {
            id: 6,
            type: 'code-input',
            question: "Write an expression using ILIKE to check if 'city_name' contains the word 'London' (case-insensitive). Return 'UK City' if true, otherwise 'Other City'.",
            points: 1,
            fieldContext: "You have a text field called <code>city_name</code>.",
            placeholder: "// Your expression",
            correctAnswers: [
                "if(city_name ILIKE '%London%', 'UK City', 'Other City')",
                "if(\"city_name\" ILIKE '%London%', 'UK City', 'Other City')",
                "CASE WHEN city_name ILIKE '%London%' THEN 'UK City' ELSE 'Other City' END",
                "CASE WHEN \"city_name\" ILIKE '%London%' THEN 'UK City' ELSE 'Other City' END",
                "case when city_name ilike '%London%' then 'UK City' else 'Other City' end",
                "case when \"city_name\" ilike '%London%' then 'UK City' else 'Other City' end"
            ]
        },
        {
            id: 7,
            type: 'multiple-choice',
            question: "What is the difference between LIKE and ILIKE operators?",
            points: 1,
            options: [
                "LIKE is for numbers, ILIKE is for text",
                "LIKE is case-sensitive, ILIKE is case-insensitive",
                "ILIKE is faster than LIKE",
                "There is no difference"
            ],
            correctOption: 1,
            explanation: "LIKE performs case-sensitive pattern matching (e.g., 'London' ≠ 'london'), while ILIKE performs case-insensitive matching (e.g., 'London' = 'london')."
        },
        {
            id: 8,
            type: 'code-input',
            question: "Write a CASE WHEN expression using BETWEEN to classify 'score': 'Low' if between 0-40, 'Medium' if between 41-70, 'High' if between 71-100.",
            points: 1,
            fieldContext: "You have a numeric field called <code>score</code>.",
            placeholder: "// Your expression",
            correctAnswers: [
                "CASE WHEN score BETWEEN 0 AND 40 THEN 'Low' WHEN score BETWEEN 41 AND 70 THEN 'Medium' WHEN score BETWEEN 71 AND 100 THEN 'High' END",
                "CASE WHEN \"score\" BETWEEN 0 AND 40 THEN 'Low' WHEN \"score\" BETWEEN 41 AND 70 THEN 'Medium' WHEN \"score\" BETWEEN 71 AND 100 THEN 'High' END",
                "case when score between 0 and 40 then 'Low' when score between 41 and 70 then 'Medium' when score between 71 and 100 then 'High' end",
                "case when \"score\" between 0 and 40 then 'Low' when \"score\" between 41 and 70 then 'Medium' when \"score\" between 71 and 100 then 'High' end"
            ]
        },
        {
            id: 9,
            type: 'code-input',
            question: "Write an expression using IN operator: return 'Capital' if field city has a value of 'London'or 'Paris' or 'Berlin' or 'Rome', otherwise return 'Other'.",
            points: 1,
            fieldContext: "You have a text field called <code>city</code>.",
            placeholder: "// Your expression",
            correctAnswers: [
                "CASE WHEN city IN ('London', 'Paris', 'Berlin', 'Rome') THEN 'Capital' ELSE 'Other' END",
                "CASE WHEN \"city\" IN ('London', 'Paris', 'Berlin', 'Rome') THEN 'Capital' ELSE 'Other' END",
                "case when city in ('London', 'Paris', 'Berlin', 'Rome') then 'Capital' else 'Other' end",
                "case when \"city\" in ('London', 'Paris', 'Berlin', 'Rome') then 'Capital' else 'Other' end",
                "if(city IN ('London', 'Paris', 'Berlin', 'Rome'), 'Capital', 'Other')",
                "if(\"city\" IN ('London', 'Paris', 'Berlin', 'Rome'), 'Capital', 'Other')"
            ]
        },
        {
            id: 10,
            type: 'code-input',
            question: "Write a complex expression: return 'Priority' when status is 'urgent' and field days is greater than 7, return same value if priority is 'high', otherwise return 'Normal'. You should use AND and OR operators. It should only be one 'WHEN' statement in your answer.",
            points: 1,
            fieldContext: "You have text field <code>status</code>, numeric field <code>days</code>, and text field <code>priority</code>.",
            placeholder: "// Your expression",
            correctAnswers: [
                "if((status = 'urgent' AND days > 7) OR priority = 'high', 'Priority', 'Normal')",
                "if((\"status\" = 'urgent' AND \"days\" > 7) OR \"priority\" = 'high', 'Priority', 'Normal')",
                "CASE WHEN (status = 'urgent' AND days > 7) OR priority = 'high' THEN 'Priority' ELSE 'Normal' END",
                "CASE WHEN (\"status\" = 'urgent' AND \"days\" > 7) OR \"priority\" = 'high' THEN 'Priority' ELSE 'Normal' END",
                "case when (status = 'urgent' and days > 7) or priority = 'high' then 'Priority' else 'Normal' end",
                "case when (\"status\" = 'urgent' and \"days\" > 7) or \"priority\" = 'high' then 'Priority' else 'Normal' end"
            ]
        }
    ]
}]
    // Helper function to get test by level
export function getTestByLevel(level: number): LevelTest | undefined {
    return qgisBasicTests.find(test => test.level === level);
}