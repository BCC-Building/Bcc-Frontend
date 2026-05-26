/**
 * useAsyncEffect Hook
 * 
 * Responsibility: Handle async operations in useEffect with cleanup
 */

import { useEffect, useRef } from 'react';

export function useAsyncEffect(asyncFn, dependencies = []) {
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;

    (async () => {
      if (isMountedRef.current) {
        await asyncFn();
      }
    })();

    return () => {
      isMountedRef.current = false;
    };
  }, dependencies);
}

export default useAsyncEffect;
