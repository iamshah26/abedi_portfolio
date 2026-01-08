# Conversion Tracking - Code Examples

Quick reference guide for implementing conversion tracking across your portfolio.

---

## 📱 **1. Phone Link Tracking (HTML)**

```html
<!-- Simple onclick approach -->
<a href="tel:+923367048278" onclick="return gtag_report_conversion('tel:+923367048278');">
  📱 +92 336 7048278
</a>
```

---

## 📱 **2. Phone Link Tracking (Vue Component)**

**Current Implementation**: `src/components/ContactSection.vue` & `src/components/FooterSection.vue`

```vue
<template>
  <a href="tel:+923367048278" @click.prevent="handlePhoneClick" class="contact-link">
    📱 +92 336 7048278
  </a>
</template>

<script setup>
import { trackPhoneClick } from '../utils/tracking.js'

const handlePhoneClick = (event) => {
  event.preventDefault()
  trackPhoneClick('tel:+923367048278')
  // Allow default behavior after tracking (opens phone dialer)
  window.location.href = 'tel:+923367048278'
}
</script>
```

---

## 💬 **3. WhatsApp Button Tracking (HTML)**

```html
<a href="https://wa.me/923367048278?text=Hello" 
   onclick="return gtag_report_conversion('https://wa.me/923367048278?text=Hello');">
  💬 WhatsApp Me
</a>
```

---

## 💬 **4. WhatsApp Form Submit Tracking (Vue)**

**Current Implementation**: `src/components/ContactSection.vue`

```vue
<template>
  <form @submit.prevent="handleCallRequest">
    <input v-model="callForm.name" placeholder="Name" required />
    <input v-model="callForm.email" placeholder="Email" required />
    <input v-model="callForm.phone" placeholder="Phone" required />
    <textarea v-model="callForm.message" placeholder="Message"></textarea>
    <button type="submit">Send via WhatsApp</button>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { trackFormSubmit } from '../utils/tracking.js'

const callForm = ref({
  name: '',
  email: '',
  phone: '',
  message: ''
})

const handleCallRequest = () => {
  const whatsappNumber = '923367048278'
  const message = encodeURIComponent(
    `Name: ${callForm.value.name}\n` +
    `Email: ${callForm.value.email}\n` +
    `Phone: ${callForm.value.phone}\n` +
    `Message: ${callForm.value.message}`
  )
  
  // Track conversion (form submission)
  trackFormSubmit()
  
  // Open WhatsApp
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`
  window.open(whatsappUrl, '_blank')
  
  // Reset form
  callForm.value = { name: '', email: '', phone: '', message: '' }
}
</script>
```

---

## 📝 **5. Generic Contact Form Submit (Vue)**

```vue
<script setup>
import { trackFormSubmit } from '../utils/tracking.js'

const handleSubmit = async () => {
  try {
    // Your form submission logic
    const response = await fetch('/api/contact', {
      method: 'POST',
      body: JSON.stringify(formData)
    })
    
    if (response.ok) {
      // Track conversion AFTER successful submission
      trackFormSubmit()
      alert('Thank you! I\'ll get back to you soon.')
    }
  } catch (error) {
    console.error('Error:', error)
  }
}
</script>
```

---

## 📝 **6. Generic Contact Form Submit (HTML)**

```html
<form onsubmit="return handleSubmit(event)">
  <input type="text" name="name" required />
  <input type="email" name="email" required />
  <textarea name="message" required></textarea>
  <button type="submit">Submit</button>
</form>

<script>
function handleSubmit(event) {
  event.preventDefault()
  
  // Your form submission logic here
  // ...submit to API or email service...
  
  // Track conversion after successful submit
  if (typeof gtag !== 'undefined') {
    gtag('event', 'conversion', {
      'send_to': 'AW-17860855267/E5GJCPGiq98bEOOL3MRC'
    })
  }
  
  alert('Thank you!')
  return false
}
</script>
```

---

## 🎯 **7. Custom Event Tracking**

```vue
<script setup>
import { trackEvent } from '../utils/tracking.js'

// Track button clicks
const handleButtonClick = () => {
  trackEvent('button_click', {
    'button_name': 'cta_hero',
    'location': 'hero_section'
  })
}

// Track project views
const handleProjectView = (projectName) => {
  trackEvent('project_view', {
    'project_name': projectName,
    'section': 'projects'
  })
}

// Track download actions
const handleDownload = (fileName) => {
  trackEvent('file_download', {
    'file_name': fileName,
    'file_type': 'pdf'
  })
}
</script>
```

---

## 🔧 **8. Using the Tracking Utility**

**File**: `src/utils/tracking.js`

All functions are exported and ready to use:

```javascript
import { 
  reportConversion,      // Generic conversion tracking
  trackPhoneClick,       // Phone link tracking
  trackWhatsAppClick,    // WhatsApp link tracking
  trackFormSubmit,       // Form submission tracking
  trackEvent             // Custom event tracking
} from '../utils/tracking.js'

// Example usage:
trackPhoneClick('tel:+923367048278')
trackFormSubmit()
trackEvent('custom_event', { key: 'value' })
```

---

## ✅ **9. Testing Your Implementation**

### **Browser Console Test**

Open DevTools Console and run:

```javascript
// Test if gtag is loaded
console.log(typeof gtag) // Should output: "function"

// Test conversion tracking
gtag('event', 'conversion', {
  'send_to': 'AW-17860855267/E5GJCPGiq98bEOOL3MRC'
})
console.log('Conversion event fired!')
```

### **Network Tab Verification**

1. Open DevTools → Network tab
2. Filter by: `collect`
3. Click a phone link or submit form
4. Look for requests to `https://www.google-analytics.com/collect?...`
5. Check the request contains: `tid=AW-17860855267`

---

## 🚨 **Important Notes**

1. **Phone Links**: Use `event.preventDefault()` in Vue to control timing, then manually navigate
2. **WhatsApp Links**: Track conversion BEFORE opening WhatsApp window
3. **Form Submissions**: Track AFTER successful submission, not before
4. **Error Handling**: Always check if `gtag` exists before calling
5. **Testing**: Conversions may take 24-48 hours to appear in Google Ads

---

**Last Updated**: December 2024
