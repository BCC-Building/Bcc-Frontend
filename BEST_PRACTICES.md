/**
 * BEST PRACTICES GUIDE - Production-Ready Code
 * 
 * Guidelines for writing maintainable, scalable code
 */

# Best Practices Guide

## Code Organization

### ✅ DO

```javascript
// ✅ Group related imports
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useApi, useAuth } from '@/core/hooks';
import { adminProjectsService } from '@/api/services';
import { ValidationService } from '@/core/services';

import ProjectCard from './ProjectCard';
import PageLoader from '@/shared/components/Loading/PageLoader';
```

```javascript
// ✅ Use meaningful file structure
src/features/admin/pages/Projects/
├── ProjectsPage.jsx        // Page component
├── components/
│   ├── ProjectList.jsx
│   ├── ProjectForm.jsx
│   └── ProjectFilters.jsx
├── hooks/
│   └── useProjects.js      // Feature-specific hook
└── index.js
```

```javascript
// ✅ Single responsibility in hooks
const useProjects = (filters) => {
  const { data, loading, execute } = useApi();
  
  useEffect(() => {
    execute((signal) => 
      adminProjectsService.getAll(filters, signal)
    );
  }, [execute, filters]);

  return { data: data?.projects, loading };
};

export default useProjects;
```

### ❌ DON'T

```javascript
// ❌ Random import order
import PageLoader from '@/shared/components/Loading/PageLoader';
import { useApi, useAuth } from '@/core/hooks';
import { useState, useEffect } from 'react';
import ProjectCard from './ProjectCard';
import { ValidationService } from '@/core/services';
import { adminProjectsService } from '@/api/services';
```

```javascript
// ❌ Everything in one component
function ProjectsPage() {
  // Form validation logic
  // API calls
  // State management
  // Rendering
  // Filtering logic
  // Pagination logic
  // All 500+ lines in one file
}
```

```javascript
// ❌ Multiple responsibilities in hook
const useFetchEverything = () => {
  // Fetch projects
  // Fetch blogs
  // Fetch team
  // Handle auth
  // Validate forms
  // Too many concerns
};
```

## State Management

### ✅ DO

```javascript
// ✅ Use context for global state
const { user, isAuthenticated } = useAuth();
const { showToast } = useToast();

// ✅ Use useApi for data fetching
const { data, loading, error, execute } = useApi();

// ✅ Use feature-specific hooks for complex logic
const { projects, filters, setFilters } = useProjects();

// ✅ Use localStorage for persistence
const [theme, setTheme] = useLocalStorage('theme', 'light');
```

### ❌ DON'T

```javascript
// ❌ Prop drilling
function Page() {
  return <Component1 data={data} onChange={onChange} />;
}

function Component1({ data, onChange }) {
  return <Component2 data={data} onChange={onChange} />;
}

function Component2({ data, onChange }) {
  return <Component3 data={data} onChange={onChange} />;
}
```

```javascript
// ❌ Too many useState calls
const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [phone, setPhone] = useState('');
const [address, setAddress] = useState('');
const [city, setCity] = useState('');
const [state, setState] = useState('');
const [zip, setZip] = useState('');
// Use single state for form

const [formData, setFormData] = useState({
  name: '', email: '', phone: '', address: '', city: '', state: '', zip: ''
});
```

## API Communication

### ✅ DO

```javascript
// ✅ Use service layer
import { adminProjectsService } from '@/api/services';

const handleFetch = async () => {
  const result = await execute((signal) =>
    adminProjectsService.getAll({ page: 1 }, signal)
  );

  if (result.success) {
    setProjects(result.data);
  } else {
    toast.error(result.error);
  }
};
```

