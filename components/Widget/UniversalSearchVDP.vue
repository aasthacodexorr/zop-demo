<script setup>
import vSelect from "vue-select";

const searchClient = typesenseInstantsearchAdapter().searchClient;

const appConfig = useAppConfig();
const zDSiteConfig = appConfig.site;
const collection = zDSiteConfig.collection;

const default_index = `${collection}/sort/status_rank:asc,created_at:desc`;
const inventory = ref();

watch(inventory, async (newInventory) => {
  console.log(newInventory.inventory_id);
  if (typeof newInventory === "object" && newInventory !== null) {
    let { inventory_id, year, make, model } = newInventory;
    navigateTo(getUrl(inventory_id, year, make, model));
    inventory.value = null;
  }
});
</script>
<template>
  <ais-instant-search
    :index-name="default_index"
    :search-client="searchClient"
    :future="{
      preserveSharedStateOnUnmount: true,
    }"
  >
    <ais-configure :hits-per-page.camel="25"></ais-configure>
    <ais-index :index-name="default_index" />
    <ais-autocomplete>
      <template v-slot="{ indices, refine }">
        <v-select
          type="input"
          @input="refine($event.target.value)"
          v-model="inventory"
          placeholder="Search by year, make, model ..."
          class="form-control form-control-dark universal-search-vdp"
          :options="indices[0].hits"
          label="search_keyword"
        >
          <template #selected-option="option">
            {{ option.year }} {{ option.make }} {{ option.model }}
          </template>
          <template
            #option="{
              year,
              make,
              model,
              vin,
              stock_no,
              odometer,
              selling_price,
              hide_price,
              km_miles,
            }"
          >
            <div>
              <div>{{ year }} {{ make }} {{ model }}</div>
              <small class="text-uppercase"
                ># {{ stock_no }}
                <span class="float-end">{{ vin }}</span></small
              >
              <br />
              <small>
                <Icon
                  name="bx:bxs-tachometer"
                  class="me-2"
                  style="position: relative; top: 2px"
                />
                <span
                  :style="parseInt(odometer) === 0 ? 'visibility:hidden' : ''"
                >
                  {{ formatNumber(odometer) }}
                  {{ km_miles }}
                </span>
                <span
                  class="float-end"
                  :style="parseInt(hide_price) !== 0 ? 'visibility:hidden' : ''"
                >
                  {{
                    formatNumber(selling_price, {
                      style: "currency",
                      currency: "USD",
                    })
                  }}
                </span>
              </small>
            </div>
          </template>
        </v-select>
      </template>
    </ais-autocomplete>
  </ais-instant-search>
</template>