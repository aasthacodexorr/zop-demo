<script setup>
import { history as historyRouter } from "instantsearch.js/es/lib/routers";
import { singleIndex as singleIndexMapping } from "instantsearch.js/es/lib/stateMappings";

const appConfig = useAppConfig();
const zDSiteConfig = appConfig.site;
const collection = zDSiteConfig.collection;
const featured_key = zDSiteConfig.feature_inventory_key;
const searchClient = typesenseInstantsearchAdapter(featured_key).searchClient;

const default_index = `${collection}/sort/status_rank:asc,created_at:desc`;
const routing = {
  router: historyRouter({
    cleanUrlOnDispose: false,
    push(url) {
      router.push(url.replace(window.origin, ""));
    },
  }),
  stateMapping: singleIndexMapping(default_index),
};

// Carousel configuration
const carousel_config = {
  itemsToShow: 3,
  snapAlign: "center",
  breakpointMode: "viewport",
  breakpoints: {
    100: {
      itemsToShow: 1,
      snapAlign: "center",
    },
    576: {
      itemsToShow: 2,
      snapAlign: "start",
    },
    992: {
      itemsToShow: 3,
      snapAlign: "start",
    },
  },
};
</script>
<template>
  <!-- Feature  -->
  <section class="bg-gray ptb-4">
    <div class="container">
      <div class="row d-flex align-items-center">
        <div class="col col-6 col-md-8">
          <h2 class="h2">Featured Inventories</h2>
        </div>
        <div class="col col-6 col-md-4">
          <div class="text-end">
            <NuxtLink to="/inventory" class="btn btn-default"
              >View All
              <Icon
                name="bx:bxs-chevron-right"
                class="fs-5 fw-bolder align-middle"
            /></NuxtLink>
          </div>
        </div>
      </div>
      <div class="row g-0">
        <ais-instant-search
          :index-name="default_index"
          :search-client="searchClient"
          :future="{
            preserveSharedStateOnUnmount: true,
          }"
          :routing="routing"
        >
          <ais-configure :hits-per-page.camel="100"></ais-configure>
          <ais-infinite-hits>
            <template v-slot="{ items }">
              <carousel v-bind="carousel_config">
                <slide
                  v-for="item in items"
                  :key="`${item.inventory_id}_featured_carousel`"
                >
                  <WidgetSingleFeaturedVehicle
                    :item="item"
                  ></WidgetSingleFeaturedVehicle>
                </slide>
                <template #addons>
                  <navigation />
                  <pagination v-if="items.length >= 16" />
                </template>
              </carousel>
            </template>
          </ais-infinite-hits>
        </ais-instant-search>
      </div>
    </div>
  </section>
</template>