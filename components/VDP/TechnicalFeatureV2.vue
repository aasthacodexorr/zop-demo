<script setup>
const props = defineProps({
  inventory: { type: Object, required: true },
});

const hasValidJSONString = isValidJsonString(props.inventory.technical_specification);
const hasVinCompany = props.inventory.vin_company == "2";
</script>
<template>
  <CommonAccordionItem
    :class="`border-end-0 border-start-0 `"
    v-if="hasValidJSONString && hasVinCompany"
    :b-class="`p-1`"
  >
    <template v-slot:header>Technical Specifications</template>
    <template v-slot:body>
      <div class="row g-0 p-1">
        <template
          :key="`technical_feature_v2_header_${header}`"
          v-for="(option, header) in JSON.parse(inventory.technical_specification)"
        >
          <div class="col-xs-12 px-3 py-1">
            <b>{{ header }}</b>
          </div>
          <template
            :key="`technical_feature_v2_${header}_${option_key}`"
            v-for="(option_value, option_key) in option"
          >
            <div
              class="px-3 py-1 bg-white border col-xs-12"
            >
              <small><span class="d-inline-block w-50 text-truncate">{{ option_key }}</span> <span class="d-inline-block float-end fw-bolder">{{ option_value }}</span></small>
            </div>
          </template>
        </template>
      </div>
    </template>
  </CommonAccordionItem>
</template>