import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { LazyMotion, domAnimation } from 'framer-motion'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext'
import { ToastProvider } from './components/common/Toast'
import ErrorBoundary from './components/common/ErrorBoundary'

// Load Bootstrap JS only when needed (after page load)
const loadBootstrap = () => {
  import('bootstrap/dist/js/bootstrap.bundle.min.js').catch(() => {
    // Silently fail in production - Bootstrap JS is optional for most features
  })
}

// Load Bootstrap JS after page is interactive
if (typeof window !== 'undefined') {
  if (document.readyState === 'complete') {
    loadBootstrap()
  } else {
    window.addEventListener('load', loadBootstrap, { once: true })
  }
}

// Render without StrictMode in production (double rendering removed)
const AppWrapper = () => (
  <BrowserRouter>
    <ErrorBoundary>
      <AuthProvider>
        <ToastProvider>
          <LazyMotion features={domAnimation}>
            <App />
          </LazyMotion>
        </ToastProvider>
      </AuthProvider>
    </ErrorBoundary>
  </BrowserRouter>
)

createRoot(document.getElementById('root')).render(<AppWrapper />)