/**
 * ARCHITECTURE GUIDE - Production-Ready BCC Application
 * 
 * This document explains the restructured codebase and how to use it
 */

# Architecture Overview

## Folder Structure Explanation

### `src/config/` - Configuration
- `env.js` - Environment variables configuration
- `constants.js` - Global constants, status codes, error types
- **Purpose**: Centralized configuration management
- **SOLID Principle**: Single Responsibility - configuration only

### `src/api/` - API Layer
- `client.js` - Axios instance creation
- `interceptors/` - Request/response interceptors
- `services/` - Business logic services
  - `admin/` - Admin API services
  - `public/` - Public API services
- `models/` - API response type definitions
- **Purpose**: Abstraction layer for all backend communication
- **SOLID Principle**: 
  - Single Responsibility: Each service handles one domain
  - Dependency Inversion: Components depend on services, not direct API calls
  - Interface Segregation: Services expose only necessary methods

### `src/core/` - Core Application Logic
- `context/` - Global state (Auth)
- `services/` - Business logic services
  - `storage.service.js` - Local storage management
  - `logger.service.js` - Logging
  - `validation.service.js` - Form validation
- `hooks/` - Custom React hooks
  - `api/` - API-related hooks
  - `common/` - Common utility hooks
- `providers/` - Global providers setup
- **Purpose**: Core functionality shared across app
- **SOLID Principle**: Single Responsibility - each service/hook has one purpose

### `src/features/` - Feature Modules (Feature-Based Organization)
- `auth/` - Authentication feature
- `admin/` - Admin dashboard & management
- `public/` - Public pages (home, about, services, etc.)
- `layout/` - Layout components (Navbar, Footer, etc.)
- **Purpose**: Grouped by feature for better scalability
- **SOLID Principle**: Open/Closed - easy to add new features without modifying existing code

### `src/shared/` - Shared Resources
- `components/` - Reusable UI components
- `hooks/` - Shared React hooks
- `utils/` - Utility functions
- `constants/` - Shared constants
- `types/` - TypeScript types/JSDoc definitions
- `styles/` - Global styles
- **Purpose**: Truly reusable across features
- **SOLID Principle**: Interface Segregation - only include what's needed

## API Service Pattern (Example)

```javascript
// Bad - Direct API calls in component
const MyComponent = () => {
  const fetchProjects = async () => {
    const response = await axios.get('/api/projects');
    setProjects(response.data);
  };
};

// Good - Using service layer
import { publicProjectsService } from '@/api/services';
import { useApi } from '@/core/hooks';

const MyComponent = () => {
  const { execute, data, loading } = useApi();
  
  const loadProjects = async () => {
    const result = await execute((signal) => 
      publicProjectsService.getAll({}, signal)
    );
  };
};
```

### Benefits:
1. **Decoupling**: Components don't know about API endpoints
2. **Reusability**: Services used across multiple components
3. **Testability**: Services can be mocked easily
4. **Maintainability**: API changes only require service updates

## SOLID Principles Applied

### 1. Single Responsibility Principle
Each class/function has ONE reason to change.

```javascript
// ✅ Good - Single responsibility
class StorageService {
  static getToken() { /* storage only */ }
  static setToken() { /* storage only */ }
}

// ❌ Bad - Multiple responsibilities
class StorageAuthService {
  static getToken() { /* storage */ }
  static loginUser() { /* logic */ }
  static validateToken() { /* validation */ }
}
```

### 2. Open/Closed Principle
Open for extension, closed for modification.

```javascript
// ✅ Good - Easy to add new services without modification
src/api/services/admin/
  ├── projects.service.js
  ├── blogs.service.js
  ├── careers.service.js // New feature added easily
  
// ❌ Bad - Need to modify main API file for each new service
src/api/client.js // Modified every time
```

### 3. Liskov Substitution Principle
Subclasses should be substitutable for their parent.

```javascript
// ✅ Good - Services follow consistent interface
const adminProjectsService = {
  getAll: (params, signal) => {},
  getById: (id, signal) => {},
  create: (payload, signal) => {},
  update: (id, payload, signal) => {},
  delete: (id, signal) => {},
};

const adminBlogsService = {
  getAll: (params, signal) => {},
  getById: (id, signal) => {},
  create: (payload, signal) => {},
  update: (id, payload, signal) => {},
  delete: (id, signal) => {},
};

// Can be used interchangeably where same interface expected
```

### 4. Interface Segregation Principle
Many client-specific interfaces are better than one general-purpose interface.

```javascript
// ✅ Good - Segregated interfaces
const authService = {
  register: () => {},
  login: () => {},
  verifyOTP: () => {},
};

// Component only imports what it needs
import { authService } from '@/api/services';
authService.login(); // Type-safe, only this method available

// ❌ Bad - Fat interface
const apiService = {
  register: () => {},
  login: () => {},
  verifyOTP: () => {},
  getProjects: () => {},
  updateBlog: () => {},
  // ... 50 more methods
};
```

### 5. Dependency Inversion Principle
Depend on abstractions, not concrete implementations.

```javascript
// ✅ Good - Component depends on service abstraction
import { publicProjectsService } from '@/api/services';

const ProjectsList = () => {
  const { execute, data } = useApi();
  
  const load = () => execute((signal) => 
    publicProjectsService.getAll({}, signal)
  );
};

// Service can be easily mocked for testing
// Implementation can change without affecting component

// ❌ Bad - Direct dependency on implementation
const ProjectsList = () => {
  const load = async () => {
    const response = await axios.get('/api/projects');
    // Tightly coupled to axios, endpoint
  };
};
```

