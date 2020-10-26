import React, {
  createContext,
  useMemo,
} from 'react';
import { ListTodosQuery } from '../API';
import { listTodos } from '../graphql/queries';
import { useDataLoader } from '../hooks/useDataLoader';
import { Todo } from '../models/Todo';

export const TodosContext = createContext<ReadonlyArray<Todo> | null>(null);

export const TodosContextManager: React.FC = ({ children }) => {
  const [data] = useDataLoader<ListTodosQuery>(listTodos);
  const todos = useMemo(() => {
    return data?.listTodos?.items?.map(todo => ({ id: todo.id, title: todo.title })) ?? null;
  }, [data]) ;

  return (
    <TodosContext.Provider value={todos}>
      {children}
    </TodosContext.Provider>
  );
};
