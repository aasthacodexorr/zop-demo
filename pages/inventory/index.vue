<script setup>
import { history as historyRouter } from "instantsearch.js/es/lib/routers";
import { singleIndex as singleIndexMapping } from "instantsearch.js/es/lib/stateMappings";
const router = useRouter();
const appConfig = useAppConfig();
const zDSiteConfig = appConfig.site;

import { vElementVisibility } from "@vueuse/components";

useSeoMeta({
  title: zDSiteConfig.inventory_page_default_title,
  description: zDSiteConfig.inventory_page_default_description,
});

const currentVisibility = ref(false);
const previousVisibility = ref(false);

const searchClient = typesenseInstantsearchAdapter().searchClient;
const collection = zDSiteConfig.collection;
const autoClickNext = ref(false);
const filterType = ref("left");

const visibilityChanged = (isVisible) => {
  currentVisibility.value = isVisible;
  if (currentVisibility.value !== previousVisibility.value) {
    if (isVisible) {
      autoClickNext.value = true;
    } else {
      autoClickNext.value = false;
    }
  }

  previousVisibility.value = currentVisibility.value;
};

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
</script>

<template>
  <ais-instant-search
    :index-name="default_index"
    :search-client="searchClient"
    :future="{
      preserveSharedStateOnUnmount: true,
    }"
    :routing="routing"
  >
    <ais-configure :hits-per-page.camel="24"></ais-configure>
    <Container type="fluid" class="bg-gray" id="sidebar">
      <Row>
        <Col col="sm-12" class="text-center bg-gray">
          <Row>
            <Col>
              <!-- Placeholder for Above the Listing Page -->
            </Col>
          </Row>
        </Col>
        <VLPLeftFilters v-if="filterType === 'left'"></VLPLeftFilters>
        <Col
          :class="filterType === 'top' ? 'offset-md-1' : ''"
          :col="filterType === 'top' ? 'sm-12 md-10' : 'xs-12 sm-12 md-9 lg-10'"
          class="bg-gray"
        >
          <Row class="justify-content-between">
            <Col
              class="offset-8 text-end p-3 small fw-bold d-none d-md-block"
              v-if="filterType === 'top'"
              col="md-4"
              >Showing <VLPCount></VLPCount> Vehicles</Col
            >
            <Col col="sm-12 md-5 lg-4">
              <VLPSearchBar></VLPSearchBar>
            </Col>
            <Col col="sm-12 md-5" class="text-end">
              <VLPSortBy :collection="collection"></VLPSortBy>
            </Col>
          </Row>
          <Col col="md-12" class="d-md-block" v-if="filterType === 'top'">
            <VLPTopFilters></VLPTopFilters>
          </Col>
          <Col col="xs-12">
            <ais-current-refinements
              :class-names="{
                'ais-CurrentRefinements-list': 'ps-0',
                'ais-CurrentRefinements-category':
                  'd-inline-block badge-default px-2 py-0 me-2 rounded border my-1 cursor-pointer',
                'ais-CurrentRefinements-delete':
                  'btn btn-link p-0 m-0 px-1 text-decoration-none border-0 align-text-bottom',
              }"
            />
          </Col>
          <ais-infinite-hits
            :class-names="{
              'ais-InfiniteHits': 'col-xs-12 row',
              'ais-InfiniteHits-list': 'row',
              'ais-InfiniteHits-item':
                'col-xs-12 col-md-3 d-flex flex-column bg-gray my-2',
            }"
            :show-previous="false"
          >
            <template v-slot="{ items, isLastPage, refineNext }">
              <VLPNoInventoryFound
                v-if="items.length === 0"
              ></VLPNoInventoryFound>
              <div
                v-for="(item, index) in items"
                :key="item.stock_no"
                class="col-xs-12 col-md-3 d-flex flex-column my-2"
              >
                <template v-if="index === items.length - 1">
                  <a v-element-visibility="visibilityChanged"></a>
                </template>
                <VLPGridEntity :item="item"></VLPGridEntity>
                <template v-if="index === items.length - 1">
                  <a v-element-visibility="visibilityChanged"></a>
                </template>
              </div>
              <div>
                <VLPShowMore
                  :auto-click-next="autoClickNext"
                  :is-last-page="isLastPage"
                  :refine-next="refineNext"
                ></VLPShowMore>
              </div>
            </template>
          </ais-infinite-hits>
        </Col>
        <Col col="sm-12" class="text-center gy-3 bg-gray">
          <Row>
            <Col>
               <!-- Placeholder for Below the Listing Page -->
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  </ais-instant-search>
</template>
<style lang="scss">
/*------------------Scroll bar css Start-------------*/
ul.ais-RefinementList-list {
  list-style-type: none;
  padding-left: 0px;
}

