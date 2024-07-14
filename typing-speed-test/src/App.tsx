import React, {useEffect} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import TypingTestPage from './pages/TypingTestPage';
import Layout from './layouts/Layout';
import './styles/App.css';
import setupDocumentVisibilityListener from "./utils/documentVisibility";

function App() {
    useEffect(() => {
        setupDocumentVisibilityListener();
    }, []);

    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="" element={<TypingTestPage/>}/>
                </Routes>
            </Layout>
        </Router>
    );
}

export default App;
