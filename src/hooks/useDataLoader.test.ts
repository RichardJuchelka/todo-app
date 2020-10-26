import {
  act,
  renderHook,
} from '@testing-library/react-hooks';
import { useDataLoader } from './useDataLoader';

const waitTimeout = { timeout: 25 };

describe('useDataLoader', () => {
  it('returns correct values when fetch in progress', async () => {
    const fetcher = () => Promise.resolve([1, 2, 3]);
    const { result, waitForNextUpdate } = renderHook(() => useDataLoader(fetcher));

    expect(result.current[0]).toBe(null);
    expect(result.current[1]).toBe(null);
    expect(result.current[2]).toBe(true);
    expect(result.error).toBe(undefined);

    await act(async () => {
      await waitForNextUpdate(waitTimeout);
    });
  });

  it('returns correct values after successful fetch', async () => {
    const fetcher = () => Promise.resolve([1, 2, 3]);
    const { result, waitForNextUpdate } = renderHook(() => useDataLoader(fetcher));

    await act(async () => {
      await waitForNextUpdate(waitTimeout);
    });

    expect(result.current[0]).toStrictEqual([1, 2, 3]);
    expect(result.current[1]).toBe(null);
    expect(result.current[2]).toBe(false);
    expect(result.error).toBe(undefined);
  });

  it('refetches when fetcher changes', async () => {
    const fetcherA = () => new Promise((resolve) => resolve([1, 2, 3]));
    const fetcherB = () => new Promise((resolve) => resolve([4, 5, 6]));
    let fetcher = fetcherA;
    const { result, waitForNextUpdate, rerender } = renderHook(() => useDataLoader(fetcher));

    await act(async () => {
      await waitForNextUpdate(waitTimeout);
    });

    expect(result.current[0]).toStrictEqual([1, 2, 3]);

    fetcher = fetcherB;
    await act(async () => {
      rerender()
      await waitForNextUpdate(waitTimeout);
    });

    expect(result.current[0]).toStrictEqual([4, 5, 6]);
  });

  it('returns an error when fetching fails', async () => {
    const errorMessage = 'HTTP 500: Narafali';
    const fetcher = () => Promise.reject(errorMessage);
    const { result, waitForNextUpdate } = renderHook(() => useDataLoader(fetcher));

    await act(async () => {
      await waitForNextUpdate(waitTimeout);
    });

    expect(result.current[0]).toBe(null);
    expect(result.current[1]).toBe(errorMessage);
    expect(result.current[2]).toBe(false);
    expect(result.error).toBe(undefined);
  });

  it('prevents older request from updating the state when newer request already did', async () => {
    let fetcherAResolve = () => { return; }
    const fetcherA = () => new Promise((resolve) => fetcherAResolve = () => resolve('A'));
    let fetcherBResolve = () => { return; }
    const fetcherB = () => new Promise((resolve) => fetcherBResolve = () => resolve('B'));

    let fetcher = fetcherA;
    const { result, waitForNextUpdate, rerender } = renderHook(() => useDataLoader(fetcher));

    expect(result.current[0]).toBe(null);
    expect(result.current[2]).toBe(true);

    fetcher = fetcherB;
    await act(async () => {
      rerender()
    });
    fetcherBResolve();
    await waitForNextUpdate(waitTimeout);

    expect(result.current[0]).toBe('B');
    expect(result.current[1]).toBe(null);
    expect(result.current[2]).toBe(false);

    fetcherAResolve();
    await act(async () => {
      rerender()
    });

    expect(result.current[0]).toBe('B');
    expect(result.current[1]).toBe(null);
    expect(result.current[2]).toBe(false);

    expect(result.error).toBe(undefined);
  });
});
