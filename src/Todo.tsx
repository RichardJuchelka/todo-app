import React from 'react';
import { Link } from 'react-router-dom';
import { Todo } from './models/Todo';

type TodoListItemProps = {
  readonly todo: Todo;
}

export const TodoListItem: React.FC<TodoListItemProps> = ({ todo }) => {
  return (
    <div>
      <Link to={`/detail/${todo.id}`}>
        {todo.title}
      </Link>
    </div>
  );
};
