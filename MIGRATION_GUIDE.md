/**
 * MIGRATION GUIDE - Converting Existing Components
 * 
 * Step-by-step guide to refactor existing components
 */

# Migration Guide

## Overview
This guide helps you move existing components from the old structure to the new production-ready architecture.

## Before & After Examples

### Example 1: Projects Component

#### BEFORE (Old Structure)
```javascript
// src/components/Projects.jsx
import { useState, useEffect } from 'react';
import { publicAPI } from '../api/endpoints';
import { getImageUrl } from '../api/clients';

export function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const response = await publicAPI.getProjects();
        setProjects(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {projects.map(p => (
        <div key={p.id}>
          <img src={getImageUrl(p.image)} alt={p.title} />
          <h3>{p.title}</h3>
        </div>
      ))}
    </div>
  );
}
```

#### AFTER (New Structure)
```javascript
// src/features/public/projects/pages/ProjectsPage.jsx
import { useEffect } from 'react';
import { useApi } from '@/core/hooks';
import { publicProjectsService } from '@/api/services';
import { getImageUrl } from '@/shared/utils';
import PageLoader from '@/shared/components/Loading/PageLoader';
import ProjectCard from '../components/ProjectCard';

/**
 * Projects Page
 * 
 * Responsibility: Display paginated list of projects
 * Uses service layer for API calls
 */
export function ProjectsPage() {
  const { data, loading, error, execute } = useApi();

  useEffect(() => {
    execute((signal) => 
      publicProjectsService.getAll({ page: 1, limit: 9 }, signal)
    );
  }, [execute]);

  if (loading) return <PageLoader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <section>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {data?.projects?.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}

export default ProjectsPage;
```

```javascript
// src/features/public/projects/components/ProjectCard.jsx
import { useState } from 'react';
import { getImageUrl } from '@/shared/utils';
import { FALLBACK_PROJECT_IMAGE } from '@/config/constants';

/**
 * Project Card Component
 * 
 * Responsibility: Display single project card
 * Props: project (object)
 */
function ProjectCard({ project }) {
  const [imgSrc, setImgSrc] = useState(
    getImageUrl(project.coverImageUrl) || FALLBACK_PROJECT_IMAGE
  );
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="rounded-lg overflow-hidden bg-white border border-gray-200 cursor-pointer hover:shadow-lg transition"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative overflow-hidden h-48">
        <img
          src={imgSrc}
          alt={project.title}
          onError={() => setImgSrc(FALLBACK_PROJECT_IMAGE)}
          loading="lazy"
          className={`w-full h-full object-cover transition-transform duration-300 ${
            hovered ? 'scale-105' : 'scale-100'
          }`}
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg">{project.title}</h3>
        <p className="text-gray-600 text-sm">{project.category}</p>
      </div>
    </div>
  );
}

export default ProjectCard;
```

### Example 2: Admin Login Component

#### BEFORE (Old Structure)
```javascript
// src/components/admin/AdminLogin.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuthContext } from '../context/AuthContext';

export function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuthContext();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', {
        email,
        password,
      });

      const { accessToken, refreshToken, user } = response.data.data;
      login(accessToken, refreshToken, user);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Admin Login</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <form onSubmit={handleLogin}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
        />
        <button type="submit" disabled={loading} style={{ width: '100%', padding: '10px' }}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}
```

#### AFTER (New Structure)
```javascript
// src/features/auth/pages/LoginPage.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/core/hooks';
import { useApi } from '@/core/hooks';
import { useToast } from '@/shared/components/Toast/ToastContext';
import { authService } from '@/api/services';
import { ValidationService } from '@/core/services';
import LoginForm from '../components/LoginForm';

/**
 * Login Page
 * 
 * Responsibility: Manage login flow
 * Uses hooks for state management and API calls
 */
export function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { showToast } = useToast();
  const { execute, loading, error } = useApi();

  const handleLogin = async (formData) => {
    // Validate form
    const { isValid, errors: validationErrors } = ValidationService.validateForm(
      formData,
      {
        email: [{ type: 'email', message: 'Invalid email' }],
        password: [{ type: 'required', message: 'Password required' }],
      }
    );

    if (!isValid) {
      showToast.error(Object.values(validationErrors)[0]);
      return;
    }

    // Execute login
    const result = await execute((signal) =>
      authService.login(formData, signal)
    );

    if (result.success) {
      const { accessToken, refreshToken, user } = result.data.data;
      login(accessToken, refreshToken, user);
      showToast.success('Login successful');
      navigate('/admin/dashboard', { replace: true });
    } else {
      showToast.error(result.error || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-8">Admin Login</h1>
        <LoginForm onSubmit={handleLogin} isLoading={loading} error={error} />
      </div>
    </div>
  );
}

export default LoginPage;
```

