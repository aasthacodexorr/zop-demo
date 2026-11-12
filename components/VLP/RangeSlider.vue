<script setup>
import "@vueform/slider/themes/default.css";
import Slider from "@vueform/slider";

const props = defineProps({
  attribute: { type: String, required: true },
  steps: { type: Number, required: false, default: 1000 },
  formatPrefix: { type: String, required: false, default: "$ " },
});

const currentValue = ref([0, 0]);
const currentRangeRefinement = ref(null);
const currentRange = ref(null);

watch(currentRange, async (newRange, oldRange) => {
  try {
    if (newRange !== null) {
      if (oldRange === null) {
        let min =
          typeof currentRangeRefinement.value.min === "number"
            ? currentRangeRefinement.value.min
            : newRange.min;
        let max =
          typeof currentRangeRefinement.value.max === "number"
            ? currentRangeRefinement.value.max
            : newRange.max;
        currentValue.value[1] = max;
        currentValue.value[0] = min;
      }
    }
  } catch (error) {}
});
</script>
<template>
  <ais-range-input :attribute="props.attribute">
    <template v-slot="{ currentRefinement, range, refine }">
      <Slider
        :min="range.min"
        :max="range.max"
        :lazy="false"
        :step="props.steps"
        :tooltips="false"
        @end="refine({ min: $event[0], max: $event[1] })"
        v-model="currentValue"
      />
      <div class="py-3">
        <span class="w-50 d-inline-block">{{
          props.formatPrefix + formatNumber(currentValue[0])
        }}</span>
        <span class="w-50 d-inline-block text-end">{{
          props.formatPrefix + formatNumber(currentValue[1])
        }}</span>
      </div>
      <input
        type="hidden"
        :value="(currentRangeRefinement = currentRefinement)"
      />
      <input type="hidden" :value="(currentRange = range)" />
    </template>
  </ais-range-input>
</template>