label span.ais-RefinementList-count {
  float: right;
  font-weight: 700;
  background-color: #ddd;
  color: #000;
  padding: 1px 6px;
  border-radius: 5px;
  font-size: 11px;
}

ul.ais-RefinementList-list li label input[type="checkbox"] {
  visibility: hidden;
  height: 20px;
  width: 20px;
  position: absolute;
  margin: 0;
}

.ais-CurrentRefinements-item {
  display: inline-block;
}

ul.ais-RefinementList-list li label .filter-count {
  position: absolute;
  right: 0;
  vertical-align: middle;
  top: 2px;
  background: #eee;
  border-radius: 3px;
  background-clip: padding-box;
  color: #333;
  font-size: 0.8em;
  font-style: italic;
  height: 24px;
  padding: 0 5px;
  line-height: 24px;
  min-width: 24px;
  text-align: center;
}
ul.ais-RefinementList-list li label {
  display: block;
  position: relative;
}
ul.ais-RefinementList-list li label {
  display: block;
  height: 20px;
  margin: 3px 0;
}
ul.ais-RefinementList-list li label span.ais-RefinementList-labelText {
  position: absolute;
  width: 85%;
  height: 100%;
  padding-left: 30px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #333;
  font-weight: 400;
  cursor: pointer;
}
ul.ais-RefinementList-list li label span.ais-RefinementList-labelText:after {
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
  filter: alpha(opacity=0);
  opacity: 1;
  content: "";
  position: absolute;
  width: 16px;
  height: 16px;
  background: transparent;
  top: 3px;
  left: 2px;
  border-width: 1px;
  border-style: solid;
  border-color: #ddd;
  -webkit-transition: all 0.5s ease;
  transition: all 0.5s ease;
}
ul.ais-RefinementList-list
  li
  label
  input[type="checkbox"]:checked
  + span.ais-RefinementList-labelText:after {
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)";
  filter: alpha(opacity=100);
  opacity: 1;
  height: 8px;
  border-width: 3px;
  border-color: #dc2626;
  border-top: none;
  border-right: none;
  -webkit-transform: rotate(-45deg);
  -moz-transform: rotate(-45deg);
  -o-transform: rotate(-45deg);
  -ms-transform: rotate(-45deg);
  transform: rotate(-45deg);
}

.ais-geo-search--toggle-label,
.ais-refinement-list--label,
.ais-toggle--label,
.ais-RefinementList-label {
  width: 100%;
}
.ais-current-refined-values--count,
.ais-hierarchical-menu--count,
.ais-menu--count,
.ais-refinement-list--count,
.ais-star-rating--count,
.ais-toggle--count,
.ais-RefinementList-count {
  float: right;
  border-radius: 0;
}
.ais-CurrentRefinements-label {
  display: none;
}

ul.ais-RefinementList-list li label span.ais-RefinementList-labelText {
  color: black;
}

#sidebar {
  .accordion-body {
    overflow-y: auto;
  }
}

.ais-RangeInput {
  font-size: 0.9em;
}

input.ais-RangeInput-input.ais-RangeInput-input--min {
  color: #000;
  border: 1px solid #d0d0d0;
  border-radius: 3px;
  width: 90%;
  margin: 0px 2%;
  padding: 5px 6px;
  font-weight: 400;
}
form.ais-RangeInput-form {
  color: #000;
}
input.ais-RangeInput-input.ais-RangeInput-input--max {
  color: #000;
  border: 1px solid #d0d0d0;
  border-radius: 3px;
  width: 90%;
  margin: 0px 2%;
  padding: 5px 6px;
  font-weight: 400;
}
span.ais-RangeInput-separator {
  text-transform: capitalize;
}
button.ais-RangeInput-submit {
  background-color: #dc2626;
  padding: 6px 12px;
  border-radius: 4px;
  color: #fff;
  top: 0px;
  position: relative;
  border: 0;
  font-weight: 600;
  transition: background-color 0.2s ease;
}
button.ais-RangeInput-submit:hover {
  background-color: #0b0c10;
}
.ais-InfiniteHits-list {
  list-style-type: none;

  p {
    padding: 0;
  }
}

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
}
button.ais-InfiniteHits-loadMore:hover {
  background-color: #dc2626;
  border-color: #dc2626;
}
</style>