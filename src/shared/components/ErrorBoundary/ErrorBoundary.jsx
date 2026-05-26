/**
 * Error Boundary Component
 * 
 * Responsibility: Catch React errors and display fallback UI
 */

import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);

    // Send to error tracking service here
    if (import.meta.env.VITE_ENABLE_ERROR_TRACKING === 'true') {
      // Sentry, LogRocket, etc.
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            backgroundColor: '#f9fafb',
          }}
        >
          <div
            style={{
              maxWidth: '500px',
              textAlign: 'center',
              backgroundColor: '#fff',
              padding: '40px 20px',
              borderRadius: '8px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            }}
          >
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#dc2626', marginBottom: '10px' }}>
              Something went wrong
            </h1>
            <p style={{ color: '#6b7280', marginBottom: '20px' }}>
              We apologize for the inconvenience. Please try refreshing the page.
            </p>
            {import.meta.env.DEV && (
              <details style={{ textAlign: 'left', backgroundColor: '#f3f4f6', padding: '10px', borderRadius: '4px' }}>
                <summary style={{ cursor: 'pointer', fontWeight: '500' }}>Error details</summary>
                <pre
                  style={{
                    fontSize: '12px',
                    color: '#dc2626',
                    marginTop: '10px',
                    overflow: 'auto',
                  }}
                >
                  {this.state.error?.toString()}
                </pre>
              </details>
            )}
            <button
              onClick={() => window.location.reload()}
              style={{
                marginTop: '20px',
                padding: '10px 20px',
                backgroundColor: '#3b82f6',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '14px',
              }}
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
