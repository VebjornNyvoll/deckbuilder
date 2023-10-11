import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CardView from './CardView';

const ReactRouter: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<CardView />} />
                {/* Future Routes to be added */}
            </Routes>
        </Router>
    );
};

export default ReactRouter;
