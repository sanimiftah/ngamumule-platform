# 🚀 Deployment Guide - Ngamumule AI

## Quick Deployment Checklist

### ✅ Pre-Deployment Steps

1. **Code Quality Check**
   ```bash
   npm run lint
   npm run build
   ```

2. **Audio Files Verification**
   - Ensure all audio files are present in `/public/audio/`
   - Test audio playback across different browsers
   - Verify fallback TTS functionality

3. **Environment Setup**
   ```bash
   # Create .env.local for production
   cp .env.example .env.local
   ```

### 🌐 Deployment Options

## Option 1: Vercel (Recommended)

### Quick Setup
1. **Connect Repository**
   ```bash
   # Push to GitHub first
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Deploy on Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Configure project settings:
     - Framework: Next.js
     - Build Command: `npm run build`
     - Output Directory: `.next`

3. **Environment Variables** (Optional)
   ```env
   OPENAI_API_KEY=your_openai_api_key
   ANTHROPIC_API_KEY=your_anthropic_api_key
   ```

4. **Custom Domain** (Optional)
   - Add your custom domain in Vercel dashboard
   - Update DNS settings as instructed

### Vercel Advantages
- ✅ Automatic deployments on push
- ✅ Global CDN for fast audio delivery
- ✅ Built-in analytics and performance monitoring
- ✅ Zero configuration for Next.js

## Option 2: Netlify

### Setup Steps
1. **Build Settings**
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Node version: 18+

2. **Deploy**
   ```bash
   # Install Netlify CLI
   npm install -g netlify-cli
   
   # Login and deploy
   netlify login
   netlify deploy --prod
   ```

## Option 3: Railway

### Quick Deploy
```bash
# Install Railway CLI
npm install -g @railway/cli

# Deploy
railway login
railway deploy
```

## Option 4: Self-Hosted (VPS/Docker)

### Docker Deployment
```dockerfile
# Create Dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
```

### Docker Commands
```bash
# Build and run
docker build -t ngamumule-ai .
docker run -p 3000:3000 ngamumule-ai
```

## 🔧 Production Optimizations

### Performance Checklist
- ✅ Enable gzip compression
- ✅ Optimize images (Next.js Image component used)
- ✅ Configure caching headers for audio files
- ✅ Enable service worker for offline capability

### Audio Optimization
```javascript
// Add to next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/audio/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
}
```

### SEO Configuration
```javascript
// In layout.tsx
export const metadata = {
  title: 'Ngamumule AI - Learn Sundanese Language & Culture',
  description: 'AI-powered Sundanese language learning platform preserving West Java cultural heritage',
  keywords: 'sundanese, language learning, cultural preservation, indonesia',
  openGraph: {
    title: 'Ngamumule AI',
    description: 'Learn Sundanese language and culture with AI',
    url: 'https://your-domain.com',
    type: 'website',
  },
}
```

## 🔒 Security Considerations

### Environment Variables
```env
# Production .env.local
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1

# Optional AI keys (if using enhanced features)
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-...
```

### Security Headers
```javascript
// Add to next.config.js
const securityHeaders = [
  {
    key: 'X-Frame-Options',
    value: 'DENY'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin'
  }
]
```

## 📊 Monitoring & Analytics

### Performance Monitoring
```javascript
// Add to pages/_app.tsx
import { Analytics } from '@vercel/analytics/react'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Analytics />
    </>
  )
}
```

### Error Tracking
```javascript
// Add error boundary
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }
}
```

## 🚀 Go-Live Steps

### 1. Final Pre-Launch Check
```bash
# Run complete test suite
npm run lint
npm run build
npm run start

# Test in production mode locally
```

### 2. Domain & DNS Setup
- Configure custom domain
- Set up SSL certificate (automatic with Vercel/Netlify)
- Configure CDN for global audio delivery

### 3. Launch Announcement
- Update GitHub repository description
- Add live demo link to README
- Create social media announcements
- Submit to cultural education directories

### 4. Post-Launch Monitoring
- Monitor Core Web Vitals
- Track audio loading performance
- Monitor user engagement metrics
- Collect feedback for improvements

## 🔄 Continuous Deployment

### GitHub Actions (Optional)
```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - run: npm run lint
```

## 📱 Mobile Optimization

### PWA Configuration
```javascript
// next.config.js
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
})

module.exports = withPWA({
  // your config
})
```

## 🌍 Global CDN Setup

### Audio Delivery Optimization
- Use CDN for audio files (CloudFront, Cloudflare)
- Implement audio preloading for better UX
- Configure progressive audio loading
- Set up audio compression for faster delivery

---

## ✅ Ready to Deploy!

Your Ngamumule AI platform is ready for the world. The comprehensive Sundanese learning experience you've built will help preserve and promote this beautiful culture globally.

**Quick Deploy Command:**
```bash
# For Vercel (fastest)
npx vercel --prod

# For Netlify
netlify deploy --prod

# For Railway
railway deploy
```

🎉 **Congratulations!** You're about to launch a platform that bridges technology and cultural heritage!
