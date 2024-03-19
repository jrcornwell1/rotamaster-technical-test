<script setup>
import IconResults from '@/components/icons/IconResults.vue';

</script>

<template>
  <div class="bg-light no-results-message p-3 text-black-50">
    <IconResults />
    <h5
      class="entity fw-bold mb-1 mt-4 text-wrap"
    >
      <slot name="title">
        No Results
      </slot>
    </h5>
    <div class="small text-wrap">
      <slot
        name="message"
      >
        Try using less specific search query
      </slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.no-results-message {
  text-align: center;
  max-width: 25rem;
  margin: 3rem auto;

  .icon {
    font-size: 2rem;
  }
}
</style>
