import React, {
  useContext,
} from 'react';
import { TodosContext } from './TodosContextManager';

type TodoDetailProps = {
  readonly id: string;
}

export const TodoDetail: React.FC<TodoDetailProps> = ({ id }) => {
  const todos = useContext(TodosContext);

  const todoItem = todos?.find(item => item.id === id);

  return (
    <div>
      {todoItem?.title}
    </div>
  );
};
