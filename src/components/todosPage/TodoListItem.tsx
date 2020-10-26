import React from 'react';
import { ListGroup } from 'react-bootstrap';
import {
  useHistory,
  useRouteMatch,
} from 'react-router';
import {
  buildPath,
  TodoDetailRouteParams,
  todoDetailRoutePath,
} from '../../utils/routing';
import { Todo } from '../../models/Todo';

type TodoListItemProps = {
  readonly todo: Todo;
}

export const TodoListItem: React.FC<TodoListItemProps> = ({ todo }) => {
  const history = useHistory();
  const path = buildPath<TodoDetailRouteParams>(todoDetailRoutePath, { id: todo.id });
  const match = useRouteMatch(path)

  return (
    <ListGroup.Item
      action
      active={!!match}
      className="text-truncate"
      onClick={() => history.push(path)}
    >
      {todo.title}
    </ListGroup.Item>
  );
};
