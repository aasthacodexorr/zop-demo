<template>
  <div class="dropdown" ref="target">
    <button
      @click="collapsed = !collapsed"
      :class="mainButtonClass"
      type="button"
    >
      <slot name="header"></slot> <Icon :name="collapsed ? `bx:bx-caret-down` : `bx:bx-caret-up`" class="fw-bolder float-end" />
    </button>
    <ul class="dropdown-menu" :class="collapsed ? dropdownMenuClass : `${dropdownMenuClass} show`">
      <slot name="body"></slot>
    </ul>
  </div>
</template>
<script setup>
import { onClickOutside } from "@vueuse/core";
const props = defineProps({
  mainButtonClass: { type: String, required: false, default: 'btn text-start' },
  dropdownMenuClass: { type: String, required: false, default: '' },
});
const target = ref(null);
const collapsed = ref(true);
onClickOutside(target, (event) => (collapsed.value = true));
</script>