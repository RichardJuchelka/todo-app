import React, { useContext } from 'react';
import { ListGroup } from 'react-bootstrap';
import { TodoListItem } from './TodoListItem';
import { TodosContext } from './TodosContextManager';

export const TodoListing: React.FC = () => {
  const data = useContext(TodosContext);

  return (
    <ListGroup>
      {data?.map((todoItem) => <TodoListItem key={todoItem.id} todo={todoItem} />)}
    </ListGroup>
  );
};
