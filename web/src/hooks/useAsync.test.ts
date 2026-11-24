import { describe, it, expect, vi } from 'vitest';
import { act, renderHook, waitFor } from '@testing-library/react';
import { useAsync } from './useAsync';

describe('useAsync', () => {
  it('starts loading and provide the data', async () => {
    const load = vi.fn().mockResolvedValue(['a', 'b']); //vi.fn erzugt eine Funktion instanze. mochResolveValue lässt sie ein erfülltes Promise ohne Netswerk ohne Wartelist liefern

    const { result } = renderHook(() => useAsync(load));

    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBeNull();

    // >> waitFor probiert die Prüfung wiederholt, bis sie stimmt (oder eine Zeitgrenze
    // >> abläuft). So wartet der Test auf die Antwort, ohne feste Wartezeit zu raten.
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.data).toEqual(['a', 'b']);
    expect(result.current.error).toBeNull();
  });

  it('provides the error when loading fails', async () => {
    // >> mockRejectedValue simuliert ein fehlgeschlagenes Laden (z. B. Server nicht erreichbar).
    const load = vi.fn().mockRejectedValue(new Error('boom'));

    const { result } = renderHook(() => useAsync(load));

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.error?.message).toBe('boom');
    expect(result.current.data).toBeNull();
  });

  it('loads again when reload is called', async () => {
    const load = vi.fn().mockResolvedValue('x');

    const { result } = renderHook(() => useAsync(load));
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    // >> Eine Attrappe merkt sich ihre Aufrufe. Hier zählen wir sie.
    expect(load).toHaveBeenCalledTimes(1);

    act(() => result.current.reload());

    await waitFor(() => expect(load).toHaveBeenCalledTimes(2));
  });
});
