
import React, { useEffect, useState } from 'react';

const ShowTable = () => {
  const [snippets, setSnippets] = useState([]);

  useEffect(() => {
    fetchSnippets();
  }, []);

  const fetchSnippets = async () => {
    try {
      const response = await fetch('https://code-snippet-backend-api.onrender.com/snippets');
      if (response.ok) {
        const data = await response.json();
        setSnippets(data);
      } else {
        console.error('Failed to fetch snippets:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching snippets:', error.message);
    }
  };

  const toggleCodeDisplay = (index) => {
    setSnippets(prevSnippets =>
      prevSnippets.map((snippet, i) =>
        i === index ? { ...snippet, showFullCode: !snippet.showFullCode } : snippet
      )
    );
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl text-center font-bold mb-4">Submitted Code Snippets</h1>
      <div className="overflow-x-auto m-2.5">
        <table className="w-full table-auto border border-black border-solid">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Username</th>
              <th className="border px-4 py-2">Language</th>
              <th className="border px-4 py-2">Stdin</th>
              <th className="border px-4 py-2">Source Code</th>
              <th className="border px-4 py-2">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {snippets.map((snippet, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white border-t border-gray-300'}>
                <td className="border px-4 py-2">{snippet.username}</td>
                <td className="border px-4 py-2">{snippet.language}</td>
                <td className="border px-4 py-2">{snippet.stdin}</td>
                <td className="border px-4 py-2">
                  {snippet.showFullCode ? (
                    <textarea
                      readOnly
                      rows={snippet.source_code.split('\n').length}
                      className="w-full bg-gray-100 rounded p-2 resize-none"
                      value={snippet.source_code}
                    ></textarea>
                  ) : (
                    <textarea
                      readOnly
                      rows={5}
                      className="w-full bg-gray-100 rounded p-2 resize-none"
                      value={snippet.source_code.substring(0, 100)}
                    ></textarea>
                  )}
                  <button className="mt-2 text-blue-500" onClick={() => toggleCodeDisplay(index)}>
                    {snippet.showFullCode ? 'Show Less' : 'Show More'}
                  </button>
                </td>
                <td className="border px-4 py-2">{new Date(snippet.timestamp).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ShowTable;
