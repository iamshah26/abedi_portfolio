<template><PortfolioApp v-if="legacy"/><SignalPrototype v-else/></template>
<script setup>
import {defineAsyncComponent} from 'vue';
const legacy=new URLSearchParams(location.search).has('portfolio');
const PortfolioApp=defineAsyncComponent(()=>import('./PortfolioApp.vue'));
const SignalPrototype=defineAsyncComponent(()=>import('./prototype/SignalPrototype.vue'));
</script>
