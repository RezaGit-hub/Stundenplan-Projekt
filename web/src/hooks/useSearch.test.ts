import { act, renderHook } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useSearch } from './useSearch';

const items = [
  { id: 1, name: 'Weber' },
  { id: 2, name: 'Meyer' },
  { id: 3, name: 'Schulz' },
];

const getSearchText = (item: { name: string }) => item.name;

describe('useSearch', () => {
  it('return all items for an empty query', () => {
    //renderHook führt ein Hook in einer unsichtbaren components aus.
    const { result } = renderHook(() => useSearch(items, getSearchText));

    expect(result.current.results).toHaveLength(3); //result.current ist immer die Aktuelle Ausgabewert des Hokks.
  });

  it('filters case-insentively', () => {
    const { result } = renderHook(() => useSearch(items, getSearchText));
    //Änderung im State müssen in act(...) stehen, so sagt react, hier gibt es ein Update , Prüft erst es , bevor ich weiter führe
    act(() => result.current.setQuery('MEY'));

    expect(result.current.results).toEqual([{ id: 2, name: 'Meyer' }]);
  });

  it('ignore white space arund a query', () => {
    const { result } = renderHook(() => useSearch(items, getSearchText));

    act(() => result.current.setQuery('     Meyer   '));

    expect(result.current.results).toHaveLength(1);
  });

  it('return an empty list if nothing matches', () => {
    const { result } = renderHook(() => useSearch(items, getSearchText));

    act(() => result.current.setQuery('xyz'));

    expect(result.current.results).toEqual([]);
  });
});
