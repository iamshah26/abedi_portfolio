<template>
  <nav class="navbar" :class="{ 'scrolled': isScrolled }">
    <div class="nav-container">
      <div class="nav-logo">
        <a href="#home">Syed Ali Haider Abedi</a>
      </div>
      <button class="mobile-menu-toggle" @click="toggleMobileMenu" aria-label="Toggle menu">
        <span></span>
        <span></span>
        <span></span>
      </button>
      <ul class="nav-menu" :class="{ 'active': mobileMenuOpen }">
        <li><a href="#home" @click="closeMobileMenu">Home</a></li>
        <li><a href="#about" @click="closeMobileMenu">About</a></li>
        <li class="dropdown">
          <a href="#services" @click="toggleDropdown">Services <span class="arrow">▼</span></a>
          <ul class="dropdown-menu">
            <li><a href="#services" @click="closeMobileMenu">Web Development</a></li>
            <li><a href="#services" @click="closeMobileMenu">Mobile Apps</a></li>
            <li><a href="#services" @click="closeMobileMenu">Digital Marketing</a></li>
            <li><a href="#services" @click="closeMobileMenu">AI & Automation</a></li>
            <li><a href="#services" @click="closeMobileMenu">SaaS Platforms</a></li>
          </ul>
        </li>
        <li><a href="#projects" @click="closeMobileMenu">Projects</a></li>
        <li><a href="#experience" @click="closeMobileMenu">Experience</a></li>
        <li><a href="#contact" @click="closeMobileMenu">Contact</a></li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isScrolled = ref(false)
const mobileMenuOpen = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const closeMobileMenu = () => {
  mobileMenuOpen.value = false
}

const toggleDropdown = (e) => {
  if (window.innerWidth <= 768) {
    e.preventDefault()
    e.target.closest('.dropdown').classList.toggle('open')
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(20px) saturate(180%);
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.05), 0 2px 10px rgba(0, 0, 0, 0.05);
  z-index: 1000;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-bottom: 1px solid rgba(102, 126, 234, 0.1);
}

.navbar.scrolled {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border-bottom-color: rgba(102, 126, 234, 0.15);
}

.nav-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 1.25rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-logo a {
  font-size: 1.35rem;
  font-weight: 800;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-decoration: none;
  letter-spacing: -0.5px;
  transition: all 0.3s ease;
}

.nav-logo a:hover {
  transform: scale(1.02);
}

.nav-menu {
  display: flex;
  list-style: none;
  gap: 0.5rem;
  margin: 0;
  padding: 0;
  align-items: center;
}

.nav-menu a {
  color: #4a5568;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.95rem;
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
}

.nav-menu a:hover {
  color: #667eea;
  background: rgba(102, 126, 234, 0.08);
}

.nav-menu > li > a.active {
  color: #667eea;
  background: rgba(102, 126, 234, 0.1);
}

.dropdown {
  position: relative;
}

.dropdown-menu {
  position: absolute;
  top: calc(100% + 0.5rem);
  left: 0;
  background: white;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.12);
  border-radius: 12px;
  padding: 0.75rem 0;
  min-width: 220px;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  list-style: none;
  border: 1px solid rgba(102, 126, 234, 0.1);
}

.dropdown:hover .dropdown-menu {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.dropdown-menu li a {
  display: block;
  padding: 0.75rem 1.5rem;
  font-weight: 500;
  color: #4a5568;
  font-size: 0.9rem;
}

.dropdown-menu li a:hover {
  background: linear-gradient(90deg, rgba(102, 126, 234, 0.08), transparent);
  color: #667eea;
  padding-left: 1.75rem;
}

.mobile-menu-toggle {
  display: none;
  flex-direction: column;
  background: none;
  border: none;
  cursor: pointer;
  gap: 5px;
}

.mobile-menu-toggle span {
  width: 25px;
  height: 3px;
  background: #667eea;
  border-radius: 2px;
  transition: all 0.3s ease;
}

.mobile-menu-toggle:hover span {
  background: #764ba2;
}

@media (max-width: 968px) {
  .nav-menu {
    gap: 1rem;
  }
  
  .nav-menu a {
    font-size: 0.9rem;
    padding: 0.5rem 1rem;
  }
}

@media (max-width: 768px) {
  .navbar {
    padding: 0;
  }
  
  .nav-container {
    padding: 1rem 1.5rem;
  }
  
  .nav-logo a {
    font-size: 1.15rem;
  }

  .mobile-menu-toggle {
    display: flex;
  }

  .nav-menu {
    position: fixed;
    top: 60px;
    left: -100%;
    width: 100%;
    height: calc(100vh - 60px);
    background: white;
    flex-direction: column;
    padding: 2rem 1.5rem;
    transition: left 0.3s ease;
    box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
    align-items: flex-start;
    gap: 0;
  }
  
  .nav-menu li {
    width: 100%;
    margin-bottom: 0.5rem;
  }

  .nav-menu a {
    display: block;
    width: 100%;
    padding: 0.75rem 1rem;
    border-radius: 8px;
  }

  .nav-menu.active {
    left: 0;
  }

  .dropdown-menu {
    position: static;
    opacity: 0;
    max-height: 0;
    overflow: hidden;
    transition: all 0.3s ease;
    box-shadow: none;
    margin: 0.5rem 0 0 0;
    padding: 0;
    width: 100%;
    background: rgba(102, 126, 234, 0.05);
    border-radius: 8px;
  }

  .dropdown.open .dropdown-menu {
    opacity: 1;
    max-height: 500px;
    padding: 0.5rem 0;
  }
  
  .dropdown-menu li a {
    padding-left: 2rem;
  }

  .arrow {
    font-size: 0.8rem;
  }
}
</style>
