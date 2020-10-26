import React, { useContext } from 'react';
import { TodosContext } from './TodosContextManager';

type TodoDetailProps = {
  readonly id: Id;
}

export const TodoDetail: React.FC<TodoDetailProps> = ({ id }) => {
  const data = useContext(TodosContext);
  const todoItem = data?.find(item => item.id === id);

  return (
    <div>
      {todoItem?.title}
    </div>
  );
};
