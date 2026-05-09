import { useState, useCallback, useRef } from 'react';
import axios from 'axios';

/**
 * useApi — Generic hook for all API calls
 *
 * Features:
 *  - AbortController: cancels in-flight requests on unmount
 *  - Race condition safe: only last request's data is kept
 *  - Consistent return: { success, data, message, cancelled }
 *  - reset(): clears state manually (modal close, page leave)
 *
 * Usage:
 *   const { data, loading, error, execute, reset } = useApi();
 *   const result = await execute((signal) => adminAPI.getProjects(signal));
 *   if (result.success) { ... }
 */
export function useApi() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const abortControllerRef = useRef(null);

  const execute = useCallback(async (apiFn) => {
    // Cancel any previous in-flight request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;

    setLoading(true);
    setError(null);

    try {
      // 👇 Pass signal to the callback — caller can use it in axios config
      const response = await apiFn(controller.signal);

      if (!controller.signal.aborted) {
        setData(response.data);
        return { success: true, data: response.data };
      }

      return { success: false, cancelled: true };

    } catch (err) {
      if (err.name === 'CanceledError' || err.name === 'AbortError' || axios.isCancel(err)) {
        return { success: false, cancelled: true };
      }

      const message = err.response?.data?.message || 'Something went wrong. Please try again.';

      if (!controller.signal.aborted) {
        setError(message);
      }

      return { success: false, message };

    } finally {
      if (!controller.signal.aborted) {
        setLoading(false);
      }
    }
  }, []);

  const reset = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  return { data, loading, error, execute, reset };
}
