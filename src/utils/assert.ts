export function assert(condition: any, message: string): asserts condition {
  if (!condition) {
    throw new Error(`Assertion error: ${message}`);
  }
}

export function assertPromise<TReturn>(input: any): asserts input is Promise<TReturn> {
  const isPromise = typeof (input) === 'object'
    && typeof (input.then) === 'function'
    && typeof (input.catch) === 'function';
  assert(isPromise, 'Value is not a Promise.');
}
