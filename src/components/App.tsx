import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { TodosPage } from './TodosPage';

export const App: React.FC = () => (
  <React.StrictMode>
    <BrowserRouter>
      <TodosPage />
    </BrowserRouter>
  </React.StrictMode>
);
