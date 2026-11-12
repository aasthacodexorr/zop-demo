<template>
  <div class="accordion" :class="props.class">
    <slot></slot>
  </div>
</template>
<script setup>
const props = defineProps({
  class: { type: String, required: false, default: "" },
});
</script>