```javascript
// src/features/auth/components/LoginForm.jsx
import { useState } from 'react';
import { useToast } from '@/shared/components/Toast/ToastContext';

/**
 * Login Form Component
 * 
 * Responsibility: Render login form UI
 * Props: onSubmit (function), isLoading (bool), error (string)
 */
function LoginForm({ onSubmit, isLoading, error }) {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="admin@example.com"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="••••••••"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded-md transition"
      >
        {isLoading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}

export default LoginForm;
```

## Step-by-Step Migration Checklist

### 1. **Analyze Current Component**
- [ ] Identify what the component does
- [ ] List all API calls
- [ ] Check styling approach (inline, CSS, Tailwind)
- [ ] Find parent/child relationships

### 2. **Plan New Structure**
- [ ] Determine which feature folder it belongs to
- [ ] Split into page and sub-components
- [ ] Identify what goes in services

### 3. **Create API Service** (if needed)
- [ ] Extract API logic into service
- [ ] Follow the service pattern (getAll, getById, create, etc.)
- [ ] Add signal parameter for request cancellation
- [ ] Export from services index

### 4. **Create Page Component**
- [ ] Import useApi hook
- [ ] Import service
- [ ] Replace useState with useApi
- [ ] Use execute() to call service
- [ ] Add loading and error states
- [ ] Update import paths

### 5. **Extract Sub-components**
- [ ] Break large components into smaller ones
- [ ] Move reusable components to shared/components
- [ ] Pass data via props (don't re-fetch in sub-components)

### 6. **Update Styling**
- [ ] Convert inline styles to Tailwind classes
- [ ] Move component-specific styles to CSS modules or Tailwind
- [ ] Global styles stay in shared/styles

### 7. **Update Imports**
- [ ] Change relative imports to alias imports
- [ ] Use @ for src folder (configured in vite.config.js)
- [ ] Example: `import { useApi } from '@/core/hooks'`

### 8. **Add Error Handling**
- [ ] Check for result.success
- [ ] Show user-friendly error messages
- [ ] Use useToast for notifications

### 9. **Test**
- [ ] Verify API calls work
- [ ] Check loading states
- [ ] Test error scenarios
- [ ] Validate responsive design

### 10. **Documentation**
- [ ] Add JSDoc comments
- [ ] Document component props
- [ ] Update architecture docs if new patterns used

## Common Patterns

### Pattern 1: Fetch on Mount
```javascript
useEffect(() => {
  execute((signal) => 
    publicProjectsService.getAll({}, signal)
  );
}, [execute]);
```

### Pattern 2: Dependent Fetches
```javascript
useEffect(() => {
  if (id) {
    execute((signal) => 
      publicProjectsService.getById(id, signal)
    );
  }
}, [id, execute]);
```

### Pattern 3: Form Submission
```javascript
const handleSubmit = async (formData) => {
  const result = await execute((signal) =>
    adminProjectsService.create(formData, signal)
  );

  if (result.success) {
    toast.success('Created successfully');
  } else {
    toast.error(result.error);
  }
};
```

### Pattern 4: Pagination
```javascript
const [page, setPage] = useState(1);

useEffect(() => {
  execute((signal) =>
    publicProjectsService.getAll({ page, limit: 10 }, signal)
  );
}, [page, execute]);
```

## File Name Conventions

```
Components: PascalCase.jsx
  - ProjectCard.jsx
  - LoginForm.jsx
  
Services: camelCase.service.js
  - projects.service.js
  - auth.service.js
  
Pages: PascalCase + "Page".jsx
  - ProjectsPage.jsx
  - LoginPage.jsx
  
Hooks: camelCase + "useHookName"
  - useApi.js
  - useDebounce.js
  
Utils: camelCase.utils.js
  - image.utils.js
  - helpers.js
```

## Import Path Aliases

In `vite.config.js`:
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

Usage:
```javascript
// Instead of: import { useApi } from '../../../core/hooks'
import { useApi } from '@/core/hooks'

// Instead of: import { getImageUrl } from '../../shared/utils'
import { getImageUrl } from '@/shared/utils'
```

---

**Happy Migrating!** 🚀

For questions or issues, refer to ARCHITECTURE.md or the example components in the codebase.
