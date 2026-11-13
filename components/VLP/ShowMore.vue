<template>
  <button
    class="ais-InfiniteHits-loadMore w-auto"
    :disabled="isLastPage"
    @click="refineNext"
  >
    Show More Results
  </button>
</template>
<script setup>
const props = defineProps({
  autoClickNext: { type: Boolean, required: false, default: false },
  isLastPage: { type: Boolean, required: true },
  refineNext: { type: Function, required: true },
});

watch(
  () => props.autoClickNext,
  (selection, prevSelection) => {
    if (selection !== prevSelection) {
      if (props.autoClickNext) {
        if (selection && !props.isLastPage) {
          props.refineNext();
        }
      }
    }
  }
);
</script>
<style lang="scss" scoped>
button.ais-InfiniteHits-loadMore {
  font-size: 13px;
  background-color: #0b0c10;
  border-color: #0b0c10;
  text-decoration: none;
  color: #fff;
  padding: 13px 15px;
  margin-top: 30px;
  border-radius: 4px;
  text-transform: uppercase;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 1.5px;
  border: 0;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background-color: #dc2626;
    border-color: #dc2626;
  }

  &:disabled {
    background: #eee;
  }
}
</style>