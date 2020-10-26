import React, {
  createContext,
  useMemo,
} from 'react';
import { ListTodosQuery } from '../../API';
import { listTodos } from '../../graphql/queries';
import { useDataLoader } from '../../hooks/useDataLoader';
import { Todo } from '../../models/Todo';

type TodosContextShape = {
  readonly data: ReadonlyArray<Todo> | null;
  readonly hasError: boolean;
  readonly isLoading: boolean;
}

export const TodosContext = createContext<TodosContextShape>({ data: null, hasError: false, isLoading: false });

export const TodosContextManager: React.FC = ({ children }) => {
  const [data, errors, isLoading] = useDataLoader<ListTodosQuery>(listTodos);

  const todos = useMemo(() => {
    const todoItems = data?.listTodos?.items?.map(todo => ({ id: todo.id, title: todo.title })) ?? null;
    return {
      data: todoItems,
      hasError: !!errors,
      isLoading,
    };
  }, [data, errors, isLoading]);

  return (
    <TodosContext.Provider value={todos}>
      {children}
    </TodosContext.Provider>
  );
};
