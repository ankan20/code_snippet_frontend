import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import FormPage1 from './components/FormPage1';
import ShowTable from './components/ShowTable';
import Home from './components/Home'; 

const App = () => {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />  {/* Using element for clarity */}
          <Route path="/form" element={<FormPage1 />} />
          <Route path="/snippets" element={<ShowTable />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