```javascript
// ✅ Handle all error cases
const result = await execute(apiCall);

if (result.success) {
  // Success logic
} else if (result.cancelled) {
  // Request cancelled (cleanup, unmount, etc.)
} else if (result.error) {
  // Error logic with normalized error
  const errorType = result.details?.type;
  if (errorType === 'VALIDATION') {
    // Handle validation errors
  } else if (errorType === 'AUTHENTICATION') {
    // Handle auth errors
  }
}
```

```javascript
// ✅ Cleanup on unmount
useEffect(() => {
  execute(apiCall);
  
  return cleanup; // Cancels in-flight requests
}, []);
```

### ❌ DON'T

```javascript
// ❌ Direct API calls in components
const response = await axios.get('/api/projects');

// ❌ No error handling
const data = await fetch('/api/projects').then(r => r.json());

// ❌ No cleanup
useEffect(() => {
  fetch('/api/projects');
  // Request continues even after unmount
}, []);
```

## Error Handling

### ✅ DO

```javascript
// ✅ Normalize errors
const normalizedError = normalizeError(error);
// { type: 'NETWORK', status: null, message: '...' }

// ✅ Show user-friendly messages
const userMessage = ERROR_MESSAGES[error.type] || ERROR_MESSAGES.UNKNOWN;
toast.error(userMessage);

// ✅ Log for debugging
LoggerService.error('API', 'Failed to load projects', error);
```

```javascript
// ✅ Handle different scenarios
try {
  const result = await execute(apiCall);
  
  if (result.success) {
    // Success
  } else if (result.cancelled) {
    // Ignore - cleanup scenario
  } else {
    // Error with details
    if (result.details?.status === 401) {
      // Auth error
    } else if (result.details?.status === 422) {
      // Validation errors
      showValidationErrors(result.details.errors);
    }
  }
} catch (err) {
  // Unexpected error
  LoggerService.error('Unexpected', 'Fatal error', err);
  toast.error('Something went wrong');
}
```

### ❌ DON'T

```javascript
// ❌ Swallow errors silently
try {
  // api call
} catch (err) {
  console.log('error'); // Not helpful
}

// ❌ Generic error messages
toast.error('Error'); // User doesn't know what happened

// ❌ Show technical errors to users
toast.error(error.response.data.details.validation.field[0].message);

// ❌ No logging in production
if (import.meta.env.DEV) {
  console.error(error);
}
// Errors silently fail in production
```

## Performance

### ✅ DO

```javascript
// ✅ Lazy load routes
const ProjectsPage = lazy(() =>
  import('@/features/public/projects/pages/ProjectsPage')
);

<Suspense fallback={<PageLoader />}>
  <ProjectsPage />
</Suspense>

// ✅ Debounce search inputs
const [search, setSearch] = useState('');
const debouncedSearch = useDebounce(search, 300);

useEffect(() => {
  if (debouncedSearch) {
    execute(apiCall);
  }
}, [debouncedSearch]);

// ✅ Lazy load images
<img loading="lazy" src={url} alt={alt} />

// ✅ Cancel requests on unmount
useEffect(() => {
  execute(apiCall);
  return cleanup;
}, []);
```

### ❌ DON'T

```javascript
// ❌ Eager load everything
import ProjectsPage from './ProjectsPage';
import AllAdminPages from './admin';
import AllPublicPages from './public';

// ❌ API call on every keystroke
const handleSearch = (e) => {
  setSearch(e.target.value);
  execute(search(e.target.value)); // Called 10+ times per second
};

// ❌ Don't lazy load critical images
<img src={url} alt={alt} /> {/* Image loads slowly */}

// ❌ No request cleanup
useEffect(() => {
  execute(apiCall); // Request may complete after unmount
}, []);
```

## Component Design

### ✅ DO

