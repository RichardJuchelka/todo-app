import React from 'react';
import { TodoListing } from './TodoListing';
import { TodosContextManager } from './TodosContextManager';

export const TodosPage: React.FC = () => {
  return (
    <TodosContextManager>
      <TodoListing />
    </TodosContextManager>
  );
};
