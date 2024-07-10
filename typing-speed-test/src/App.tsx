import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TypingTestPage from './pages/TypingTestPage';
import Layout from './layouts/Layout'; // Ensure Layout is imported
import './styles/App.css';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="" element={<TypingTestPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
