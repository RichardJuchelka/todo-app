import { GraphQLResult } from '@aws-amplify/api-graphql';
import {
  API,
  graphqlOperation,
} from 'aws-amplify';
import {
  useEffect,
  useState,
} from 'react';
import { assertPromise } from '../utils/assert';

type Data<TQuery> = GraphQLResult<TQuery>['data'];
type Errors<TQuery> = GraphQLResult<TQuery>['errors'];

type LoaderState<TQuery> = {
  readonly data: Data<TQuery>;
  readonly errors: Errors<TQuery>;
  readonly isLoading: boolean;
};

const initialLoaderState = { data: undefined, errors: undefined, isLoading: true };

export function useDataLoader<TQuery, TParams = never>(query: string, params?: TParams): [data: Data<TQuery>, error: Errors<TQuery>, isLoading: boolean] {
  const [loaderState, setLoaderState] = useState<LoaderState<TQuery>>(initialLoaderState);

  useEffect(() => {
    let isSubscribed = true;

    setLoaderState(initialLoaderState);

    const fetcher = API.graphql(graphqlOperation(query));
    assertPromise<GraphQLResult<TQuery>>(fetcher);

    const handleResponse = ({ data, errors }: GraphQLResult<TQuery>): void => {
      if (isSubscribed) {
        setLoaderState({ data, errors, isLoading: false });
      }
    };

    fetcher
      .then(handleResponse)
      .catch(handleResponse);

    return () => {
      isSubscribed = false;
    }
  }, [query, params]);

  return [loaderState.data, loaderState.errors, loaderState.isLoading];
}
