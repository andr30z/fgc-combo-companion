import { useEffect, useRef } from 'react';

export function useClickAway(cb: (document: MouseEvent | TouchEvent) => void) {
  const ref = useRef<HTMLElement>(null);
  const refCb = useRef(cb);

  useEffect(() => {
    const handler = (e: MouseEvent | TouchEvent) => {
      if (!e.target) {
        return;
      }
      const element = ref.current;
      if (element && !element.contains(e.target as Node)) {
        refCb.current(e);
      }
    };

    document.addEventListener('mousedown', handler);
    document.addEventListener('touchstart', handler);

    return () => {
      document.removeEventListener('mousedown', handler);
      document.removeEventListener('touchstart', handler);
    };
  }, []);

  return ref;
}
