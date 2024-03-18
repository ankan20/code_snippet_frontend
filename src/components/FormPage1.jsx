import React, { useState } from 'react';

const FormPage1 = () => {
  const [formData, setFormData] = useState({
    username: '',
    language: 'JavaScript',
    stdin: '',
    sourceCode: '',
  });
  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://code-snippet-backend-api.onrender.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        console.log('Form submitted successfully');
        setShowPopup(true);
        setFormData({
          username: '',
          language: 'JavaScript',
          stdin: '',
          sourceCode: '',
        });
      } else {
        console.error('Failed to submit form:', response.statusText);
      }
    } catch (error) {
      console.error('Error submitting form:', error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-gray-100 rounded-lg shadow-md min-w-full min-h-[100vh]">
      <h2 className="text-xl font-bold mb-4 text-center">Submit Code Snippet</h2>
      <form onSubmit={handleSubmit} className='md:flex md:justify-evenly'>
        <div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="username">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="language">
            Preferred Code Language
          </label>
          <select
            id="language"
            name="language"
            value={formData.language}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            required
          >
            <option value="C++">C++</option>
            <option value="Java">Java</option>
            <option value="JavaScript">JavaScript</option>
            <option value="Python">Python</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="stdin">
            Standard Input (stdin)
          </label>
          <textarea
            id="stdin"
            name="stdin"
            value={formData.stdin}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          ></textarea>
        </div>
        </div>
        <div>
        <div className="mb-4 md:w-[75vw]">
          <label className="block text-sm font-bold mb-2" htmlFor="sourceCode">
            Source Code
          </label>
          <textarea
            id="sourceCode"
            name="sourceCode"
            value={formData.sourceCode}
            onChange={handleChange}
            className="w-full h-[40vh] md:w-[90%] md:h-[60vh] md:ml-5  px-3 py-2 border rounded-md bg-slate-200 focus:outline-none focus:border-blue-500"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white md:ml-5 py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Submit
        </button>
        </div>
        
        
      </form>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-10">
          <div className="bg-white p-4 rounded shadow-md">
            <p className="text-green-600">Code submitted successfully!</p>
            <button className="mt-2 text-blue-500" onClick={() => setShowPopup(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormPage1;
