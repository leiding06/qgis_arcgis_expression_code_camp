import React from 'react';
// src/components/AttributeTable.tsx

export interface AttributeTableProps {
    columns: string[]; // column title
    data: (string | number)[][];
    isExpected: boolean;
    isComparisonView?: boolean;
    title?: string; // optional custom title
}

// =================================================================
// AttributeTable 
// =================================================================
export const AttributeTable: React.FC<AttributeTableProps> = ({
    columns, data, isExpected, isComparisonView = false, title
    }) => {
    const fontSizeClass = isComparisonView ? 'text-xs' : 'text-sm';
    const tableTitle = title || (isExpected ? "Expected Attribute Table" : "Initial Attribute Table");
    const rowsToShow = isComparisonView ? 3 : data.length;

    return (
        <div className={`p-3 rounded-xl border ${isExpected ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-50'}`}>
        <h4 className={`text-xs font-semibold mb-2 ${isExpected ? 'text-green-700' : 'text-gray-700'}`}>{tableTitle}</h4>
        <div className="overflow-x-auto">
            <table className={`min-w-full ${fontSizeClass} font-mono border-separate border-spacing-0 rounded-lg overflow-hidden`}>
            <thead>
                <tr className="bg-gray-200">
                {columns.map((col, idx) => (
                    <th
                    key={col}
                    className={`py-1 px-2 border-b text-left font-medium ${idx === 0 ? 'text-gray-500 font-normal w-1/6 sticky left-0 bg-gray-200' : 'text-gray-700 w-1/3'}`}
                    >
                    {col}
                    </th>
                ))}
                </tr>
            </thead>
            <tbody>
                {data.slice(0, rowsToShow).map((row, ridx) => (
                <tr key={ridx} className="hover:bg-gray-100">
                    {row.map((cell, cidx) => (
                    <td
                        key={cidx}
                        className={`py-1 px-2 border-b border-gray-200 
                        ${cidx === 0 ? 'text-gray-500 sticky left-0 bg-white' : ''} 
                        ${isExpected && cidx === row.length - 1 ? 'font-semibold text-green-700' : 'text-gray-700'}`}
                    >
                        {cell}
                    </td>
                    ))}
                </tr>
                ))}
            </tbody>
            </table>
        </div>
        {data.length > rowsToShow && (
            <p className="text-xs text-gray-500 mt-2 text-center">... Only display {rowsToShow} rows ...</p>
        )}
        </div>
    );
};