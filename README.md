# 🏗️ BCC Construction & Consulting - Production-Ready Frontend

A modern, production-ready React + Vite application for Building Creators & Consulting (BCC), an engineering and construction company with:

- 🎯 Modern architecture following SOLID principles
- 🔐 Complete authentication system with JWT & auto-refresh
- 📊 Comprehensive admin dashboard
- 🚀 High performance with code splitting & lazy loading
- 📚 Enterprise-grade documentation
- ✅ Best practices implementation

## ✨ Key Features

### Public Features
- 🏠 Responsive homepage with hero section
- 📖 About page with team & story
- 🛠️ Services showcase with detailed pages
- 📁 Projects portfolio with filtering
- 📝 Blog system with categories
- 🖼️ Gallery management
- ❓ FAQ section
- 💼 Careers listing & applications
- 👥 Team showcase
- 📞 Contact form
- 🏢 Clients showcase

### Admin Features
- 🔐 Secure login with JWT
- 📊 Dashboard with analytics
- 📁 **Projects** CRUD (Create, Read, Update, Delete)
- 📝 **Blogs** Management
- 💼 **Careers** Listings
- 🖼️ **Gallery** Management
- 👥 **Team** Members
- 📧 **Contacts** Management
- 🔔 Activity logs

## 🏛️ Modern Architecture

### Built with SOLID Principles
- **Single Responsibility** - Each service/hook has one purpose
- **Open/Closed** - Easy to extend without modification
- **Liskov Substitution** - Services follow consistent interfaces
- **Interface Segregation** - Only expose needed methods
- **Dependency Inversion** - Depend on abstractions, not implementations

### Folder Structure
```
src/
├── config/           # Configuration & constants
├── api/              # API client & services (decoupled)
├── core/             # Core: context, services, hooks
├── features/         # Feature modules (auth, admin, public)
├── shared/           # Truly reusable components & utils
└── App.jsx, main.jsx # Application entry
```

[See ARCHITECTURE.md for complete details]

## 🚀 Quick Start (5 minutes)

### Prerequisites
- Node.js 18+
- npm/yarn

### Installation & Setup
```bash
# 1. Install
npm install

# 2. Create .env
cat > .env << EOF
VITE_API_BASE_URL=http://localhost:8080/api
VITE_API_IMAGE_BASE_URL=http://localhost:8080
VITE_ENABLE_LOGGING=true
EOF

# 3. Run development server
npm run dev

# 4. Open browser
# http://localhost:5173
```

### Build for Production
```bash
npm run build    # Create optimized build
npm run preview  # Preview production build
```

## 📖 Documentation

### Getting Started (Read These First)
| Document | Purpose | Time |
|----------|---------|------|
| **[QUICK_START.md](./QUICK_START.md)** | Get running fast, common tasks | 10 min |
| **[RESTRUCTURING_SUMMARY.md](./RESTRUCTURING_SUMMARY.md)** | What changed & why | 10 min |

### Understanding the Code
| Document | Purpose | Time |
|----------|---------|------|
| **[ARCHITECTURE.md](./ARCHITECTURE.md)** | Complete architecture guide | 20 min |
| **[FILE_INVENTORY.md](./FILE_INVENTORY.md)** | Where to find everything | 15 min |

### Development
| Document | Purpose | Time |
|----------|---------|------|
| **[MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md)** | Refactor components | 30 min |
| **[BEST_PRACTICES.md](./BEST_PRACTICES.md)** | Coding standards | 25 min |

## 💡 Common Tasks (Copy-Paste Examples)

### Fetch Data
```javascript
import { useApi } from '@/core/hooks';
import { publicProjectsService } from '@/api/services';

function Projects() {
  const { data, loading, execute } = useApi();

  useEffect(() => {
    execute((signal) => publicProjectsService.getAll({}, signal));
  }, []);

  if (loading) return <PageLoader />;
  return <div>{data?.projects}</div>;
}
```

### Show Notifications
```javascript
import { useToast } from '@/shared/components/Toast/ToastContext';

function MyComponent() {
  const { success, error } = useToast();
  
  success('Done!');
  error('Oops!');
}
```

### Form Validation
```javascript
import { ValidationService } from '@/core/services';

if (!ValidationService.isValidEmail(email)) {
  toast.error('Invalid email');
}
```

