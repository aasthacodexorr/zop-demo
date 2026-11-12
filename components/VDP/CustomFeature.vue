<script setup>
const props = defineProps({
  inventory: { type: Object, required: true },
});

const hasCustomFeatures = Array.isArray(props.inventory.custom_features);
</script>
<template>
  <CommonAccordionItem
    :class="`border-end-0 border-start-0 `"
    v-if="hasCustomFeatures"
    :b-class="`p-1`"
  >
    <template v-slot:header>Custom Features</template>
    <template v-slot:body>
      <div class="row g-0 p-1">
        <div
          class="px-3 py-1 bg-white border border-1 col-sm-6 col-12"
          :key="`custom_features_div_${index}`"
          v-for="(feature, index) in inventory.custom_features"
        >
          {{ feature }}
        </div>
      </div>
    </template>
  </CommonAccordionItem>
</template>