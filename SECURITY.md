# Security Configuration Guide

## Sanity Studio CORS Configuration

### Required Origins for Production:

```
1. https://maitreecooperative.com
   - Credentials: ✅ ENABLED
   - Purpose: Main production website

2. https://www.maitreecooperative.com
   - Credentials: ✅ ENABLED
   - Purpose: WWW subdomain variant

3. http://localhost:5173
   - Credentials: ✅ ENABLED
   - Purpose: Local development (Vite dev server)

4. http://localhost:3333
   - Credentials: ✅ ENABLED
   - Purpose: Sanity Studio development
```

### ⚠️ IMPORTANT SECURITY RULES:

1. **NEVER use wildcard (`*`) in production** - Only allow specific domains
2. **Enable credentials ONLY for authenticated Studio access** - Required for admin operations
3. **Use HTTPS in production** - Never allow HTTP origins except localhost
4. **Remove localhost origins before deploying** - Only keep production domains

---

## XSS Protection Measures Implemented

### ✅ Content Sanitization

All user-generated content from Sanity is now sanitized:

1. **Text Content**: HTML entities escaped via `sanitizeText()`
2. **HTML Content**: Dangerous tags/attributes removed via `sanitizeHTML()`
3. **Image URLs**: Validated to only allow Sanity CDN
4. **File URLs**: Validated to only allow Sanity CDN
5. **Link URLs**: Dangerous protocols blocked (javascript:, data:, etc.)

### 🛡️ Security Layers:

```
User Input (Sanity) → Content Fetching → Validation → Sanitization → Safe Rendering
```

---

## API Token Security

### ✅ Current Setup (CORRECT):

```typescript
// Frontend (src/lib/sanity.ts)
export const client = createClient({
  token: undefined, // ✅ No token - read-only access
})

// Backend (api/contact.js)
const client = createClient({
  token: process.env.SANITY_WRITE_TOKEN, // ✅ Server-side only
})
```

### ❌ NEVER DO THIS:

```typescript
// ❌ WRONG - Exposes write token to frontend
export const client = createClient({
  token: import.meta.env.VITE_SANITY_API_TOKEN, // DANGEROUS!
})
```

---

## Environment Variables Security

### ✅ Safe to Expose (Frontend):

```env
VITE_SANITY_PROJECT_ID=w4d9v3bc        # Public
VITE_SANITY_DATASET=production         # Public
```

### 🔒 MUST KEEP SECRET (Backend Only):

```env
SANITY_WRITE_TOKEN=your_token_here     # NEVER expose in frontend!
SANITY_API_TOKEN=your_token_here       # Server-side only!
```

---

## Content Security Policy (CSP)

Add to your `index.html` `<head>`:

```html
<meta http-equiv="Content-Security-Policy" content="
  default-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval';
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  img-src 'self' data: https: blob: https://cdn.sanity.io;
  font-src 'self' data: https://fonts.gstatic.com;
  connect-src 'self' https://*.sanity.io https://*.sanity.studio;
  media-src 'self' https://cdn.sanity.io;
  object-src 'none';
  frame-src 'none';
  base-uri 'self';
  form-action 'self';
">
```

---

## Sanity Studio Access Control

### 1. **Enable MFA (Multi-Factor Authentication)**

Go to Sanity Dashboard → Settings → Members → Enable 2FA for all admins

### 2. **Restrict Studio Access by IP** (Enterprise Feature)

Configure IP whitelist in Sanity project settings

### 3. **Role-Based Access Control**

```typescript
// In sanity.config.ts
export default defineConfig({
  // ... other config
  projectId: 'w4d9v3bc',
  dataset: 'production',
  
  // Define roles
  plugins: [
    deskTool({
      structure: (S, context) => {
        const { currentUser } = context;
        
        // Restrict access based on role
        if (currentUser?.roles.includes('editor')) {
          // Limited access for editors
        }
        
        return S.list()
          .title('Content')
          .items([
            // ... structure
          ]);
      }
    })
  ]
})
```

### 4. **Content Validation Rules**

Add to your Sanity schemas:

```typescript
// Example: staffMember.ts
defineField({
  name: 'name',
  type: 'string',
  title: 'Name',
  validation: Rule => Rule.required()
    .max(100)
    .regex(/^[a-zA-Z\s]+$/, {
      name: 'letters',
      invert: false
    })
})
```

---

## API Rate Limiting

### Client-Side Protection:

