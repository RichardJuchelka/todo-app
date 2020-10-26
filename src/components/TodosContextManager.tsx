import React, { createContext } from 'react';
import { useDataLoader } from '../hooks/useDataLoader';
import { Todo } from '../models/Todo';
import { todolist } from '../queries/todoList';

export const TodosContext = createContext<ReadonlyArray<Todo> | null>(null);

export const TodosContextManager: React.FC = ({ children }) => {
  const [data] = useDataLoader(todolist);

  return (
    <TodosContext.Provider value={data}>
      {children}
    </TodosContext.Provider>
  );
};
