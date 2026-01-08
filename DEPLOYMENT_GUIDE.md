# Portfolio Deployment Guide

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Visit `http://localhost:5173` to view your portfolio.

### 3. Build for Production
```bash
npm run build
```
This creates a `dist` folder with optimized production files.

### 4. Preview Production Build
```bash
npm run preview
```

## Deployment Options

### Option 1: Vercel (Recommended)
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow prompts to deploy

### Option 2: Netlify
1. Install Netlify CLI: `npm i -g netlify-cli`
2. Build: `npm run build`
3. Deploy: `netlify deploy --prod --dir=dist`

### Option 3: GitHub Pages
1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add to package.json scripts:
   ```json
   "deploy": "npm run build && gh-pages -d dist"
   ```
3. Run: `npm run deploy`

### Option 4: Traditional Hosting
1. Build: `npm run build`
2. Upload contents of `dist` folder to your web hosting via FTP/cPanel
3. Ensure your server is configured for SPA (Single Page Application)

## Customization Checklist

Before deploying, customize:

- [ ] Update contact email in `ContactSection.vue` and `FooterSection.vue`
- [ ] Update phone number if needed
- [ ] Verify all project links are correct
- [ ] Update LinkedIn and GitHub URLs
- [ ] Add your own photos/images if desired
- [ ] Review all text content in components
- [ ] Test all links and CTAs
- [ ] Update meta tags in `index.html` if needed

## SEO Optimization

The portfolio includes:
- Meta description in `index.html`
- Semantic HTML structure
- Proper heading hierarchy
- Alt text for images (add as needed)

For better SEO:
1. Add Google Analytics tracking code
2. Submit sitemap to Google Search Console
3. Add Open Graph meta tags for social sharing
4. Consider adding a sitemap.xml

## Performance Tips

- Images: Optimize all images before adding
- Fonts: Consider using web fonts (Google Fonts, etc.)
- Lazy loading: Images lazy-load by default in modern browsers
- Code splitting: Vite handles this automatically

## Maintenance

- Update project links as you complete new projects
- Refresh testimonials periodically
- Update experience section as you gain new roles
- Keep skills section current with new technologies

---

For questions or issues, refer to the main README.md file.