[See QUICK_START.md for more examples]

## 🔑 Key Services

### API Services (Decoupled)
```javascript
// All API calls go through services - easy to test & mock
publicProjectsService.getAll(params, signal)
publicBlogsService.getById(id, signal)
authService.login(credentials, signal)
adminProjectsService.create(data, signal)
// ... 10+ services
```

### Core Services
```javascript
// Authentication
const { user, isAuthenticated } = useAuth();

// Notifications
const { success, error, info, warning } = useToast();

// Storage
StorageService.getAccessToken();
StorageService.setAdminUser(userData);

// Validation
ValidationService.isValidEmail(email);
ValidationService.validateForm(data, rules);

// Logging
LoggerService.info('User', 'Login successful');
```

### Custom Hooks
```javascript
// Data fetching
const { data, loading, error, execute } = useApi();

// Persistent state
const [theme, setTheme] = useLocalStorage('theme', 'light');

// Debounce
const debouncedSearch = useDebounce(search, 300);

// Async cleanup
useAsyncEffect(asyncFn, dependencies);
```

## 🎯 Project Structure Explained

```
Configuration Layer
├── config/env.js          ← Environment variables
├── config/constants.js    ← Global constants
└── vite.config.js         ← Build config with @ alias

API Layer (Service Pattern)
├── api/client.js          ← Axios instance
├── api/interceptors/      ← Auth & error handling
│   ├── authInterceptor.js ← Token management
│   └── errorInterceptor.js ← Error normalization
└── api/services/
    ├── admin/             ← Admin CRUD services
    ├── public/            ← Public data services
    └── auth.service.js    ← Authentication

Core System
├── core/context/
│   ├── AuthContext.jsx    ← Auth state
│   └── ToastContext.jsx   ← Notifications
├── core/services/
│   ├── storage.service.js
│   ├── logger.service.js
│   └── validation.service.js
└── core/hooks/
    ├── useApi.js          ← Generic API hook
    ├── useAuth.js         ← Auth hook
    └── ... more hooks

Feature Modules (Scalable)
├── features/auth/         ← Login, Register, OTP
├── features/admin/        ← Dashboard & management
├── features/public/       ← Home, about, projects, etc.
└── features/layout/       ← Navbar, Footer, routing

Shared Resources
├── shared/components/     ← Reusable UI
├── shared/hooks/          ← Shared logic
├── shared/utils/          ← Helper functions
├── shared/constants/      ← Shared constants
└── shared/types/          ← Type definitions
```

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| **Framework** | React 19 |
| **Build Tool** | Vite 8 |
| **Router** | React Router 7 |
| **HTTP Client** | Axios 1.15 |
| **Styling** | Tailwind CSS 3 |
| **Animation** | Framer Motion 12 |
| **Icons** | Lucide React, React Icons |
| **Auth** | JWT + Refresh Tokens |
| **Forms** | Custom + Validation Service |

## 🔄 API Integration Pattern

**Single source of truth for all API calls:**

```javascript
// 1. Service defines API operations
const projectsService = {
  getAll: (params, signal) => 
    apiClient.get('/projects', { params, signal }),
};

// 2. Component uses service via hook
const { data, execute } = useApi();
execute((signal) => projectsService.getAll({}, signal));

// 3. Hook manages loading/error/data
// 4. Interceptors handle auth/errors transparently
```

**Benefits:**
- ✅ Centralized API logic (change once, update everywhere)
- ✅ Easy to test (mock services)
- ✅ Consistent error handling
- ✅ Automatic token refresh
- ✅ Request cleanup on unmount

## 🔐 Authentication Flow

```
Login Form
    ↓
authService.login()
    ↓
Interceptor attaches token
    ↓
Backend validates
    ↓
StorageService saves tokens
    ↓
AuthContext updates state
    ↓
ProtectedRoute allows access
    ↓
[401 Response?]
    ↓
Auto-refresh token
    ↓
Retry request
```

## 📊 Performance

### Code Splitting
- Routes lazy-loaded
- Vendor chunks separated
- Feature modules isolated

### Optimization
- Image lazy loading
- Request deduplication
- AbortController cleanup
- Service worker ready

