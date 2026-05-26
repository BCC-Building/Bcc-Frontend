/**
 * useApi Hook
 * 
 * Responsibility: Generic API call hook with loading/error/data states
 * Features:
 *  - AbortController: cancels requests on unmount
 *  - Race condition safe: only last request's data kept
 *  - Consistent return: { success, data, message, cancelled }
 */

import { useState, useCallback, useRef } from 'react';
import axios from 'axios';

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
      // Pass signal to the callback
      const response = await apiFn(controller.signal);

      if (!controller.signal.aborted) {
        setData(response.data);
        return { success: true, data: response.data };
      }

      return { success: false, cancelled: true };
    } catch (err) {
      if (
        err.name === 'CanceledError' ||
        err.name === 'AbortError' ||
        axios.isCancel(err)
      ) {
        return { success: false, cancelled: true };
      }

      const errorMsg = err.normalized?.message || err.message || 'An error occurred';
      setError(errorMsg);

      return {
        success: false,
        error: errorMsg,
        details: err.normalized || null,
      };
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Reset state manually
   */
  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  /**
   * Cleanup on unmount
   */
  const cleanup = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  }, []);

  return {
    data,
    loading,
    error,
    execute,
    reset,
    cleanup,
  };
}

export default useApi;
