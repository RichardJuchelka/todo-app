import React, { useContext } from 'react';
import { Card } from 'react-bootstrap';
import { Loader } from '../generic/Loader';
import { TodosContext } from './TodosContextManager';

type TodoDetailProps = {
  readonly id: Id;
}

export const TodoDetail: React.FC<TodoDetailProps> = ({ id }) => {
  const data = useContext(TodosContext);
  const todoItem = data?.find(item => item.id === id);

  if (!todoItem) {
    return <Loader />;
  }

  return (
    <Card>
      <Card.Body>
        <Card.Text>
          {todoItem.title}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};