## Best Practices Implemented

### 1. Error Handling
```javascript
// Normalized error handling
try {
  const result = await execute(apiCall);
  if (!result.success) {
    // Handle error with normalized structure
    toast.error(result.error);
  }
} catch (error) {
  // Fallback error handling
}
```

### 2. Request Cancellation
```javascript
// Automatic cleanup on unmount
const { cleanup } = useApi();

useEffect(() => {
  return cleanup; // Cancels in-flight requests
}, []);
```

### 3. Token Refresh
```javascript
// Automatic token refresh on 401
// setupAuthInterceptor handles this transparently
// No component code needed
```

### 4. Performance
```javascript
// Lazy loading of routes
const ProjectsPage = lazy(() => 
  import('./features/public/projects/pages/ProjectsPage')
);

// Route-level code splitting
<Route path="/projects" element={<Suspense fallback={<PageLoader />}><ProjectsPage /></Suspense>} />
```

### 5. Accessibility
```javascript
// Skip to main content link
<a href="#main-content">Skip to main content</a>

// Proper ARIA labels
<main id="main-content" aria-label="Main content" tabIndex={-1}>
  {children}
</main>
```

## Usage Examples

### Making API Calls
```javascript
import { useApi } from '@/core/hooks';
import { publicProjectsService } from '@/api/services';

function ProjectsList() {
  const { data, loading, error, execute } = useApi();

  useEffect(() => {
    execute((signal) => 
      publicProjectsService.getAll({ page: 1 }, signal)
    );
  }, []);

  if (loading) return <PageLoader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div>
      {data?.projects.map(p => (
        <ProjectCard key={p.id} project={p} />
      ))}
    </div>
  );
}
```

### Using Storage Service
```javascript
import { StorageService } from '@/core/services';

// Get stored token
const token = StorageService.getAccessToken();

// Save user data
StorageService.setAdminUser(userData);

// Clear authentication
StorageService.clearAuth();
```

### Using Validation Service
```javascript
import { ValidationService } from '@/core/services';

const email = 'user@example.com';
if (!ValidationService.isValidEmail(email)) {
  showError('Invalid email');
}

// Validate form
const { isValid, errors } = ValidationService.validateForm(formData, {
  email: [{ type: 'required', message: 'Email is required' }],
  password: [{ type: 'minLength', params: 8, message: 'Min 8 chars' }],
});
```

### Using Logger Service
```javascript
import { LoggerService } from '@/core/services';

LoggerService.debug('Component', 'Loading started');
LoggerService.info('User', 'Login successful');
LoggerService.warn('Validation', 'Email format invalid');
LoggerService.error('API', 'Failed to fetch', error);
```

## Adding a New Feature

### Step 1: Create feature folder
```
src/features/mynewfeature/
├── components/
├── pages/
├── hooks/
└── index.js
```

### Step 2: Create API service (if needed)
```javascript
// src/api/services/admin/mynewfeature.service.js
export const adminMynewfeatureService = {
  getAll: (params, signal) => apiClient.get('/admin/mynewfeature', { params, signal }),
  getById: (id, signal) => apiClient.get(`/admin/mynewfeature/${id}`, { signal }),
  // ... etc
};

// Add to src/api/services/admin/index.js
export { default as adminMynewfeatureService } from './mynewfeature.service.js';
```

### Step 3: Create pages and components
```javascript
// src/features/mynewfeature/pages/MyNewFeaturePage.jsx
import { useApi } from '@/core/hooks';
import { adminMynewfeatureService } from '@/api/services';

export function MyNewFeaturePage() {
  const { data, loading, execute } = useApi();

  // Use service and hooks as shown in examples above
}

export default MyNewFeaturePage;
```

### Step 4: Add route
```javascript
// src/App.jsx
const MyNewFeaturePage = lazy(() => 
  import('./features/mynewfeature/pages/MyNewFeaturePage')
);

// Add to Routes
<Route path="/mynewfeature" element={<MyNewFeaturePage />} />
```

## Environment Variables

Create `.env` or `.env.production`:
```
VITE_API_BASE_URL=https://api.yourdomain.com/api
VITE_API_IMAGE_BASE_URL=https://api.yourdomain.com
VITE_ENABLE_LOGGING=true
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_ERROR_TRACKING=false
```

## Testing

### Mocking Services
```javascript
// __mocks__/api/services.js
export const publicProjectsService = {
  getAll: vi.fn().mockResolvedValue({ projects: [] }),
};

// In test
vi.mock('@/api/services', () => ({
  publicProjectsService: { getAll: vi.fn() },
}));
```

### Mocking Hooks
```javascript
// In test
vi.mock('@/core/hooks', () => ({
  useApi: () => ({
    data: mockData,
    loading: false,
    error: null,
    execute: vi.fn(),
  }),
}));
```

## Performance Optimization Tips

1. **Code Splitting**: Use lazy loading for routes
2. **Image Optimization**: Use getImageUrl helper
3. **Request Deduplication**: AbortController prevents duplicate requests
4. **Token Refresh**: Automatic, transparent to components
5. **Error Handling**: Normalized, consistent error handling
6. **Logging**: Only in development mode by default

## Migration Checklist for Existing Components

- [ ] Move component to feature folder
- [ ] Replace direct API calls with services
- [ ] Replace useState/useEffect with useApi hook
- [ ] Update import paths
- [ ] Remove inline styles, use Tailwind/CSS
- [ ] Add error handling
- [ ] Add loading states
- [ ] Test component with new services

---

**Created**: 2024
**Architecture Version**: 1.0
**Compatibility**: React 19+, Vite 8+, Node 18+
