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
  font-size: 15px;
  background-color: #000000;
  border: 2px solid #000000;
  text-decoration: none;
  color: #ffffff;
  padding: 14px 45px;
  margin-top: 25px;
  border-radius: 8px;
  text-transform: uppercase;
  font-weight: 700;
  letter-spacing: 1.5px;
  display: inline-block;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.25);
  cursor: pointer;
  transition: all 0.25s ease-in-out;

  &:hover:not(:disabled) {
    background-color: #dc2626;
    border-color: #dc2626;
    color: #ffffff;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(220, 38, 38, 0.4);
  }

  &:disabled {
    background: #cccccc;
    border-color: #cccccc;
    color: #666666;
    box-shadow: none;
    cursor: not-allowed;
  }
}
</style>