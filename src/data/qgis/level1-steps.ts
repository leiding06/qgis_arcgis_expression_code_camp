import { ExerciseStep } from '@/types';

// QGIS Level 1 - 20 步骤数据
// 目前只写了 3 个示例，你需要补充到 20 个

export const qgisLevel1Steps: ExerciseStep[] = [
    {
        id: 1,
        pathType: 'QGIS',
        level: 1,
        title: {
        en: 'String Replace - Basic',
        zh: '字串替換 - 基礎'
        },
        description: {
        en: 'Learn how to use the replace() function to modify field values. The replace() function takes three parameters: the string to search in, the text to find, and the text to replace it with.',
        zh: '學習如何使用 replace() 函數來修改欄位值。replace() 函數需要三個參數：要搜尋的字串、要找的文字、以及要替換成的文字。'
        },
        example: {
        en: 'Syntax: replace(string, find, replace)\n\nExample:\nreplace("No123", "No", "NO")\n↓\nResult: "NO123"',
        zh: '語法：replace(字串, 尋找, 替換)\n\n範例：\nreplace("No123", "No", "NO")\n↓\n結果："NO123"'
        },
        question: {
        en: 'Write an expression to change all "No" prefixes to "NO" (uppercase) in the field_name field.',
        zh: '寫一個表達式，將 field_name 欄位中所有 "No" 開頭改成大寫 "NO"。'
        },
        initialData: {
        en: 'Before: No1223, No3242, No5566',
        zh: '之前：No1223, No3242, No5566'
        },
        expectedResult: {
        en: 'After: NO1223, NO3242, NO5566',
        zh: '之後：NO1223, NO3242, NO5566'
        },
        correctAnswers: [
        'replace("field_name","No","NO")',
        'replace(field_name,"No","NO")',
        'replace("field_name", "No", "NO")',
        'replace(field_name, "No", "NO")',
        'replace( "field_name" , "No" , "NO" )',
        'replace( field_name , "No" , "NO" )'
        ],
        hints: {
        en: [
            'Use the replace() function',
            'Three parameters: source string, text to find, replacement text',
            'Field name can be written with or without quotes'
        ],
        zh: [
            '使用 replace() 函數',
            '三個參數：來源字串、要尋找的文字、替換文字',
            '欄位名稱可加引號或不加引號'
        ]
        }
    },
    {
        id: 2,
        pathType: 'QGIS',
        level: 1,
        title: {
        en: 'String Case - Upper & Lower',
        zh: '字串大小寫 - 轉換'
        },
        description: {
        en: 'Learn to use upper() and lower() functions to change text case. The upper() function converts text to uppercase, while lower() converts to lowercase.',
        zh: '學習使用 upper() 和 lower() 函數來改變文字大小寫。upper() 函數將文字轉成大寫，lower() 則轉成小寫。'
        },
        example: {
        en: 'Syntax: upper(string) or lower(string)\n\nExample:\nupper("hello")\n↓\nResult: "HELLO"\n\nlower("WORLD")\n↓\nResult: "world"',
        zh: '語法：upper(字串) 或 lower(字串)\n\n範例：\nupper("hello")\n↓\n結果："HELLO"\n\nlower("WORLD")\n↓\n結果："world"'
        },
        question: {
        en: 'Convert all values in the city_name field to uppercase.',
        zh: '將 city_name 欄位的所有值轉成大寫。'
        },
        initialData: {
        en: 'Before: london, paris, tokyo',
        zh: '之前：london, paris, tokyo'
        },
        expectedResult: {
        en: 'After: LONDON, PARIS, TOKYO',
        zh: '之後：LONDON, PARIS, TOKYO'
        },
        correctAnswers: [
        'upper("city_name")',
        'upper(city_name)',
        'upper( "city_name" )',
        'upper( city_name )'
        ],
        hints: {
        en: [
            'Use the upper() function',
            'Pass the field name as the parameter'
        ],
        zh: [
            '使用 upper() 函數',
            '將欄位名稱作為參數傳入'
        ]
        }
    },
    {
        id: 3,
        pathType: 'QGIS',
        level: 1,
        title: {
        en: 'String Concatenation',
        zh: '字串連接'
        },
        description: {
        en: 'Learn to combine multiple strings using the || operator or concat() function. String concatenation is useful for creating new values from existing fields.',
        zh: '學習使用 || 運算子或 concat() 函數來組合多個字串。字串連接對於從現有欄位創建新值很有用。'
        },
        example: {
        en: 'Syntax: string1 || string2\nor: concat(string1, string2, ...)\n\nExample:\n"Hello" || " " || "World"\n↓\nResult: "Hello World"',
        zh: '語法：字串1 || 字串2\n或：concat(字串1, 字串2, ...)\n\n範例：\n"Hello" || " " || "World"\n↓\n結果："Hello World"'
        },
        question: {
        en: 'Combine the first_name and last_name fields with a space in between.',
        zh: '將 first_name 和 last_name 欄位組合，中間加一個空格。'
        },
        initialData: {
        en: 'Before: first_name="John", last_name="Doe"',
        zh: '之前：first_name="John", last_name="Doe"'
        },
        expectedResult: {
        en: 'After: "John Doe"',
        zh: '之後："John Doe"'
        },
        correctAnswers: [
        'first_name||\' \'||last_name',
        'first_name || \' \' || last_name',
        '"first_name"||\' \'||"last_name"',
        '"first_name" || \' \' || "last_name"',
        'concat(first_name,\' \',last_name)',
        'concat(first_name, \' \', last_name)',
        'concat("first_name",\' \',"last_name")',
        'concat("first_name", \' \', "last_name")'
        ],
        hints: {
        en: [
            'Use the || operator or concat() function',
            'Add a space between the names using \' \'',
            'Remember to include the space character'
        ],
        zh: [
            '使用 || 運算子或 concat() 函數',
            '使用 \' \' 在名字之間加入空格',
            '記得加入空格字符'
        ]
        }
    },
    // TODO: 添加 Step 4-20
    // 你需要继续添加剩余的 17 个步骤
    // 可以参考以上格式
    ];

export const getTotalSteps = () => qgisLevel1Steps.length;