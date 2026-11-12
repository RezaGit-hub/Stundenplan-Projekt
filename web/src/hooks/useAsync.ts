import { useState, useEffect, useCallback } from 'react';

interface AsyncState<T> {
  data: T | null;
  error: Error | null;
  isLoading: boolean;
}

export function useAsync<T>(load: () => Promise<T>) {
  /*load holt die Daten. immer dieselbe Funktion sein, z.b getTeacher */
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    error: null,
    isLoading: true,
  });

  const [attempt, setAttempt] =
    useState(0); /* eine Zähler, dass es den Effekt bei neu Laden einlöst */

  useEffect(() => {
    let isCurrent = true; /* Merker , dass ide anfrage noch aktuell ist (AufräumFinktion unten) */
    load()
      .then((data) => {
        if (isCurrent) setState({ data, error: null, isLoading: false });
      })
      .catch((error: unknown) => {
        /*sicher wir ab, dass es eine echte Error mit Message geworfen sein */
        if (isCurrent) {
          setState({
            data: null,
            error: error instanceof Error ? error : new Error(String(error)),
            isLoading: false,
          });
        }
      });

    return () => {
      // >> Aufräumfunktion: React ruft sie auf, wenn die Komponente verschwindet oder der
      // >> Effekt neu startet. Eine alte, langsame Antwort darf dann keinen State mehr
      // >> überschreiben (sonst "gewinnt" eine veraltete Antwort, ein klassischer Fehler).
      isCurrent = false;
    };
  }, [load, attempt]);

  // >> useCallback hält die Funktion über alle Renderings stabil. Das ist wichtig, wenn
  // >> eine Seite sie später als Abhängigkeit oder Prop weitergibt.
  const reload = useCallback(() => {
    setState((previos) => ({ ...previos, error: null, isLoading: true }));
    setAttempt((count) => count + 1);
  }, []);

  return { ...state, reload };
}
