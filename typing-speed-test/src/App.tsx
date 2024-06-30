import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';

import Test from './pages/Test';
import exp from "node:constants";

function App() {
  return (
    <Router>
      <Sidebar />
      <Routes>
        <Route path="/test" element={<Test />} />
      </Routes>
    </Router>
  );
}

export default App;
