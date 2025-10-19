import React from 'react';


export interface AttributeTableProps {
    title: string;
    fieldName1: string;
    fieldName2?: string;
    value1: string[];
    value2: string[];
    isExpected: boolean;
    isComparisonView?: boolean; 
}

// =================================================================
// AttributeTable 
// =================================================================
export const AttributeTable: React.FC<AttributeTableProps> = ({ title, fieldName1, fieldName2,value1, value2, isExpected, isComparisonView = false }) => {
    const baseField: string = 'ID'; 
    const rowsToShow: number = isComparisonView ? 3 : 4; 
    const fontSizeClass = isComparisonView ? 'text-xs' : 'text-sm';

    return (
        <div className={`p-3 rounded-xl border ${isExpected ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-50'}`}>
            <h4 className={`text-xs font-semibold mb-2 ${isExpected ? 'text-green-700' : 'text-gray-700'}`}>{title}</h4>
            <div className="overflow-x-auto">
                <table className={`min-w-full ${fontSizeClass} font-mono border-separate border-spacing-0 rounded-lg overflow-hidden`}>
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="py-1 px-2 border-b text-left text-gray-500 font-normal w-1/6 sticky left-0 bg-gray-200">
                                {baseField}
                            </th>
                            <th className="py-1 px-2 border-b text-left text-gray-700 font-medium w-1/3">
                                {fieldName1} 
                            </th>
                            <th className="py-1 px-2 border-b text-left text-gray-700 font-medium w-1/3">
                                {fieldName2}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {value1.slice(0, rowsToShow).map((value1: string, index: number) => (
                            <tr key={index} className="hover:bg-gray-100">
                                <td className="py-1 px-2 text-gray-500 border-b border-gray-200 sticky left-0 bg-white">
                                    {index + 1}
                                </td>
                                <td className="py-1 px-2 text-gray-700 border-b border-gray-200">
                                    {value1}
                                </td>
                                <td className={`py-1 px-2 font-semibold border-b border-gray-200 ${isExpected ? 'text-green-700' : 'text-gray-700'}`}>
                                    {value2[index]}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {value1.length > rowsToShow && (
                <p className="text-xs text-gray-500 mt-2 text-center">... Only display {rowsToShow} rows ...</p>
            )}
        </div>
    );
};
