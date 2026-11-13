<script setup>
onMounted(async () => {
  const openButton = document.getElementById("leftMenuOpenButton");
  const closeButton = document.getElementById("leftMenuCloseButton");
  const content = document.getElementById("left-menu-filter-container");

  // Add class on "Open" button click
  openButton.addEventListener("click", () => {
    content.style.display = "block"; // Show content
    content.classList.add("highlight"); // Add highlight class
    content.classList.remove('d-none');
  });

  // Remove class on "Close" button click
  closeButton.addEventListener("click", () => {
    content.style.display = "none"; // Hide content
    content.classList.remove("highlight"); // Remove highlight class
    content.classList.add('d-none');
  });
});
</script>
<template>
  <Col col="xs-12 sm-12 md-4 lg-3" class="d-md-block zd-sticky">
    <BDiv class="text-end d-xs-block d-md-none">
      <BButton
        id="leftMenuOpenButton"
        class="rounded btn-dark advance-filters-button py-3"
        ><Icon
          name="bx:abacus"
          class="fw-bolder me-2 d-inline-block"
          style="vertical-align: middle"
        />
        Advance Filters</BButton
      >
    </BDiv>
    <div class="filter-container d-md-block d-none" id="left-menu-filter-container">
      <div class="">
        <div class="mb-5 notranslate filterCard card">
          <button class="btn btn-link d-xs-block d-md-none text-end px-2">
            <Icon
              id="leftMenuCloseButton"
              name="bx:x-circle"
              class="fw-bolder fs-2 text-danger d-inline-block"
              style="vertical-align: middle"
            />
          </button>
          <div class="pt-3 pb-2 bg-white card-header">
            <div class="card-title h6 font-weight-bold mb-2">
              <VLPCount></VLPCount> matches<VLPClearRefinements
                :block-class="'d-inline'"
                :class="'border-0 btn btn-link p-0 m-0 float-end font-weight-normal text-decoration-none'"
              ></VLPClearRefinements>
            </div>
            <div class="d-inline-block">
              <ais-current-refinements
                :class-names="{
                  'ais-CurrentRefinements-list': 'ps-0',
                  'ais-CurrentRefinements-category':
                    'd-inline-block badge-default px-2 py-0 me-2 rounded border my-1 cursor-pointer',
                  'ais-CurrentRefinements-delete':
                    'btn btn-link p-0 m-0 px-1 text-decoration-none border-0 align-text-bottom',
                }"
              />
            </div>
          </div>
          <div class="pb-0 mt-sm-0">
            <div class="price-financing card-footer">
              <div class="cursor-pointer">Price</div>
              <div class="mt-2 collapse show">
                <VLPRangeSlider :attribute="'selling_price'" />
              </div>
            </div>
            <div id="left_menu_accordion">
              <!-- Make Filters : START -->
              <VLPLeftMenuAccordionItem>
                <template v-slot:header> Make </template>
                <template v-slot:body>
                  <ais-refinement-list
                    attribute="make"
                    show-more
                    :limit="10"
                    :sort-by="['name']"
                    :class-names="{
                      'ais-RefinementList-showMore':
                        'btn btn-dark w-100 rounded',
                      'ais-RefinementList-showMore--disabled': 'd-none',
                      'ais-RefinementList-list': 'left-menu-items-list w-100',
                    }"
                  />
                </template>
              </VLPLeftMenuAccordionItem>
              <!-- Make Filters : END -->

              <!-- Model Filters : START -->
              <VLPLeftMenuAccordionItem>
                <template v-slot:header> Model </template>
                <template v-slot:body>
                  <ais-refinement-list
                    attribute="model"
                    show-more
                    :limit="8"
                    :sort-by="['name']"
                    :class-names="{
                      'ais-RefinementList-showMore':
                        'btn btn-dark w-100 rounded',
                      'ais-RefinementList-showMore--disabled': 'd-none',
                      'ais-RefinementList-list': 'left-menu-items-list w-100',
                    }"
                  />
                </template>
              </VLPLeftMenuAccordionItem>
              <!-- Model Filters : END -->

              <!-- Year Filters : START -->
              <VLPLeftMenuAccordionItem>
                <template v-slot:header> Year </template>
                <template v-slot:body>
                  <ais-refinement-list
                    attribute="year"
                    show-more
                    :limit="10"
                    :sort-by="['name:desc']"
                    :class-names="{
                      'ais-RefinementList-showMore':
                        'btn btn-dark w-100 rounded',
                      'ais-RefinementList-showMore--disabled': 'd-none',
                      'ais-RefinementList-list': 'left-menu-items-list w-100',
                    }"
                  />
                </template>
              </VLPLeftMenuAccordionItem>
              <!-- Year Filters : END -->

              <!-- Odometer Filters : START -->
              <VLPLeftMenuAccordionItem>
                <template v-slot:header> Odometer </template>
                <template v-slot:body>
                  <ais-numeric-menu
                    attribute="odometer"
                    :items="[
                      { label: 'All' },
                      { label: '10,000 and less', end: 10000 },
                      { label: '20,000 and less', end: 20000 },
                      { label: '30,000 and less', end: 30000 },
                      { label: '40,000 and less', end: 40000 },
                      { label: '50,000 and less', end: 50000 },
                      { label: '60,000 and less', end: 60000 },
                      { label: '70,000 and less', end: 70000 },
                      { label: '80,000 and less', end: 80000 },
                      { label: '90,000 and less', end: 90000 },
                      { label: '100,000 and less', end: 100000 },
                      { label: 'More than 100,000', start: 100000 },
                    ]"
                  />
                </template>
              </VLPLeftMenuAccordionItem>
              <!-- Odometer Filters : END -->

              <!-- Body Style Filters : START -->
              <VLPLeftMenuAccordionItem>
                <template v-slot:header> Body Style </template>
                <template v-slot:body>
                  <ais-refinement-list
                    attribute="body_type"
                    :limit="100"
                    :sort-by="['name']"
                    :class-names="{
                      'ais-RefinementList-showMore':
                        'btn btn-dark w-100 rounded',
                      'ais-RefinementList-showMore--disabled': 'd-none',
                      'ais-RefinementList-list': 'left-menu-items-list w-100',
                    }"
                  />
                </template>
              </VLPLeftMenuAccordionItem>
              <!-- Body Style Filters : END -->

              <!-- Exterior Color Filters : START -->
              <VLPLeftMenuAccordionItem>
                <template v-slot:header> Exterior Color </template>
                <template v-slot:body>
                  <ais-refinement-list
                    attribute="exterior_color"
                    :limit="100"
                    :sort-by="['name']"
                    :class-names="{
                      'ais-RefinementList-showMore':
                        'btn btn-dark w-100 rounded',
                      'ais-RefinementList-showMore--disabled': 'd-none',
                      'ais-RefinementList-list': 'left-menu-items-list w-100',
                    }"
                  />
                </template>
              </VLPLeftMenuAccordionItem>
              <!-- Exterior Color Filters : END -->

              <!-- Interior Color Filters : START -->
              <VLPLeftMenuAccordionItem>
                <template v-slot:header> Interior Color </template>
                <template v-slot:body>
                  <ais-refinement-list
                    attribute="interior_color"
                    :limit="100"
                    :sort-by="['name']"
                    :class-names="{
                      'ais-RefinementList-showMore':
                        'btn btn-dark w-100 rounded',
                      'ais-RefinementList-showMore--disabled': 'd-none',
                      'ais-RefinementList-list': 'left-menu-items-list w-100',
                    }"
                  />
                </template>
              </VLPLeftMenuAccordionItem>
              <!-- Interior Color Filters : END -->

              <!-- Fuel Type Filters : START -->
              <VLPLeftMenuAccordionItem>
                <template v-slot:header> Fuel Type </template>
                <template v-slot:body>
                  <ais-refinement-list
                    attribute="fuel_type"
                    :limit="100"
                    :sort-by="['name']"
                    :class-names="{
                      'ais-RefinementList-showMore':
                        'btn btn-dark w-100 rounded',
                      'ais-RefinementList-showMore--disabled': 'd-none',
                      'ais-RefinementList-list': 'left-menu-items-list w-100',
                    }"
                  />
                </template>
              </VLPLeftMenuAccordionItem>
              <!-- Fuel Type Filters : END -->

              <!-- Transmission Filters : START -->
              <VLPLeftMenuAccordionItem>
                <template v-slot:header> Transmission </template>
                <template v-slot:body>
                  <ais-refinement-list
                    attribute="transmission"
                    :limit="100"
                    :sort-by="['name']"
                    :class-names="{
                      'ais-RefinementList-showMore':
                        'btn btn-dark w-100 rounded',
                      'ais-RefinementList-showMore--disabled': 'd-none',
                      'ais-RefinementList-list': 'left-menu-items-list w-100',
                    }"
                  />
                </template>
              </VLPLeftMenuAccordionItem>
              <!-- Transmission Filters : END -->

              <!-- Drivetrain Filters : START -->
              <VLPLeftMenuAccordionItem>
                <template v-slot:header> Drivetrain </template>
                <template v-slot:body>
                  <ais-refinement-list
                    attribute="drivetrain"
                    :limit="100"
                    :sort-by="['name']"
                    :class-names="{
                      'ais-RefinementList-showMore':
                        'btn btn-dark w-100 rounded',
                      'ais-RefinementList-showMore--disabled': 'd-none',
                      'ais-RefinementList-list': 'left-menu-items-list w-100',
                    }"
                  />
                </template>
              </VLPLeftMenuAccordionItem>
              <!-- Drivetrain Filters : END -->

              <!-- Engine Filters : START -->
              <VLPLeftMenuAccordionItem>
                <template v-slot:header> Engine </template>
                <template v-slot:body>
                  <ais-refinement-list
                    attribute="engine"
                    :limit="100"
                    :sort-by="['name']"
                    :class-names="{
                      'ais-RefinementList-showMore':
                        'btn btn-dark w-100 rounded',
                      'ais-RefinementList-showMore--disabled': 'd-none',
                      'ais-RefinementList-list': 'left-menu-items-list w-100',
                    }"
                  />
                </template>
              </VLPLeftMenuAccordionItem>
              <!-- Engine Filters : END -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </Col>
</template>