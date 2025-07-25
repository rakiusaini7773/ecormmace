import React from "react";

const Table = ({ columns, data, title }) => {
  const getStatusColor = (status) => {
    if (typeof status !== "string") return "text-gray-600";
    switch (status.toLowerCase()) {
      case "active":
        return "text-blue-600";
      case "inactive":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="w-full rounded-3xl shadow-2xl p-6 bg-white overflow-x-auto">
      {title && (
        <h2 className="text-xl font-semibold text-gray-800 mb-4">{title}</h2>
      )}

      <table className="min-w-full bg-white">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((col, index) => (
              <th
                key={index}
                className="px-4 py-3 text-left text-gray-500 font-semibold border-b"
              >
                {col.Header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.length > 0 ? (
            data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="border-b border-gray-200 hover:bg-gray-50 transition"
              >
                {columns.map((col, colIndex) => {
                  const rawValue = col.accessor?.split('.').reduce((obj, key) => obj?.[key], row);
                  const value = col.accessor === "status" ? rawValue || row.sstatus : rawValue;

                  return (
                    <td
                      key={colIndex}
                      className="px-4 py-3 text-gray-800 font-medium align-middle max-w-[200px] whitespace-normal break-words"
                    >
                      {col.Cell ? (
                        col.Cell({ row: { original: row }, value })
                      ) : col.accessor === "status" ? (
                        <span className={`${getStatusColor(value)} font-semibold`}>
                          {value}
                        </span>
                      ) : (
                        value ?? "N/A"
                      )}
                    </td>
                  );
                })}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="text-center py-4 text-gray-500">
                No Data Available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
