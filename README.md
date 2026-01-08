# Syed Ali Haider Abedi - Digital Agency Portfolio

A professional, full-service digital agency style portfolio website built with Vue 3 and Vite.

## 🌟 Features

- **Modern Design**: Clean, professional design with gradient hero section and smooth animations
- **Responsive**: Fully responsive design that works on all devices
- **Comprehensive Sections**:
  - Hero section with compelling CTAs
  - About section
  - Services (Web Development, Mobile Apps, Digital Marketing, AI & Automation, SaaS)
  - Projects/Case Studies with detailed information
  - Skills & Expertise
  - Professional Experience
  - Client Testimonials
  - Contact section
  - Footer with links and social media

## 📋 Portfolio Content

All portfolio content has been created and is available in `PORTFOLIO_CONTENT.md` including:
- Brand positioning and taglines
- Service descriptions
- Project case studies
- Skills breakdown
- Experience details
- Testimonial samples
- Contact information

## 🚀 Getting Started

### Prerequisites

- Node.js (^20.19.0 || >=22.12.0)
- npm or yarn

### Installation

```sh
npm install
```

### Development

Run the development server with hot-reload:

```sh
npm run dev
```

The site will be available at `http://localhost:5173`

### Build for Production

```sh
npm run build
```

### Preview Production Build

```sh
npm run preview
```

## 📁 Project Structure

```
src/
├── components/
│   ├── NavigationBar.vue      # Fixed navigation with mobile menu
│   ├── HeroSection.vue        # Hero section with CTAs
│   ├── AboutSection.vue       # About me section
│   ├── ServicesSection.vue    # Services listing
│   ├── ServiceCard.vue        # Individual service card
│   ├── ProjectsSection.vue    # Projects showcase
│   ├── ProjectCard.vue        # Individual project card
│   ├── SkillsSection.vue      # Skills breakdown
│   ├── SkillCategory.vue      # Skill category card
│   ├── ExperienceSection.vue  # Professional experience
│   ├── ExperienceItem.vue     # Individual experience item
│   ├── TestimonialsSection.vue # Client testimonials
│   ├── TestimonialCard.vue    # Individual testimonial card
│   ├── ContactSection.vue     # Contact information and CTAs
│   └── FooterSection.vue      # Footer with links
├── assets/
│   ├── main.css              # Global styles
│   └── base.css              # Base CSS variables
├── App.vue                   # Main app component
└── main.js                   # App entry point
```

## 🎨 Customization

### Update Contact Information

Edit `src/components/ContactSection.vue` and `src/components/FooterSection.vue` to update:
- Email: `haiderabedi26@gmail.com`
- Phone: `+92 336 7048278`
- LinkedIn: Update the LinkedIn URL
- GitHub: Update the GitHub URL

### Modify Content

- All content is in individual component files
- Main content reference: `PORTFOLIO_CONTENT.md`
- Edit component `.vue` files to update text, images, or structure

### Color Scheme

The primary color scheme uses:
- Primary: `#667eea` (Purple)
- Secondary: `#764ba2` (Darker Purple)
- Edit colors in component style sections or create CSS variables

## 📱 Features

- **Smooth Scrolling**: Anchor links with smooth scroll behavior
- **Mobile Menu**: Responsive navigation with hamburger menu
- **Hover Effects**: Interactive cards with hover animations
- **Gradient Backgrounds**: Modern gradient hero and contact sections
- **SEO Ready**: Meta tags in `index.html`

## 🔧 Technologies Used

- Vue 3 (Composition API)
- Vite
- CSS3 (Custom styling)
- Modern JavaScript (ES6+)

## 📄 Content Reference

See `PORTFOLIO_CONTENT.md` for all written content including:
- Brand statements
- Service descriptions
- Project case studies
- Experience details
- Testimonials
- Email templates

## 📝 License

This project is private and proprietary.

---

**Built with ❤️ for Syed Ali Haider Abedi**
