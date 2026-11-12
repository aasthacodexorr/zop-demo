<script setup>
const topFilterComponents = ref([]);
const topFilterDOM = ref([]);

const openFilterMenu = () => {
  for (const key in topFilterDOM.value) {
    topFilterDOM.value[key].$el.classList.add("small-device-top-filters-open");
    topFilterDOM.value[key].$el.classList.remove("d-none");
  }

  for (const key in topFilterComponents.value) {
    topFilterComponents.value[key].$el.classList.add("col-xs-12");
    topFilterComponents.value[key].$el.classList.remove("d-none");
  }
};

const closeFilterMenu = () => {
  for (const key in topFilterDOM.value) {
    topFilterDOM.value[key].$el.classList.remove(
      "small-device-top-filters-open"
    );
    topFilterDOM.value[key].$el.classList.add("d-none");
  }

  for (const key in topFilterComponents.value) {
    topFilterComponents.value[key].$el.classList.remove("col-xs-12");
    topFilterComponents.value[key].$el.classList.add("d-none");
  }
};
</script>
<template>
  <BDiv>
    <BDiv class="text-end d-xs-block d-md-none">
      <BButton class="rounded-0 btn-primary advance-filters-button py-3" @click="openFilterMenu"
        ><Icon
          name="bx:abacus"
          class="fw-bolder me-2 d-inline-block"
          style="vertical-align: middle"
        />
        Advance Filters</BButton
      >
    </BDiv>
    <Row
      :gutter="1"
      class="p-3 border mt-3 d-none d-md-flex bg-white"
      id="zd-phaeton-top-fitlers"
      :ref="(el) => topFilterDOM.push(el)"
    >
      <Col
        col="xs-12"
        class="d-md-none d-none"
        :ref="(el) => topFilterComponents.push(el)"
      >
        <BDiv class="text-center">
          <b-span
            class="btn btn-primary rounded-1 py-2 px-5 m-1 text-uppercase"
          >
            <VLPCount></VLPCount>
            Matching Vehicles Found</b-span
          >
          <VLPClearRefinements></VLPClearRefinements>
        </BDiv>
      </Col>
      <Col
        col="md-2"
        :ref="(el) => topFilterComponents.push(el)"
        class="d-md-block d-none"
      >
        <CommonDropdown
          dropdown-menu-class="p-2 pt-3 rounded-0 w-100"
          main-button-class="btn btn-outline-secondary w-100 rounded-0 text-start"
        >
          <template v-slot:header> Vehicle Type</template>
          <template v-slot:body>
            <ais-refinement-list
              :searchable-placeholder="'Search ...'"
              attribute="vehicle_type"
              :searchable="true"
              :limit="50"
              :sort-by="['isRefined', 'name:asc', 'count:desc']"
              :class-names="{
                'ais-RefinementList-showMore':
                  'btn btn-primary w-100 rounded-0',
                'ais-RefinementList-showMore--disabled': 'd-none',
                'ais-SearchBox-submit': 'd-none',
                'ais-SearchBox-input': 'w-100',
              }"
            />
          </template>
        </CommonDropdown>
      </Col>

      <Col
        col="md-2 xs-12"
        :ref="(el) => topFilterComponents.push(el)"
        class="d-md-block d-none"
      >
        <CommonDropdown
          dropdown-menu-class="p-2 pt-3 rounded-0 w-100"
          main-button-class="btn btn-outline-secondary w-100 rounded-0 text-start"
        >
          <template v-slot:header>Price</template>
          <template v-slot:body>
            <div class="px-2">
              <VLPRangeSlider :attribute="'selling_price'" />
            </div>
          </template>
        </CommonDropdown>
      </Col>

      <Col
        col="md-2 xs-12"
        :ref="(el) => topFilterComponents.push(el)"
        class="d-md-block d-none"
      >
        <CommonDropdown
          dropdown-menu-class="p-2 pt-3 rounded-0 w-100"
          main-button-class="btn btn-outline-secondary w-100 rounded-0 text-start"
        >
          <template v-slot:header>Year</template>
          <template v-slot:body>
            <ais-refinement-list
              :searchable-placeholder="'Search ...'"
              attribute="year"
              :searchable="true"
              :limit="50"
              :sort-by="['isRefined', 'name:asc', 'count:desc']"
              :class-names="{
                'ais-RefinementList-showMore':
                  'btn btn-primary w-100 rounded-0',
                'ais-RefinementList-showMore--disabled': 'd-none',
                'ais-SearchBox-submit': 'd-none',
                'ais-SearchBox-input': 'w-100',
              }"
            />
          </template>
        </CommonDropdown>
      </Col>

      <Col
        col="md-2"
        :ref="(el) => topFilterComponents.push(el)"
        class="d-md-block d-none"
      >
        <CommonDropdown
          dropdown-menu-class="p-2 pt-3 rounded-0 w-100"
          main-button-class="btn btn-outline-secondary w-100 rounded-0 text-start"
        >
          <template v-slot:header>Make</template>
          <template v-slot:body>
            <ais-refinement-list
              :searchable-placeholder="'Search ...'"
              attribute="make"
              :searchable="true"
              :limit="50"
              :sort-by="['isRefined', 'name:asc', 'count:desc']"
              :class-names="{
                'ais-RefinementList-showMore':
                  'btn btn-primary w-100 rounded-0',
                'ais-RefinementList-showMore--disabled': 'd-none',
                'ais-SearchBox-submit': 'd-none',
                'ais-SearchBox-input': 'w-100',
              }"
            />
          </template>
        </CommonDropdown>
      </Col>

      <Col
        col="md-2"
        :ref="(el) => topFilterComponents.push(el)"
        class="d-md-block d-none"
      >
        <CommonDropdown
          dropdown-menu-class="p-2 pt-3 rounded-0 w-100"
          main-button-class="btn btn-outline-secondary w-100 rounded-0 text-start"
        >
          <template v-slot:header>Model</template>
          <template v-slot:body>
            <ais-refinement-list
              :searchable-placeholder="'Search ...'"
              attribute="model"
              :searchable="true"
              :limit="50"
              :sort-by="['isRefined', 'name:asc', 'count:desc']"
              :class-names="{
                'ais-RefinementList-showMore':
                  'btn btn-primary w-100 rounded-0',
                'ais-RefinementList-showMore--disabled': 'd-none',
                'ais-SearchBox-submit': 'd-none',
                'ais-SearchBox-input': 'w-100',
              }"
            />
          </template>
        </CommonDropdown>
      </Col>

      <Col
        col="md-2"
        :ref="(el) => topFilterComponents.push(el)"
        class="d-md-block d-none"
      >
        <CommonDropdown
          dropdown-menu-class="p-2 pt-3 rounded-0 w-100"
          main-button-class="btn btn-outline-secondary w-100 rounded-0 text-start"
        >
          <template v-slot:header>Odometer</template>
          <template v-slot:body>
            <div class="px-2">
              <VLPRangeSlider
                :steps="500"
                :format-prefix="''"
                :attribute="'odometer'"
              />
            </div>
          </template>
        </CommonDropdown>
      </Col>

      <Col
        col="md-2"
        :ref="(el) => topFilterComponents.push(el)"
        class="d-md-block d-none"
      >
        <CommonDropdown
          dropdown-menu-class="p-2 pt-3 rounded-0 w-100"
          main-button-class="btn btn-outline-secondary w-100 rounded-0 text-start"
        >
          <template v-slot:header>Exterior Color</template>
          <template v-slot:body>
            <ais-refinement-list
              :searchable-placeholder="'Search ...'"
              attribute="exterior_color"
              :searchable="true"
              :limit="50"
              :sort-by="['isRefined', 'name:asc', 'count:desc']"
              :class-names="{
                'ais-RefinementList-showMore':
                  'btn btn-primary w-100 rounded-0',
                'ais-RefinementList-showMore--disabled': 'd-none',
                'ais-SearchBox-submit': 'd-none',
                'ais-SearchBox-input': 'w-100',
              }"
            />
          </template>
        </CommonDropdown>
      </Col>

      <Col
        col="md-2"
        :ref="(el) => topFilterComponents.push(el)"
        class="d-md-block d-none"
      >
        <CommonDropdown
          dropdown-menu-class="p-2 pt-3 rounded-0 w-100"
          main-button-class="btn btn-outline-secondary w-100 rounded-0 text-start"
        >
          <template v-slot:header>Body Type</template>
          <template v-slot:body>
            <ais-refinement-list
              :searchable-placeholder="'Search ...'"
              attribute="body_type"
              :searchable="true"
              :limit="50"
              :sort-by="['isRefined', 'name:asc', 'count:desc']"
              :class-names="{
                'ais-RefinementList-showMore':
                  'btn btn-primary w-100 rounded-0',
                'ais-RefinementList-showMore--disabled': 'd-none',
                'ais-SearchBox-submit': 'd-none',
                'ais-SearchBox-input': 'w-100',
              }"
            />
          </template>
        </CommonDropdown>
      </Col>

      <Col
        col="md-2"
        :ref="(el) => topFilterComponents.push(el)"
        class="d-md-block d-none"
      >
        <CommonDropdown
          dropdown-menu-class="p-2 pt-3 rounded-0 w-100"
          main-button-class="btn btn-outline-secondary w-100 rounded-0 text-start"
        >
          <template v-slot:header>Transmission</template>
          <template v-slot:body>
            <ais-refinement-list
              :searchable-placeholder="'Search ...'"
              attribute="transmission"
              :searchable="true"
              :limit="50"
              :sort-by="['isRefined', 'name:asc', 'count:desc']"
              :class-names="{
                'ais-RefinementList-showMore':
                  'btn btn-primary w-100 rounded-0',
                'ais-RefinementList-showMore--disabled': 'd-none',
                'ais-SearchBox-submit': 'd-none',
                'ais-SearchBox-input': 'w-100',
              }"
            />
          </template>
        </CommonDropdown>
      </Col>

      <Col
        col="md-2"
        :ref="(el) => topFilterComponents.push(el)"
        class="d-md-block d-none"
      >
        <CommonDropdown
          dropdown-menu-class="p-2 pt-3 rounded-0 w-100"
          main-button-class="btn btn-outline-secondary w-100 rounded-0 text-start"
        >
          <template v-slot:header>Drivetrain</template>
          <template v-slot:body>
            <ais-refinement-list
              :searchable-placeholder="'Search ...'"
              attribute="drivetrain"
              :searchable="true"
              :limit="50"
              :sort-by="['isRefined', 'name:asc', 'count:desc']"
              :class-names="{
                'ais-RefinementList-showMore':
                  'btn btn-primary w-100 rounded-0',
                'ais-RefinementList-showMore--disabled': 'd-none',
                'ais-SearchBox-submit': 'd-none',
                'ais-SearchBox-input': 'w-100',
              }"
            />
          </template>
        </CommonDropdown>
      </Col>

      <Col
        col="md-2"
        :ref="(el) => topFilterComponents.push(el)"
        class="d-md-block d-none"
      >
        <CommonDropdown
          dropdown-menu-class="p-2 pt-3 rounded-0 w-100"
          main-button-class="btn btn-outline-secondary w-100 rounded-0 text-start"
        >
          <template v-slot:header>Engine</template>
          <template v-slot:body>
            <ais-refinement-list
              :searchable-placeholder="'Search ...'"
              attribute="engine"
              :searchable="true"
              :limit="50"
              :sort-by="['isRefined', 'name:asc', 'count:desc']"
              :class-names="{
                'ais-RefinementList-showMore':
                  'btn btn-primary w-100 rounded-0',
                'ais-RefinementList-showMore--disabled': 'd-none',
                'ais-SearchBox-submit': 'd-none',
                'ais-SearchBox-input': 'w-100',
              }"
            />
          </template>
        </CommonDropdown>
      </Col>

      <Col
        col="md-2"
        :ref="(el) => topFilterComponents.push(el)"
        class="d-md-block d-none"
      >
        <CommonDropdown
          dropdown-menu-class="p-2 pt-3 rounded-0 w-100"
          main-button-class="btn btn-outline-secondary w-100 rounded-0 text-start"
        >
          <template v-slot:header>Fuel Type</template>
          <template v-slot:body>
            <ais-refinement-list
              :searchable-placeholder="'Search ...'"
              attribute="fuel_type"
              :searchable="true"
              :limit="50"
              :sort-by="['isRefined', 'name:asc', 'count:desc']"
              :class-names="{
                'ais-RefinementList-showMore':
                  'btn btn-primary w-100 rounded-0',
                'ais-RefinementList-showMore--disabled': 'd-none',
                'ais-SearchBox-submit': 'd-none',
                'ais-SearchBox-input': 'w-100',
              }"
            />
          </template>
        </CommonDropdown>
      </Col>
      <Col
        class="py-5 d-none"
        :ref="(el) => topFilterComponents.push(el)"
      ></Col>
      <BButton
        col="xs-12 d-md-none"
        :ref="(el) => topFilterComponents.push(el)"
        @click="closeFilterMenu"
        id="close-advanced-top-filter"
        class="btn btn-primary col-xs-12 d-md-none d-none btn btn-primary p-4 rounded-0 fs-6"
        >Close Advance Filters</BButton
      >
    </Row>
  </BDiv>
</template>
<style lang="scss">
#close-advanced-top-filter {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
}
#zd-phaeton-top-fitlers {
  ul.ais-RefinementList-list {
    max-height: 250px;
    overflow-y: auto;
  }
}

.small-device-top-filters-open {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 100vh;
  z-index: 999;
  margin: 0 !important;
  overflow: auto;
}
</style>