import {
  useEffect,
  useState,
} from 'react';

type FetchState<TData> = {
  readonly data: TData | null;
  readonly error: string | null;
  readonly isLoading: boolean;
};

/**
 * A hook for API agnostic Promise-based data loading.
 * @param fetcher Async function containing an implementation of data fetching. It is called whenever the reference changes.
 */
export function useDataLoader<TData>(fetcher: () => Promise<TData>): [data: TData | null, error: string | null, isLoading: boolean] {
  const [loaderState, setLoaderState] = useState<FetchState<TData>>({ data: null, error: null, isLoading: true });

  useEffect(() => {
    let isSubscribed = true;

    fetcher()
      .then(data => isSubscribed && setLoaderState({ data, error: null, isLoading: false }))
      .catch(error => isSubscribed && setLoaderState({ data: null, error: error, isLoading: false }));

    return () => {
      isSubscribed = false;
    }
  }, [fetcher]);

  return [loaderState.data, loaderState.error, loaderState.isLoading];
}
