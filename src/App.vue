<script setup>
import LayoutHeader from './components/LayoutHeader.vue';
</script>

<template>
  <LayoutHeader />

  <RouterView />

  <RouterView id="content" name="content" />
</template>

<style scoped></style>
