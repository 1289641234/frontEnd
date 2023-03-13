<template>
  <HeadMenu></HeadMenu>
  <router-view />
</template>

<script setup>
import HeadMenu from '@/components/HeadMenu.vue'
</script>
<style>
body {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
}
</style>
