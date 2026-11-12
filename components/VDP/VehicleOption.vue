<script setup>
const props = defineProps({
  inventory: { type: Object, required: true },
});

const hasValidJSONString = isValidJsonString(props.inventory.optional);
</script>
<template>
  <CommonAccordionItem
    :class="`border-end-0 border-start-0 `"
    v-if="hasValidJSONString"
    :b-class="`p-1`"
  >
    <template v-slot:header>Vehicle Options</template>
    <template v-slot:body>

      <div class="row g-0 p-1">
        <template
          :key="`vehicle_option_header_${header}`"
          v-for="(option, header) in JSON.parse(inventory.optional)"
        >
          <div class="col-xs-12 px-3">
            <b>{{ header }}</b>
          </div>
          <template
            :key="`vehicle_option_${header}_${option_key}`"
            v-for="(option_value, option_key) in option"
          >
            <div
              v-if="parseInt(option_value) === 1"
              class="px-3 py-1 bg-white border col-sm-6 col-12"
            >
              {{ option_key }}
            </div>
          </template>
        </template>
      </div>
    </template>
  </CommonAccordionItem>
</template>