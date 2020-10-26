import {
  act,
  renderHook,
} from '@testing-library/react-hooks';
import { API } from 'aws-amplify';
import { useDataLoader } from './useDataLoader';

const waitTimeout = { timeout: 25 };

describe('useDataLoader', () => {
  it('returns correct values when fetch in progress', async () => {
    API.graphql = jest.fn().mockImplementation(() => {
      return new Promise(() => { return; });
    });

    const { result } = renderHook(() => useDataLoader('queryA'));

    expect(result.current[0]).toBe(undefined);
    expect(result.current[1]).toBe(undefined);
    expect(result.current[2]).toBe(true);
    expect(result.error).toBe(undefined);
  });

  it('returns correct values after successful fetch', async () => {
    let queryAResolve = () => { return; }

    API.graphql = jest.fn().mockImplementation(() => {
      return new Promise((resolve) => queryAResolve = () => resolve({ data: 'queryA_data' }));
    });

    const { result, waitForNextUpdate } = renderHook(() => useDataLoader('queryA'));

    expect(result.current[0]).toBe(undefined);
    expect(result.current[1]).toBe(undefined);
    expect(result.current[2]).toBe(true);
    expect(result.error).toBe(undefined);

    await act(async () => {
      queryAResolve();
      await waitForNextUpdate(waitTimeout);
    });

    expect(result.current[0]).toBe('queryA_data');
    expect(result.current[1]).toBe(undefined);
    expect(result.current[2]).toBe(false);
    expect(result.error).toBe(undefined);
  });

  it('refetches when fetcher changes', async () => {
    const queryA = 'queryA';
    const queryB = 'queryB';
    let queryAResolve = () => { return; }
    let queryBResolve = () => { return; }
    API.graphql = jest.fn().mockImplementation(({ query }) => {
      return query === queryA
        ? new Promise((resolve) => queryAResolve = () => resolve({ data: `${query}_data` }))
        : new Promise((resolve) => queryBResolve = () => resolve({ data: `${query}_data` }));
    });

    let query = queryA;
    const { result, rerender, waitForNextUpdate } = renderHook(() => useDataLoader(query));

    expect(result.current[0]).toBe(undefined);
    expect(result.current[1]).toBe(undefined);
    expect(result.current[2]).toBe(true);
    expect(result.error).toBe(undefined);

    await act(async () => {
      queryAResolve();
      await waitForNextUpdate(waitTimeout);
    });

    expect(result.current[0]).toBe('queryA_data');
    expect(result.current[1]).toBe(undefined);
    expect(result.current[2]).toBe(false);
    expect(result.error).toBe(undefined);


    query = queryB;
    await act(async () => {
      rerender()
      await waitForNextUpdate(waitTimeout);
    });

    expect(result.current[0]).toBe(undefined);
    expect(result.current[1]).toBe(undefined);
    expect(result.current[2]).toBe(true);
    expect(result.error).toBe(undefined);

    await act(async () => {
      queryBResolve();
      await waitForNextUpdate(waitTimeout);
    });

    expect(result.current[0]).toBe('queryB_data');
    expect(result.current[1]).toBe(undefined);
    expect(result.current[2]).toBe(false);
    expect(result.error).toBe(undefined);
  });

  it('returns an error when fetching fails', async () => {
    const query = 'query';
    const errorMessage = 'HTTP 500: Narafali';
    let queryReject = () => { return; }
    API.graphql = jest.fn().mockImplementation(() => {
      return new Promise((_, reject) => queryReject = () => reject({ errors: [errorMessage] }));
    });

    const { result, waitForNextUpdate } = renderHook(() => useDataLoader(query));

    expect(result.current[0]).toBe(undefined);
    expect(result.current[1]).toBe(undefined);
    expect(result.current[2]).toBe(true);
    expect(result.error).toBe(undefined);

    await act(async () => {
      queryReject();
      await waitForNextUpdate(waitTimeout);
    });

    expect(result.current[0]).toBe(undefined);
    expect(result.current[1]).toStrictEqual([errorMessage]);
    expect(result.current[2]).toBe(false);
    expect(result.error).toBe(undefined);
  });

  it('prevents older request from updating the state when newer request already did', async () => {
    const queryA = 'queryA';
    const queryB = 'queryB';
    let queryAResolve = () => { return; }
    let queryBResolve = () => { return; }
    API.graphql = jest.fn().mockImplementation(({ query }) => {
      return query === queryA
        ? new Promise((resolve) => queryAResolve = () => resolve({ data: `${query}_data` }))
        : new Promise((resolve) => queryBResolve = () => resolve({ data: `${query}_data` }));
    });

    let query = queryA;
    const { result, rerender, waitForNextUpdate } = renderHook(() => useDataLoader(query));

    expect(result.current[0]).toBe(undefined);
    expect(result.current[1]).toBe(undefined);
    expect(result.current[2]).toBe(true);
    expect(result.error).toBe(undefined);

    query = queryB;
    await act(async () => {
      rerender()
    });

    expect(result.current[0]).toBe(undefined);
    expect(result.current[1]).toBe(undefined);
    expect(result.current[2]).toBe(true);
    expect(result.error).toBe(undefined);

    queryBResolve();
    await waitForNextUpdate(waitTimeout);

    expect(result.current[0]).toBe('queryB_data');
    expect(result.current[1]).toBe(undefined);
    expect(result.current[2]).toBe(false);
    expect(result.error).toBe(undefined);

    queryAResolve();
    await act(async () => {
      rerender()
    });

    expect(result.current[0]).toBe('queryB_data');
    expect(result.current[1]).toBe(undefined);
    expect(result.current[2]).toBe(false);
    expect(result.error).toBe(undefined);
  });
});