```javascript
// ✅ Small, focused components
function ProjectCard({ project, onClick }) {
  return (
    <div onClick={() => onClick(project.id)}>
      <img src={getImageUrl(project.image)} alt={project.title} />
      <h3>{project.title}</h3>
      <p>{project.category}</p>
    </div>
  );
}

// ✅ Clear prop types via JSDoc
/**
 * ProjectCard Component
 * @param {Object} project - Project data
 * @param {string} project.id - Project ID
 * @param {string} project.title - Project title
 * @param {Function} onClick - Click handler
 */

// ✅ Composition over inheritance
function AdminLayout({ children, title }) {
  return (
    <div className="admin-layout">
      <Header title={title} />
      <Sidebar />
      <main>{children}</main>
    </div>
  );
}
```

### ❌ DON'T

```javascript
// ❌ Large, monolithic components
function ProjectsPage() {
  // 500+ lines
  // Filtering, sorting, pagination, API calls, rendering, etc.
}

// ❌ Unclear prop requirements
function ProjectCard(props) {
  return <div>{props.p?.t}</div>;
}

// ❌ Deep nesting
function Page() {
  return (
    <Wrapper>
      <Container>
        <Section>
          <Article>
            <Paragraph>Content</Paragraph>
          </Article>
        </Section>
      </Container>
    </Wrapper>
  );
}
```

## Testing Readiness

### ✅ DO

```javascript
// ✅ Export named components for testing
export function ProjectCard({ project }) {
  // Component logic
}

export default ProjectCard;

// ✅ Dependency injection via props
function ProjectsList({ service = adminProjectsService, page = 1 }) {
  // Can pass mock service in tests
}

// ✅ Pure functions
export const formatProjectDate = (dateString) => {
  return new Date(dateString).toLocaleDateString();
};

// Can be tested independently
```

### ❌ DON'T

```javascript
// ❌ Default exports only
export default function Component() {}
// Harder to test

// ❌ Hard-coded dependencies
function ProjectsList() {
  const { execute } = useApi();
  execute(hardCodedService.fetch()); // Can't mock
}

// ❌ Mixed logic and UI
function Component() {
  // Complex business logic mixed with JSX
  return <div>{complexLogic()}</div>;
}
```

## Naming Conventions

### ✅ DO

```javascript
// ✅ Clear, descriptive names
const isUserAuthenticated = true;
const handleProjectCardClick = () => {};
const fetchProjectsForPage = async () => {};
const projectsPerPage = 10;

// ✅ Boolean prefixes
const isLoading = false;
const hasError = true;
const canDelete = true;
const shouldRefresh = true;

// ✅ Handler prefix for events
const handleSubmit = () => {};
const handleChange = () => {};
const handleDelete = () => {};
```

### ❌ DON'T

```javascript
// ❌ Vague names
const data = true;
const x = 10;
const fn = () => {};
const d = new Date();

// ❌ Abbreviations (except common ones)
const usrAuth = true;
const prjList = [];
const tmStmp = Date.now();

// ❌ Single letters
const a = 5;
const b = 10;
const c = a + b;
```

## Documentation

### ✅ DO

```javascript
/**
 * AdminProjectsService
 * 
 * Handles all admin-related project API calls
 * 
 * @example
 * const result = await execute((signal) =>
 *   adminProjectsService.getAll({ page: 1 }, signal)
 * );
 */
export const adminProjectsService = {
  /**
   * Get all projects
   * @param {Object} params - Query parameters
   * @param {number} params.page - Page number
   * @param {number} params.limit - Items per page
   * @param {AbortSignal} signal - Abort signal
   * @returns {Promise} Projects list
   */
  getAll: async (params, signal) => {
    // Implementation
  },
};
```

### ❌ DON'T

```javascript
// ❌ No documentation
export const service = {
  getAll: async (params, signal) => {
    // What does this do?
  },
};

// ❌ Obvious comments
const name = 'John'; // Set name to John
const count = 0; // Initialize count to 0

// ❌ Outdated comments
// TODO: Fix bug in old version (comment from 2 years ago)
```

## Environment & Build

### ✅ DO

