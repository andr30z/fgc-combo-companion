/* eslint-disable @typescript-eslint/no-explicit-any */
import { debounce } from 'lodash';
import { useCallback } from 'react';

export function useDebounce<F extends (...args: any[]) => any>(
  callback: F,
  timer = 1000,
  ...deps: any
) {
  return useCallback(debounce(callback, timer), deps);
}
