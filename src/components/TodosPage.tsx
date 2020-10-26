import React from 'react';
import { Route, RouteComponentProps } from 'react-router';
import { TodoDetail } from './TodoDetail';
import { TodoListing } from './TodoListing';
import { TodosContextManager } from './TodosContextManager';

const todoDetailRoutePath = '/detail/:id';

type TodoDetailRouteParams = {
  readonly id: Id;
}

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
