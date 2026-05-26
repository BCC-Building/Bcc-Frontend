/**
 * QUICK START GUIDE
 * 
 * Get up and running with the new production-ready architecture
 */

# Quick Start Guide

## 🚀 Getting Started

### 1. Understanding the New Structure (5 minutes)

Read these in order:
1. **This file** (Quick Start Guide)
2. [RESTRUCTURING_SUMMARY.md](./RESTRUCTURING_SUMMARY.md) - Overview
3. [ARCHITECTURE.md](./ARCHITECTURE.md) - Deep dive
4. [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md) - When refactoring components
5. [BEST_PRACTICES.md](./BEST_PRACTICES.md) - Coding standards

### 2. Environment Setup (5 minutes)

Create `.env` file in root:
```env
VITE_API_BASE_URL=http://localhost:8080/api
VITE_API_IMAGE_BASE_URL=http://localhost:8080
VITE_ENABLE_LOGGING=true
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_ERROR_TRACKING=false
```

For production (`.env.production`):
```env
VITE_API_BASE_URL=https://api.yourdomain.com/api
VITE_API_IMAGE_BASE_URL=https://api.yourdomain.com
VITE_ENABLE_LOGGING=false
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_ERROR_TRACKING=true
```

### 3. Start Development (2 minutes)

```bash
npm install
npm run dev
```

---

## 📖 Common Tasks

### Fetching Data

```javascript
import { useApi } from '@/core/hooks';
import { publicProjectsService } from '@/api/services';

function MyComponent() {
  const { data, loading, error, execute } = useApi();

  useEffect(() => {
    execute((signal) => 
      publicProjectsService.getAll({}, signal)
    );
  }, []);

  if (loading) return <PageLoader />;
  if (error) return <ErrorMessage />;

  return <div>{/* render data */}</div>;
}
```

### Submitting a Form

```javascript
import { useApi } from '@/core/hooks';
import { useToast } from '@/shared/components/Toast/ToastContext';
import { authService } from '@/api/services';

function LoginForm() {
  const { execute, loading } = useApi();
  const { success, error: showError } = useToast();

  const handleSubmit = async (formData) => {
    const result = await execute((signal) =>
      authService.login(formData, signal)
    );

    if (result.success) {
      success('Login successful');
      // Handle success
    } else {
      showError(result.error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* form fields */}
      <button disabled={loading}>Submit</button>
    </form>
  );
}
```

### Showing Notifications

```javascript
import { useToast } from '@/shared/components/Toast/ToastContext';

function MyComponent() {
  const toast = useToast();

  return (
    <>
      <button onClick={() => toast.success('Done!')}>Success</button>
      <button onClick={() => toast.error('Oops!')}>Error</button>
      <button onClick={() => toast.info('Info')}>Info</button>
      <button onClick={() => toast.warning('Warning')}>Warning</button>
    </>
  );
}
```

### Using Validation

```javascript
import { ValidationService } from '@/core/services';

// Validate email
if (!ValidationService.isValidEmail(email)) {
  toast.error('Invalid email format');
}

// Validate form
const rules = {
  email: [{ type: 'email', message: 'Invalid email' }],
  password: [{ type: 'minLength', params: 8, message: 'Min 8 chars' }],
};

const { isValid, errors } = ValidationService.validateForm(formData, rules);

if (!isValid) {
  toast.error(Object.values(errors)[0]);
}
```

### Storing Data Locally

```javascript
import { useLocalStorage } from '@/core/hooks';

function MyComponent() {
  const [theme, setTheme] = useLocalStorage('theme', 'light');

  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      Toggle Theme (Current: {theme})
    </button>
  );
}
```

### Using Logger

```javascript
import { LoggerService } from '@/core/services';

// Debug (only in dev mode)
LoggerService.debug('Component', 'Data loaded');

// Info
LoggerService.info('User', 'Login successful');

// Warning
LoggerService.warn('Form', 'Field is empty');

// Error
LoggerService.error('API', 'Failed to load', error);

// Performance
LoggerService.performance('DataFetch', 250);
```

---

## 🎯 Creating a New Feature

### Step 1: Create Feature Folder
```
src/features/mynewfeature/
├── components/
├── pages/
├── hooks/
└── index.js
```

### Step 2: Create API Service (if needed)
```javascript
// src/api/services/admin/mynewfeature.service.js
export const adminMynewfeatureService = {
  getAll: (params, signal) => apiClient.get('/admin/mynewfeature', { params, signal }),
  create: (payload, signal) => apiClient.post('/admin/mynewfeature', payload, { signal }),
};
```

