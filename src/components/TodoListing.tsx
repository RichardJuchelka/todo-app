import React, { useContext } from 'react';
import { List } from '../component-library/List';
import { TodoListItem } from './TodoListItem';
import { TodosContext } from './TodosContextManager';

export const TodoListing: React.FC = () => {
  const data = useContext(TodosContext);

  return (
    <List
      data={data ?? []}
      renderItem={(todoItem) => <TodoListItem key={todoItem.id} todo={todoItem} />}
    />
  );
};