```javascript
// ✅ Use env variables
const apiUrl = import.meta.env.VITE_API_BASE_URL;
const isDev = import.meta.env.DEV;

// ✅ Type check env variables
if (!import.meta.env.VITE_API_BASE_URL) {
  throw new Error('VITE_API_BASE_URL is required');
}
```

### ❌ DON'T

```javascript
// ❌ Hard-coded URLs
const apiUrl = 'http://localhost:8080/api';

// ❌ Secrets in code
const apiKey = 'sk_live_xxx';

// ❌ Different configs per file
// file1.js
const API = 'http://localhost:8080';
// file2.js
const API = 'https://api.example.com';
```

## Image Optimization

### ✅ DO

```javascript
// ✅ Use .webp format for better compression
<img src="image.webp" alt="Description" loading="lazy" />

// ✅ Provide fallback for older browsers
<picture>
  <source srcSet="image.webp" type="image/webp" />
  <img src="image.jpg" alt="Description" loading="lazy" />
</picture>

// ✅ Optimize background images
background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)),
  url('image.webp') center/cover no-repeat;

// ✅ Use image helper for consistency
import { getImageUrl } from '@/api/clients';
<img src={getImageUrl(imagePath)} alt="alt text" />

// ✅ Set dimensions to prevent CLS
<img src={url} alt={alt} width="400" height="300" />
```

### ❌ DON'T

```javascript
// ❌ Use unoptimized PNG/JPG
<img src="image.jpg" alt="Description" />

// ❌ No alt text for images
<img src="image.webp" />

// ❌ Inline large images
background: url('large-unoptimized-image.png');

// ❌ Missing loading attribute
<img src={url} alt="alt" />
```

## Animations & Performance

### ✅ DO

```javascript
// ✅ Use framer-motion for smooth animations
import { motion } from 'framer-motion';

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 0.2 }}
>
  Content
</motion.div>

// ✅ Predefine animation variants for reuse
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

<motion.div variants={fadeInUp}>Content</motion.div>

// ✅ Use will-change sparingly
.animated-element {
  will-change: transform, opacity;
}

// ✅ Leverage CSS transforms (GPU accelerated)
transform: translateY(-10px) scaleX(1.05);
```

### ❌ DON'T

```javascript
// ❌ Animate expensive properties
animation: left 0.3s ease; // Use transform instead

// ❌ Abuse will-change
.element {
  will-change: transform, opacity, color, font-size; // Too many
}

// ❌ Long animations that block interaction
animation: slideIn 5s ease; // Too long

// ❌ No transition states
div:hover {
  background: red; // Jarring, no transition
}
```

## SEO & Accessibility

### ✅ DO

```javascript
// ✅ Use semantic HTML
<header>
  <nav>Navigation</nav>
</header>
<main>
  <article>
    <h1>Title</h1>
    <p>Content</p>
  </article>
</main>
<footer>Footer</footer>

// ✅ Add ARIA labels
<button aria-label="Close menu">✕</button>
<img src="logo.webp" alt="BCC Logo" />

// ✅ Use JSON-LD for structured data
<Helmet>
  <script type="application/ld+json">
    {JSON.stringify(schema)}
  </script>
</Helmet>

// ✅ Ensure color contrast ratio >= 4.5:1
color: #333; background: #fff; // Good
color: #666; background: #888; // Bad - low contrast
```

### ❌ DON'T

```javascript
// ❌ Use generic divs for everything
<div class="button">Click me</div>

// ❌ Missing alt text
<img src="icon.webp" />

// ❌ Inaccessible navigation
<span onClick={navigate}>Menu</span>

// ❌ No heading hierarchy
<h1>Main Title</h1>
<h3>Subsection</h3> {/* Missing h2 */}
```

## Responsive Design

### ✅ DO

