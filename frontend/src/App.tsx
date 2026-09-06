import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { DecisionArchitectureLanding } from './pages/DecisionArchitectureLanding';
import { OperationsCommandCenter } from './pages/OperationsCommandCenter';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Decision Architecture Landing Page */}
        <Route path="/" element={<DecisionArchitectureLanding />} />

        {/* Tactical EOC Disaster Operations Command Suite */}
        <Route path="/app" element={<OperationsCommandCenter />} />

        {/* Fallback Catch-all Route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
