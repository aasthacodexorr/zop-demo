<template>
  <!-- Accordion Item : START -->
  <div class="card-footer" :class="props.class">
    <div
      role="button"
      @click.prevent="isOpen = !isOpen"
      class="cursor-pointer py-1 pe-auto"
      aria-expanded="true"
    >
      <slot name="header"></slot>
      <Icon
        :name="isOpen ? 'bx:bxs-chevron-up' : 'bx:bxs-chevron-down'"
        style="position: relative; top: -5px"
        class="fs-4 d-inline-block float-end text-primary"
      />
    </div>
    <div
      class="accordian-body"
      :class="props.bClass"
      :style="isOpen ? 'display:block' : 'display:none'"
    >
      <slot name="body"></slot>
    </div>
  </div>
  <!-- Accordion Item : END -->
</template>
<script setup>
const props = defineProps({
  open: { type: Boolean, required: false, default: false },
  class: { type: String, required: false, default: "" },
  bClass: { type: String, required: false, default: "" },
});
const isOpen = ref(props.open);
</script>