<script setup>
import vSelect from "vue-select";

const searchClient = typesenseInstantsearchAdapter().searchClient;

const appConfig = useAppConfig();
const zDSiteConfig = appConfig.site;
const collection = zDSiteConfig.collection;

const default_index = `${collection}/sort/status_rank:asc,created_at:desc`;

const getCurrentRefinement = (refinement) => {
  console.log(refinement);
  if (refinement !== null) {
    navigateTo(`/inventory?query=${refinement}`);
  }
};
</script>
<template>
  <ais-instant-search
    :index-name="default_index"
    :search-client="searchClient"
    :future="{
      preserveSharedStateOnUnmount: true,
    }"
  >
    <ais-index :index-name="default_index" />
    <ais-autocomplete>
      <template v-slot="{ currentRefinement, indices, refine }">
        <v-select
          type="input"
          @keyup="refine($event.target.value)"
          @keydown.enter="getCurrentRefinement(currentRefinement)"
          placeholder="Search by year, make, model ..."
          class="form-control universal-search-vlp"
          :options="currentRefinement ? indices[0].hits : []"
          label="search_keyword"
        >
          <template #selected-option="{}">
            {{ currentRefinement }}
          </template>
          <template #option="{ year, make, model, vin, stock_no }">
            <NuxtLink :to="`/inventory?query=${currentRefinement}`">
              <div>{{ year }} {{ make }} {{ model }}</div>
              <small># {{ stock_no }} {{ vin }}</small>
            </NuxtLink>
          </template>
          <template v-slot:no-options="{ search, searching }">
            <template v-if="searching">
              No results found for <em>{{ search }}</em
              >.
            </template>
            <em v-else style="opacity: 0.5"
              >Start typing to search for a vehicle.</em
            >
          </template>
        </v-select>
      </template>
    </ais-autocomplete>
  </ais-instant-search>
</template>