The security utility includes a `RateLimiter` class:

```typescript
import { RateLimiter } from '@/lib/security';

const limiter = new RateLimiter(5, 60000); // 5 attempts per minute

function handleFormSubmit(userId: string) {
  if (!limiter.isAllowed(userId)) {
    alert('Too many requests. Please try again later.');
    return;
  }
  
  // Process form...
}
```

### Server-Side Protection (Recommended):

Add to your Vercel serverless functions:

```javascript
// api/contact.js
const attempts = new Map();

export default async function handler(req, res) {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  
  // Rate limiting
  const now = Date.now();
  const windowMs = 60000; // 1 minute
  const maxAttempts = 5;
  
  const ipAttempts = attempts.get(ip) || [];
  const recentAttempts = ipAttempts.filter(t => now - t < windowMs);
  
  if (recentAttempts.length >= maxAttempts) {
    return res.status(429).json({ error: 'Too many requests' });
  }
  
  recentAttempts.push(now);
  attempts.set(ip, recentAttempts);
  
  // Process request...
}
```

---

## Monitoring & Alerts

### 1. **Enable Sanity Audit Logs**

Go to Sanity Dashboard → Settings → Audit logs

Monitor for:
- Unauthorized access attempts
- Suspicious content changes
- Token usage patterns

### 2. **Set Up Content Webhooks**

```typescript
// In Sanity Studio
export default defineConfig({
  // ... other config
  document: {
    actions: (prev, context) => {
      return [
        ...prev,
        // Custom action to log changes
        {
          label: 'Log Change',
          onHandle: async () => {
            // Send to your logging service
            await fetch('https://your-api.com/log', {
              method: 'POST',
              body: JSON.stringify({
                user: context.currentUser,
                document: context.documentId,
                timestamp: new Date()
              })
            });
          }
        }
      ];
    }
  }
})
```

---

## Security Checklist

### Before Production Deployment:

- [ ] Remove localhost from Sanity CORS origins
- [ ] Enable HTTPS for all domains
- [ ] Verify no write tokens in frontend code
- [ ] Enable MFA for all Sanity admin accounts
- [ ] Add Content Security Policy headers
- [ ] Test XSS protection on all content types
- [ ] Set up rate limiting on API endpoints
- [ ] Enable Sanity audit logs
- [ ] Review and restrict Sanity role permissions
- [ ] Add input validation to all Sanity schemas
- [ ] Test image/file URL validation
- [ ] Monitor for suspicious activity

### Regular Maintenance:

- [ ] Review Sanity audit logs weekly
- [ ] Rotate API tokens every 90 days
- [ ] Update dependencies monthly (`npm audit fix`)
- [ ] Review user roles quarterly
- [ ] Test security measures after each deployment

---

## Attack Vectors & Prevention

### 1. **XSS via Rich Text**
- ✅ **Protected**: All PortableText sanitized via `sanitizeText()`

### 2. **Malicious Image URLs**
- ✅ **Protected**: URLs validated via `validateImageUrl()`

### 3. **PDF/File Injection**
- ✅ **Protected**: File URLs validated via `validateFileUrl()`

### 4. **CSRF Attacks**
- ✅ **Protected**: Sanity uses token-based auth
- 🔄 **TODO**: Add CSRF tokens to contact form

### 5. **Brute Force Login**
- ✅ **Protected**: Sanity handles auth security
- 🔄 **TODO**: Add rate limiting to API endpoints

### 6. **SQL Injection**
- ✅ **Protected**: Sanity uses GROQ (not SQL)
- ✅ **Protected**: No direct DB access from frontend

---

## Emergency Response Plan

### If Sanity Account is Compromised:

1. **Immediately revoke all API tokens**
2. **Reset all admin passwords**
3. **Review audit logs for unauthorized changes**
4. **Restore content from backups if needed**
5. **Enable MFA for all accounts**
6. **Rotate CORS origins**

### If Malicious Content is Published:

1. **Unpublish affected documents immediately**
2. **Clear CDN cache** (if using)
3. **Review audit logs to identify source**
4. **Strengthen content validation rules**
5. **Notify users if sensitive data exposed**

---

## Additional Resources

- [Sanity Security Best Practices](https://www.sanity.io/docs/security)
- [OWASP XSS Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)
- [Content Security Policy Guide](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
- [CORS Explained](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)

---

**Last Updated**: November 13, 2025  
**Maintained By**: Security Team  
**Review Schedule**: Quarterly
