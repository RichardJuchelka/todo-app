import React from 'react';
import { useDataLoader } from './hooks/useDataLoader';
import { todolist } from './queries/todoList';
import Todo from './Todo';

export const App: React.FC = () => {
  const [data] = useDataLoader(todolist);

  return (
    <div>
      {data?.map((todo) => (
        <Todo
          key={todo.id}
          todo={todo}
        />
      ))}
    </div>
  );
};
