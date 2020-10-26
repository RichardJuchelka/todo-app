import {
  assert,
  assertPromise,
} from './assert';

it('assert function asserts condition', () => {
  expect(assert).toThrow('Assertion error: ');
  expect(() => assert(1 === 1, 'Numbers are not equal.')).not.toThrow();
  // @ts-ignore
  expect(() => assert(1 === 2, 'Numbers are not equal.')).toThrow('Numbers are not equal.');
  expect(() => assert({}, 'Input is falsy.')).not.toThrow();
  expect(() => assert(null, 'Input is falsy.')).toThrow('Input is falsy.');
  expect(() => assert('', 'Input is falsy.')).toThrow('Input is falsy.');
});

it('assertPromise function asserts condition', () => {
  const notAPromiseMessage = 'Value is not a Promise.';
  expect(assertPromise).toThrow(notAPromiseMessage);
  expect(() => assertPromise(new Promise(() => undefined))).not.toThrow();
  expect(() => assertPromise(Promise.resolve())).not.toThrow();
  expect(() => assertPromise(Promise.reject())).not.toThrow();
  expect(() => assertPromise('')).toThrow(notAPromiseMessage);
  expect(() => assertPromise(NaN)).toThrow(notAPromiseMessage);
  expect(() => assertPromise(undefined)).toThrow(notAPromiseMessage);
  expect(() => assertPromise({})).toThrow(notAPromiseMessage);
  expect(() => assertPromise({ then: 1 })).toThrow(notAPromiseMessage);
  expect(() => assertPromise({ then: 1, catch: 2 })).toThrow(notAPromiseMessage);
});
