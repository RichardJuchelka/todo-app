import React from 'react';
import { Route, RouteComponentProps } from 'react-router';
import {
  TodoDetailRouteParams,
  todoDetailRoutePath,
} from '../utils/routing';
import { TodoDetail } from './TodoDetail';
import { TodoListing } from './TodoListing';
import { TodosContextManager } from './TodosContextManager';

export const TodosPage: React.FC = () => {
  return (
    <TodosContextManager>
      <TodoListing />
      <Route
        path={todoDetailRoutePath}
        render={({ match }: RouteComponentProps<TodoDetailRouteParams>) => (
          <TodoDetail id={match.params.id} />
        )}
      />
    </TodosContextManager>
  );
};
