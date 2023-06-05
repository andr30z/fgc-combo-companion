import { useEffect } from 'react';

export function useHideScrollbar() {
  useEffect(function hideScrollBar() {
    document.body.classList.add('no-scrollbar');
    return () => {
      document.body.classList.remove('no-scrollbar');
    };
  }, []);
}
