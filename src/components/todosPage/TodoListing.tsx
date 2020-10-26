import React, { useContext } from 'react';
import {
  Alert,
  ListGroup,
} from 'react-bootstrap';
import { Loader } from '../generic/Loader';
import { TodoListItem } from './TodoListItem';
import { TodosContext } from './TodosContextManager';

export const TodoListing: React.FC = () => {
  const { data, isLoading } = useContext(TodosContext);

  if (isLoading) {
    return <Loader />;
  }

  if (!data) {
    return (
      <Alert variant="success">
        All done! What a feeling, right?
      </Alert>
    );
  }

  return (
    <ListGroup>
      {data.map((todoItem) => <TodoListItem key={todoItem.id} todo={todoItem} />)}
    </ListGroup>
  );
};
