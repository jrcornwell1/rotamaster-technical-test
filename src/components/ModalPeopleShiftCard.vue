<script setup>
import { toRefs } from 'vue';

const props = defineProps({
  shift: { type: Object, required: true },
});
const { shift } = toRefs(props);

</script>

<template>
{{shift}}
</template>
