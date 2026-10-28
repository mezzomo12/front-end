import { useCallback, useEffect, useState } from 'react';

// Executa `load` ao montar e a cada `reload()`, expondo { data, loading, error, reload }.
// `load` deve ser estável (useCallback) para não disparar novas chamadas a cada render.
export default function useAsync(load) {
  const [state, setState] = useState({ data: null, loading: true, error: null });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let cancelled = false;

    load()
      .then((data) => {
        if (!cancelled) setState({ data, loading: false, error: null });
      })
      .catch((error) => {
        if (!cancelled) setState({ data: null, loading: false, error });
      });

    return () => {
      cancelled = true;
    };
  }, [load, attempt]);

  const reload = useCallback(() => {
    setState({ data: null, loading: true, error: null });
    setAttempt((count) => count + 1);
  }, []);

  return { ...state, reload };
}
