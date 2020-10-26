import React from 'react';
import { Link } from 'react-router-dom';
import {
  buildPath,
  TodoDetailRouteParams,
  todoDetailRoutePath,
} from '../utils/routing';
import { Todo } from '../models/Todo';

type TodoListItemProps = {
  readonly todo: Todo;
}

export const TodoListItem: React.FC<TodoListItemProps> = ({ todo }) => {
  return (
    <div>
      <Link to={buildPath<TodoDetailRouteParams>(todoDetailRoutePath, { id: todo.id })}>
        {todo.title}
      </Link>
    </div>
  );
};
