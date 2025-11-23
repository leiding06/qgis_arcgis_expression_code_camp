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
    }]
    // Helper function to get test by level
export function getTestByLevel(level: number): LevelTest | undefined {
    return qgisBasicTests.find(test => test.level === level);
}