### Bundle Analysis
```bash
npm run build  # Check build size
npm run preview # Test production build
```

## ♿ Accessibility

- ✅ Semantic HTML
- ✅ ARIA labels
- ✅ Keyboard navigation
- ✅ Screen reader support
- ✅ Color contrast compliance
- ✅ Skip links
- ✅ Form error handling

## 🧪 Testing Ready

```javascript
// Services are mockable
vi.mock('@/api/services', () => ({
  projectsService: {
    getAll: vi.fn().mockResolvedValue({ projects: [] })
  }
}));

// Components are testable
render(<ProjectsPage />);
expect(screen.getByText(/projects/i)).toBeInTheDocument();
```

## 🚀 Deployment

### Environment Variables
```bash
# Production .env
VITE_API_BASE_URL=https://api.yourdomain.com/api
VITE_API_IMAGE_BASE_URL=https://api.yourdomain.com
VITE_ENABLE_LOGGING=false
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_ERROR_TRACKING=true
```

### Build Process
```bash
npm run build   # Creates optimized dist/
npm run preview # Test production locally
```

### Platforms
- ✅ Vercel (included vercel.json)
- ✅ Netlify
- ✅ GitHub Pages
- ✅ Docker
- ✅ Any Node.js host

## 📱 Responsive Design

Built with Tailwind CSS:
- Mobile-first approach
- Flexible grid system
- Responsive images
- Touch-friendly UI
- Dark mode ready

## 🔗 Links

| Link | Purpose |
|------|---------|
| [Live Site](https://bcc.example.com) | Production site |
| [API Docs](./API_DOCS.md) | Backend API documentation |
| [Figma Design](https://figma.com/...) | UI/UX design |

## 🤝 Contributing

### Code Quality
- Follow BEST_PRACTICES.md
- Meaningful names
- JSDoc comments
- Reusable code

### Adding Features
1. Read MIGRATION_GUIDE.md
2. Create in features/ folder
3. Use service layer for APIs
4. Write tests
5. Update docs

### Pull Requests
- Clear title & description
- Reference issues
- Include tests
- Update documentation

## 📞 Support

### Having Issues?
1. Check [QUICK_START.md#Troubleshooting](./QUICK_START.md#troubleshooting)
2. Read relevant documentation
3. Check existing issues
4. Create new issue with details

### Questions?
- Read ARCHITECTURE.md for design questions
- Read BEST_PRACTICES.md for code style
- Read MIGRATION_GUIDE.md for refactoring

## 📈 Roadmap

### ✅ Completed
- Production-ready architecture
- Service layer implementation
- Authentication system
- API integration
- Error handling

### 📋 Planned
- [ ] Unit tests
- [ ] E2E tests
- [ ] Performance monitoring
- [ ] Analytics dashboard
- [ ] PWA features
- [ ] Offline support
- [ ] i18n internationalization

## 📄 License

[Your License Here]

## 👥 Team

| Role | Name |
|------|------|
| Project Lead | [Name] |
| Frontend Lead | [Name] |
| QA Lead | [Name] |

---

## 🎉 Key Achievements

✅ **Production-Ready** - Enterprise architecture  
✅ **SOLID Principles** - Clean, maintainable code  
✅ **Best Practices** - Industry standards  
✅ **Well Documented** - 5 comprehensive guides  
✅ **Scalable** - Easy to extend  
✅ **Performant** - Optimized bundles  
✅ **Accessible** - WCAG compliant  
✅ **Testable** - Service-based design  

---

**Version**: 1.0  
**Last Updated**: May 18, 2024  
**Status**: ✅ Production Ready  

**Built with ❤️ for modern web development**
| --------------- | ------------------ |
| React.js        | Frontend Framework |
| React Router    | Page Routing       |
| Framer Motion   | Animations         |
| Tailwind / CSS3 | Styling            |

## 📈 Future Improvements

* 🔹 Admin dashboard for content management
* 🔹 Backend integration (Node.js / Spring Boot)
* 🔹 Authentication system
* 🔹 Blog CMS
* 🔹 Performance optimization (Lighthouse 90+)


Contributions are welcome!
Feel free to fork the repo and submit a pull request.

---

## 📧 Contact

📩 [nadeemali10073@gmail.com]

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub — it helps a lot!
