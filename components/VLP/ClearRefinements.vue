<script setup>
const props = defineProps({
  class: {
    type: String,
    required: false,
    default:
      "d-block small text-bold my-1 btn btn-link text-center m-auto h6 text-decoration-none text-black",
  },
  blockClass: {
    type: String,
    required: false,
    default: ''
  }
});
</script>

<template>
  <ais-clear-refinements
    style="font-size: 0.9em"
    :class-names="{
      'ais-ClearRefinements-button': props.class,
      'ais-ClearRefinements': props.blockClass
    }"
  >
    <template v-slot:resetLabel>Clear Filters</template></ais-clear-refinements
  >
</template>