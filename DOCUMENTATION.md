# Technical Documentation

## Table of Contents
1. [System Architecture](#system-architecture)
2. [Sanity CMS Configuration](#sanity-cms-configuration)
3. [Vercel Deployment](#vercel-deployment)
4. [API Integration](#api-integration)
5. [Development Workflow](#development-workflow)
6. [Troubleshooting](#troubleshooting)
7. [Performance Optimization](#performance-optimization)

## System Architecture

### Frontend Architecture
The application follows a modern React architecture with TypeScript for type safety and maintainability.

```
src/
├── components/
│   ├── ui/              # shadcn/ui base components
│   ├── AnnouncementModal.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── LoadingSpinner.tsx
│   ├── Navbar.tsx
│   ├── ServiceCard.tsx
│   └── TeamMember.tsx
├── hooks/
│   ├── use-mobile.tsx   # Mobile detection hook
│   └── use-toast.ts     # Toast notification management
├── lib/
│   ├── sanity.ts        # Sanity client configuration
│   └── utils.ts         # Utility functions
└── pages/
    ├── AboutUs.tsx
    ├── Board.tsx
    ├── Community.tsx
    ├── Contact.tsx
    ├── Financial.tsx
    ├── Gallery.tsx
    ├── Index.tsx
    ├── Members.tsx
    ├── News.tsx
    ├── NotFound.tsx
    └── Services.tsx
```

### State Management
- **Local State**: React useState and useEffect for component-level state
- **Global State**: Context API for theme and language switching
- **Server State**: Direct Sanity queries with built-in caching

### Routing
React Router v6 implementation with:
- Lazy loading for code splitting
- Error boundaries for graceful error handling
- 404 handling with custom NotFound component

## Sanity CMS Configuration

### Project Setup
The Sanity project is configured in the `maitreecoop/` directory with the following structure:

```
maitreecoop/
├── schemaTypes/
│   ├── announcement.ts      # Announcements and notices
│   ├── boardMember.ts      # Board member profiles
│   ├── contactMessage.ts   # Contact form submissions
│   ├── event.ts           # Events and meetings
│   ├── galleryImage.ts    # Gallery images
│   ├── heroSection.ts     # Homepage hero content
│   ├── index.ts           # Schema exports
│   ├── introductionSection.ts
│   ├── newsArticle.ts     # News and articles
│   ├── serviceOffering.ts # Services information
│   ├── staffMember.ts     # Staff profiles
│   └── successStory.ts    # Success stories
├── lib/
│   └── client.ts          # Sanity client configuration
├── sanity.cli.ts          # CLI configuration
├── sanity.config.ts       # Studio configuration
└── structure/
    └── index.ts           # Custom studio structure
```

### Schema Design

#### Content Types
1. **Announcements**: Multi-priority notice system
   - Types: notice, event, meeting, financial, celebration, news, achievement
   - Priority levels: high, medium, normal, low
   - Multi-language support (English/Nepali)
   - Rich text content with image support

2. **Board Members**: Executive profiles
   - Personal information and photos
   - Position and responsibility descriptions
   - Contact information
   - Multi-language names and descriptions

3. **Staff Members**: Employee directory
   - Departmental organization
   - Role-based permissions structure
   - Professional photos and contact details

4. **News Articles**: Dynamic content publishing
   - Rich text editor with image embedding
   - Category and tag system
   - Publication scheduling
   - SEO metadata fields

### Data Fetching Strategy

#### Client-Side Queries
```typescript
// Example query structure
const boardMembersQuery = groq`
  *[_type == "boardMember" && isActive == true] | order(displayOrder asc) {
    _id,
    name,
    nameNepali,
    position,
    positionNepali,
    photo,
    contactInfo,
    biography,
    biographyNepali
  }
`;
```

#### Image Handling
```typescript
// Robust image URL generation with fallback
export const getImageUrl = (imageRef: any): string => {
  if (!imageRef) return '/placeholder.svg';
  
  try {
    if (typeof imageRef === 'string') {
      return imageRef.startsWith('http') ? imageRef : `/images/${imageRef}`;
    }
    
    if (imageRef.asset?._ref || imageRef.asset?._id) {
      return client.config().useCdn 
        ? urlFor(imageRef).url() 
        : urlFor(imageRef).url();
    }
    
    return '/placeholder.svg';
  } catch (error) {
    console.warn('Image URL generation failed:', error);
    return '/placeholder.svg';
  }
};
```

## Vercel Deployment

### Project Configuration
The application is optimized for Vercel deployment with the following configuration:

#### `vercel.json`
```json
{
  "functions": {
    "api/**/*.ts": {
      "runtime": "nodejs18.x"
    }
  },
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "/api/$1"
    }
  ],
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        {
          "key": "Access-Control-Allow-Origin",
          "value": "*"
        },
        {
          "key": "Access-Control-Allow-Methods",
          "value": "GET, POST, PUT, DELETE, OPTIONS"
        }
      ]
    }
  ]
}
```

### Build Configuration
The build process is optimized with:
- **Vite**: Fast build tool with hot module replacement
- **TypeScript**: Compile-time type checking
- **Rollup**: Optimized bundling with code splitting

#### Build Performance
- Bundle size: ~800KB (225KB gzipped)
- Build time: ~12 seconds
- Lazy loading for route-based code splitting

### Environment Variables
Production deployment requires the following environment variables:

```bash
# Sanity Configuration
VITE_SANITY_PROJECT_ID=your_project_id
VITE_SANITY_DATASET=production
VITE_SANITY_API_VERSION=2024-01-01

# Server-side API Token (write permissions)
SANITY_API_TOKEN=your_write_token

# Optional: Custom domain configuration
VERCEL_URL=your_domain.com
```

### Deployment Pipeline
1. **Automatic Deployment**: Triggered on push to main branch
2. **Preview Deployments**: Generated for pull requests
3. **Production Deployment**: Manual promotion or automatic on merge

## API Integration

### Serverless Functions
API routes are implemented as Vercel serverless functions in the `api/` directory:

#### Contact Form Handler (`api/contact.ts`)
```typescript
export default async function handler(req: Request) {
  // CORS handling
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: corsHeaders
    });
  }

  // POST request handling
  if (req.method === 'POST') {
    try {
      const { name, email, phone, message, language } = await req.json();
      
      // Server-side validation
      if (!name || !email || !message) {
        return new Response(
          JSON.stringify({ error: 'Required fields missing' }),
          { status: 400, headers: corsHeaders }
        );
      }

      // Sanity document creation
      const result = await writeClient.create({
        _type: 'contactMessage',
        name,
        email,
        phone: phone || '',
        message,
        language: language || 'en',
        submittedAt: new Date().toISOString(),
        isRead: false,
        priority: 'normal'
      });

      return new Response(
        JSON.stringify({ success: true, id: result._id }),
        { status: 200, headers: corsHeaders }
      );
    } catch (error) {
      return new Response(
        JSON.stringify({ error: 'Submission failed' }),
        { status: 500, headers: corsHeaders }
      );
    }
  }
}
```

### Security Considerations
- **API Token Management**: Separate read/write tokens
- **CORS Configuration**: Strict origin controls
- **Input Validation**: Server-side sanitization
- **Rate Limiting**: Vercel edge functions provide built-in protection

## Development Workflow

### Local Development Setup
```bash
# Install dependencies
npm install

# Start development servers concurrently
npm run dev          # Frontend (http://localhost:5173)
cd maitreecoop && npx sanity dev  # Sanity Studio (http://localhost:3333)
```

### Code Quality Standards
- **ESLint**: Configured with React and TypeScript rules
- **TypeScript**: Strict mode enabled for type safety
- **Prettier**: Consistent code formatting
- **Git Hooks**: Pre-commit linting and type checking

### Testing Strategy
- **Component Testing**: React Testing Library for UI components
- **Integration Testing**: API endpoint validation
- **E2E Testing**: Critical user flows with Playwright
- **Performance Testing**: Core Web Vitals monitoring

## Troubleshooting

### Common Issues

#### Build Failures
**Problem**: TypeScript compilation errors
```
Solution: Run `npm run type-check` to identify type issues
Check for missing imports or incorrect type definitions
```

**Problem**: Dependency conflicts
```
Solution: Clear node_modules and package-lock.json
Run `npm install` to regenerate dependencies
```

#### Sanity Integration Issues
**Problem**: CORS errors when fetching data
```
Solution: Verify CORS settings in Sanity dashboard
Ensure correct project ID and dataset in environment variables
```

**Problem**: Images not loading
```
Solution: Check image asset references in Sanity
Verify CDN configuration and asset permissions
```

#### Deployment Issues
**Problem**: Environment variables not loading
```
Solution: Verify Vercel dashboard environment variable configuration
Ensure variables are set for correct environment (preview/production)
```

### Debug Configuration
Enable detailed logging in development:
```typescript
// Add to vite.config.ts for debugging
export default defineConfig({
  define: {
    __DEV__: JSON.stringify(true)
  },
  server: {
    cors: true
  }
});
```

### Performance Monitoring
Monitor application performance with:
- **Vercel Analytics**: Built-in performance metrics
- **Core Web Vitals**: Lighthouse scoring
- **Bundle Analysis**: `npm run build` size analysis

## Performance Optimization

### Frontend Optimization
- **Code Splitting**: Route-based lazy loading
- **Image Optimization**: Next-gen formats with fallbacks
- **Caching Strategy**: Aggressive caching for static assets
- **Minification**: CSS and JS compression

### Sanity Optimization
- **Query Optimization**: Selective field queries with groq
- **CDN Usage**: Image delivery through Sanity CDN
- **Caching**: Browser and CDN-level caching for API responses

### Vercel Edge Functions
- **Geographic Distribution**: Content served from edge locations
- **Automatic Scaling**: Serverless function scaling
- **Caching Headers**: Optimized cache control for static resources

### Performance Metrics
Target performance benchmarks:
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **Time to Interactive**: < 3.5s

---

**Last Updated**: October 2025  
**Version**: 1.0.0  
**Maintainer**: Development Team