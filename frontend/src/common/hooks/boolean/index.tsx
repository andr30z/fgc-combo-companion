import { useCallback, useState } from 'react';

export function useBoolean(initialValue = false) {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback(() => {
    setValue((pastState) => !pastState);
  }, []);

  const setFalse = useCallback(() => {
    setValue(false);
  }, []);

  const setTrue = useCallback(() => {
    setValue(true);
  }, []);

  return [value, { toggle, setFalse, setTrue, setValue }] as const;
}
