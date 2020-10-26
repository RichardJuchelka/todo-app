import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { initAmplify } from '../utils/bootstrap';
import { TodosPage } from './todosPage/TodosPage';

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
