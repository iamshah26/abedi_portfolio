<template>
  <ul class="contact-links" :class="[`is-${variant}`]">
    <li v-for="link in contactLinks" :key="link.id">
      <a
        :href="link.href"
        :target="link.external ? '_blank' : null"
        :rel="link.external ? 'noopener noreferrer' : null"
        @click="trackContact(link.id)"
      >
        <span class="label mono">{{ link.label }}</span>
        <span class="value">{{ link.value }}</span>
        <span class="arrow" aria-hidden="true">↗</span>
        <span v-if="link.external" class="sr-only">(opens in a new tab)</span>
      </a>
    </li>
  </ul>
</template>

<script setup>
import { contactLinks } from '../../data/profile.js'
import { trackContact } from '../../utils/tracking.js'

defineProps({ variant: { type: String, default: 'dark' } })
</script>

<style scoped>
.contact-links {
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  border-top: 1px solid currentColor;
}
.contact-links li { border-right: 1px solid color-mix(in srgb, currentColor 22%, transparent); }
.contact-links li:last-child { border-right: 0; }
a {
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-rows: auto auto;
  gap: 6px 12px;
  padding: 18px 18px 20px 0;
  text-decoration: none;
  min-height: 44px;
  transition: color 0.4s var(--ease-out), padding 0.5s var(--ease-out);
}
li + li a { padding-left: 18px; }
.label { opacity: 0.6; }
.value { grid-column: 1; font-size: var(--step-0); overflow-wrap: anywhere; }
.arrow { grid-column: 2; grid-row: 1 / span 2; align-self: center; font-size: 1.2em; transition: transform 0.5s var(--ease-out); }
a:hover .arrow, a:focus-visible .arrow { transform: translate(3px, -3px); color: var(--persimmon); }
a:hover .value, a:focus-visible .value { color: var(--persimmon); }
.is-light a:hover .value, .is-light a:focus-visible .value, .is-light a:hover .arrow { color: #c2492f; }

@media (max-width: 720px) {
  .contact-links { grid-template-columns: 1fr 1fr; }
  .contact-links li:nth-child(2) { border-right: 0; }
  .contact-links li:nth-child(-n + 2) { border-bottom: 1px solid color-mix(in srgb, currentColor 22%, transparent); }
  li:nth-child(3) a { padding-left: 0; }
}
</style>
