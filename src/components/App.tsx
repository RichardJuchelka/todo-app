import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { initAmplify } from '../utils/bootstrap';
import { TodosPage } from './TodosPage';

export const App: React.FC = () => {
  initAmplify();

  return (
    <React.StrictMode>
      <BrowserRouter>
        <TodosPage />
      </BrowserRouter>
    </React.StrictMode>
  );
};