```javascript
// ✅ Mobile-first approach
.container {
  padding: 1rem;
  display: block;
}

@media (min-width: 768px) {
  .container {
    padding: 2rem;
    display: grid;
  }
}

// ✅ Use CSS Grid for layouts
display: grid;
grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
gap: 2rem;

// ✅ Use clamp() for fluid typography
font-size: clamp(1rem, 2.5vw, 2rem);

// ✅ Use viewport-relative units
width: 90vw; // 90% of viewport width
height: 100vh; // Full viewport height
```

### ❌ DON'T

```javascript
// ❌ Desktop-first approach
.container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}

@media (max-width: 768px) {
  .container {
    display: block;
  }
}

// ❌ Hard-coded breakpoints
if (window.innerWidth > 1200) {
  // Render different layout
}

// ❌ Misuse of viewport units
width: 100vw; // Causes scrollbar issues
```

## Reusable Component Patterns

### ✅ DO

```javascript
// ✅ Create configurable components
function HeroSection({ 
  title, 
  subtitle, 
  backgroundImage,
  cta,
  stats 
}) {
  return (
    <section style={{
      backgroundImage: `url(${backgroundImage})`
    }}>
      <h1>{title}</h1>
      <p>{subtitle}</p>
      {stats && <Stats data={stats} />}
      {cta && <Button>{cta}</Button>}
    </section>
  );
}

// ✅ Create wrapper components for common patterns
function CardLayout({ children, title, onClick }) {
  return (
    <div className="card" onClick={onClick}>
      {title && <h3>{title}</h3>}
      {children}
    </div>
  );
}

// ✅ Use composition
<HeroSection
  title="Services"
  backgroundImage="services.webp"
  cta="Explore"
/>
```

### ❌ DON'T

```javascript
// ❌ Create custom component for every page
function ServicesHero() { /* ... */ }
function ProjectsHero() { /* ... */ }
function TeamHero() { /* ... */ }

// ❌ Hard-code everything in component
function PageHero() {
  return (
    <section style={{
      backgroundImage: 'url(...)',
      title: 'Fixed Title',
      subtitle: 'Fixed Subtitle'
    }}>
    </section>
  );
}
```

## Version Control & Git

### ✅ DO

```javascript
// ✅ Clear, descriptive commit messages
git commit -m "feat: Add image optimization for hero sections"
git commit -m "fix: Correct z-index stacking in hero component"

// ✅ Use feature branches
git checkout -b feature/hero-section-update

// ✅ Keep commits atomic
// One commit per feature/bug fix

// ✅ Write meaningful PR descriptions
/* 
## Changes
- Updated HeroSection component with .webp images
- Added page-specific hero sections
- Improved animations performance

## Testing
- Tested on mobile, tablet, desktop
- Verified animations smooth at 60fps
*/
```

### ❌ DON'T

```javascript
// ❌ Vague commit messages
git commit -m "update"
git commit -m "fix stuff"
git commit -m "changes"

// ❌ Commit directly to main
git commit -am "Something" && git push origin main

// ❌ Mix multiple unrelated changes
git commit -m "Update hero AND fix login AND add footer"
```

## Common Pitfalls to Avoid

### State Management Issues
- ❌ Creating separate useState calls for related data
- ✅ Group related state in single object
- ❌ Not cleaning up effects
- ✅ Always return cleanup function

### Performance Issues
- ❌ Re-renders due to missing key props
- ✅ Always provide stable key in lists
- ❌ Creating new functions/objects in render
- ✅ Use useCallback and useMemo appropriately

### API Issues
- ❌ Race conditions (user navigates before response)
- ✅ Use AbortController to cancel requests
- ❌ Silent failures
- ✅ Always handle errors visually to users

### UI/UX Issues
- ❌ Flash of unstyled content (FOUC)
- ✅ Load critical CSS inline, rest deferred
- ❌ No loading states
- ✅ Show skeleton loaders or spinners
- ❌ Inaccessible interactive elements
- ✅ Use semantic HTML and ARIA

---

**Remember**: Code is read much more often than it's written.
Write code for humans first, machines second.

🚀 Happy Coding!
