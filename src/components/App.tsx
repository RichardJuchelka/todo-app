import React from 'react';
import { useDataLoader } from '../hooks/useDataLoader';
import { todolist } from '../queries/todoList';
import { List } from '../component-library/List';
import { TodoListItem } from './TodoListItem';

export const App: React.FC = () => {
  const [data] = useDataLoader(todolist);

  return (
    <List
      data={data || []}
      renderItem={(todoItem) => <TodoListItem key={todoItem.id} todo={todoItem} />}
    />
  );
};
