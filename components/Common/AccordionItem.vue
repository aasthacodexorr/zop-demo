<template>
  <div class="accordion-item" :class="props.class">
    <h2 class="accordion-header" @click.prevent="isOpen = !isOpen">
      <button
        class="accordion-button"
        :class="isOpen ? '' : 'collapsed'"
        type="button"
      >
        <slot name="header"></slot>
      </button>
    </h2>
    <div class="accordion-collapse collapse" :class="isOpen ? 'show' : ''">
      <div class="accordion-body" :class="props.bClass" :style="props.bStyle">
        <slot name="body"></slot>
      </div>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  open: { type: Boolean, required: false, default: false },
  class: { type: String, required: false, default: "" },
  bClass: { type: String, required: false, default: "" },
  bStyle: { type: String, required: false, default: "" },
});
const isOpen = ref(props.open);
</script>