### Step 3: Create Page Component
```javascript
// src/features/mynewfeature/pages/MyNewFeaturePage.jsx
import { useEffect } from 'react';
import { useApi } from '@/core/hooks';
import { adminMynewfeatureService } from '@/api/services';

export function MyNewFeaturePage() {
  const { data, loading, execute } = useApi();

  useEffect(() => {
    execute((signal) => adminMynewfeatureService.getAll({}, signal));
  }, []);

  if (loading) return <PageLoader />;
  return <div>{/* render content */}</div>;
}

export default MyNewFeaturePage;
```

### Step 4: Add Route
```javascript
// src/App.jsx
const MyNewFeaturePage = lazy(() =>
  import('./features/mynewfeature/pages/MyNewFeaturePage')
);

// Add to Routes
<Route path="/mynewfeature" element={<MyNewFeaturePage />} />
```

---

## 🔍 Debugging Tips

### Check API Calls
1. Open DevTools Network tab
2. Look for `/api/*` requests
3. Check status, headers, response

### Check Logs
```javascript
// In development mode, logs appear in console
LoggerService.debug('MyComponent', 'Debug info');
```

### Check Storage
```javascript
// Inspect localStorage
console.log(localStorage.getItem('access_token'));

// Or use service
import { StorageService } from '@/core/services';
console.log(StorageService.getAccessToken());
```

### Check State
```javascript
// Use React DevTools browser extension
// Inspect components, props, hooks
```

---

## 📋 Checklist for New Developers

- [ ] Read RESTRUCTURING_SUMMARY.md
- [ ] Read ARCHITECTURE.md
- [ ] Clone repo and npm install
- [ ] Create .env file
- [ ] Run `npm run dev`
- [ ] Open http://localhost:5173
- [ ] Understand the folder structure
- [ ] Read a service file (e.g., projectsService)
- [ ] Read a component using useApi hook
- [ ] Try making a small change to understand the flow
- [ ] Read BEST_PRACTICES.md
- [ ] Read MIGRATION_GUIDE.md (for refactoring tasks)

---

## 🆘 Troubleshooting

### Issue: Module not found `@/...`
**Solution**: Vite path alias. Check vite.config.js has:
```javascript
resolve: {
  alias: {
    '@': path.resolve(__dirname, './src'),
  },
}
```

### Issue: API calls not working
**Solution**:
1. Check `.env` has correct `VITE_API_BASE_URL`
2. Check backend is running
3. Check network tab in DevTools
4. Check interceptors are being called

### Issue: Tokens not persisting
**Solution**:
1. Check StorageService is used
2. Check localStorage isn't cleared
3. Check token refresh logic in authInterceptor

### Issue: Components re-rendering too much
**Solution**:
1. Check useApi is in useEffect dependency
2. Check component is not re-fetching on every render
3. Use feature-specific hooks to avoid re-fetching

---

## 📚 Documentation Reference

| Document | Read When | Time |
|----------|-----------|------|
| RESTRUCTURING_SUMMARY.md | First time | 10 min |
| ARCHITECTURE.md | Understanding structure | 20 min |
| MIGRATION_GUIDE.md | Refactoring components | 30 min |
| BEST_PRACTICES.md | Writing new code | 25 min |
| FILE_INVENTORY.md | Finding files | 15 min |
| This file | Just started | 10 min |

---

## 🎨 Code Snippets

### Fetching with Error Handling
```javascript
const { data, loading, error, execute } = useApi();

useEffect(() => {
  execute((signal) => apiCall(signal));
}, []);

if (loading) return <PageLoader />;
if (error) return <ErrorMessage error={error} />;
return <div>{data}</div>;
```

### Form with Validation
```javascript
const [form, setForm] = useState({ email: '', password: '' });
const { success, error: showError } = useToast();
const { execute, loading } = useApi();

const handleSubmit = async (e) => {
  e.preventDefault();

  // Validate
  if (!ValidationService.isValidEmail(form.email)) {
    return showError('Invalid email');
  }

  // Submit
  const result = await execute((signal) =>
    authService.login(form, signal)
  );

  if (result.success) {
    success('Login successful');
  } else {
    showError(result.error);
  }
};
```

### Protected Component
```javascript
function AdminPanel() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <PageLoader />;
  if (!isAuthenticated) return <Navigate to="/login" />;

  return <div>Admin content</div>;
}
```

---

## 🚀 Next Steps

1. **Understand the architecture** - Read documentation
2. **Make a small change** - Modify existing component
3. **Add a new feature** - Follow the feature creation steps
4. **Refactor old code** - Use MIGRATION_GUIDE.md
5. **Follow best practices** - Reference BEST_PRACTICES.md

---

## 💡 Pro Tips

1. Always use `@/` imports - easier to refactor
2. Keep components small - easier to test
3. Use services for all API calls - consistency
4. Use hooks for logic - reusability
5. Check DevTools - fastest debugging
6. Read existing code - learn patterns
7. Ask questions - no stupid questions

---

**Ready to build?** 🎉

Start with understanding the structure, then follow the examples above.
Most common tasks are already shown.

Good luck! 🚀
