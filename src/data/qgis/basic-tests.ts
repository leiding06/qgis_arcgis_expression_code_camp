// src/data/qgis/basic-tests.ts

export interface TestQuestion {
    id: number;
    type: 'multiple-choice' | 'code-input';
    question: string;
    points: number; // 分数
    
    // For multiple-choice
    options?: string[];
    correctOption?: number; // index of correct option
    explanation?: string; // 答案解释
    
    // For code-input
    fieldContext?: string; // 字段背景信息
    placeholder?: string;
    correctAnswers?: string[]; // 可接受的答案

    }

    export interface LevelTest {
    level: number;
    title: string;
    description: string;
    passingScore: number; // 及格分数
    totalScore: number;
    questions: TestQuestion[];
    }

    // Level 1 测试数据示例
    export const qgisBasicTests: LevelTest[] = [
    {
        level: 1,
        title: "Level 1: String Operations Test",
        description: "Test your understanding of basic string operations in QGIS Field Calculator",
        passingScore: 3,
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
    
    // Level 2 测试（示例结构）
    {
        level: 2,
        title: "Level 2: Mathematical Operations Test",
        description: "Test your skills with calculations and mathematical expressions",
        passingScore: 3,
        totalScore: 5,
        questions: [
        {
            id: 1,
            type: 'multiple-choice',
            question: "Which operator is used for division in QGIS?",
            points: 1,
            options: [
            "\\",
            "/",
            "÷",
            "div"
            ],
            correctOption: 1
        },
        // ... more questions
        ]
    }
    ];

    // Helper function to get test by level
export function getTestByLevel(level: number): LevelTest | undefined {
    return qgisBasicTests.find(test => test.level === level);
}