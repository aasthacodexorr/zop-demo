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
  background-color: #000;
  border-color: #000;
  text-decoration: none;
  color: #fff;
  padding: 13px 15px;
  margin-top: 30px;
  border-radius: 3px;
  text-transform: uppercase;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 1.5px;
  border: 0;

  &:disabled {
    background: #eee;
  }
}
</style>