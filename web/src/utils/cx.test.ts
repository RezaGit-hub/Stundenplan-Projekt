import { describe, expect, it } from 'vitest';
import { cx } from './cx';

describe('cx', () => {
  //descript gruppoert tests unter einem Namen
  it('joins class names with a single spce', () => {
    //it('Beschrebung, ()) beschreibt eine Erswatete Verhalten
    expect(cx('a', 'b')).toBe('a b'); //except(ergebniss).tobe(erwartet) vergleich  mit ===
  });

  it('ignores fales, undefined, null and empty strings ', () => {
    expect(cx('a', false, null, undefined, '', 'b')).toBe('a b');
  });

  it('supprts conditional classes', () => {
    const isActive = false;
    expect(cx('base', isActive && 'active')).toBe('base');
  });

  it('return an empty string without arguments', () => {
    expect(cx()).toBe('');
  });
});
