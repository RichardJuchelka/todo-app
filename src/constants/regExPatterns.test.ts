import { idPattern } from './regExPatterns';

describe('regExPatterns', () => {
  it('idPattern matches Uuid', () => {
    const idRegex = new RegExp(`^${idPattern}$`);

    expect(idRegex.test('ec5b15bb-e99d-4b3e-8541-c51ae3495243')).toBe(true);
    expect(idRegex.test('8541-c51ae3495243')).toBe(false);
    expect(idRegex.test('')).toBe(false);
    expect(idRegex.test('null')).toBe(false);
    expect(idRegex.test('undefined')).toBe(false);
    expect(idRegex.test('0')).toBe(false);
  });
});
