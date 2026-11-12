<script setup>
const route = useRoute();
const { $swal } = useNuxtApp();
const appConfig = useAppConfig();
const dealershipConfig = appConfig.dealership;
const zDSiteConfig = appConfig.site;

let inventory_id = route.params.inventory_id.toString();

const config = useRuntimeConfig();
const collection = zDSiteConfig.collection;
const IMAGE_CDN = zDSiteConfig.cdn_api;
const CLIENT_DOMAIN = zDSiteConfig.saas_api;
const sAltert = $swal.mixin({
  showConfirmButton: false,
  timerProgressBar: true,
  confirmButtonText: "",
  title: "Downloading window sticker...",
  didOpen: () => {
    sAltert.showLoading();
  },
});

const requestHeaders = new Headers();
requestHeaders.set("X-TYPESENSE-API-KEY", `${zDSiteConfig.inventory_page_key}`);

const { data } = await useAsyncData("vehicle_detail_page_api", () =>
  $fetch(
    `https://${zDSiteConfig.typesense_host}/collections/${collection}/documents/search?q=*&limit=1&filter_by=inventory_id:=${inventory_id}`,
    {
      headers: requestHeaders,
    }
  )
);

let inventory_found = false;

let inventory = null;

if (data.value.hasOwnProperty("found") && data.value.hasOwnProperty("hits")) {
  if (parseInt(data.value.found) >= 1 && data.value.hits.length > 0) {
    inventory_found = true;
  }
}

if (!inventory_found) {
  throw createError({
    statusCode: 404,
    statusMessage: "Page Not Found",
  });
  //await navigateTo({ path: "/404" });
}

inventory = data.value.hits[0].document;

let unprocessed_files = inventory.files.split(";");

let files = {};

for (let file of unprocessed_files) {
  let file_index = file.split(" ");
  let file_url = file_index.pop();
  file_index = file_index.join(" ").trim();
  files[file_index] = parseAbsoluteOrRelativeUrl(IMAGE_CDN, file_url);
}

const visibleRef = ref(false);
const indexRef = ref(0);

const vehicle_images = getImageUrls(
  zDSiteConfig.cdn_api,
  dealershipConfig.default_placeholder_image,
  inventory.image_urls,
  inventory.image_with_overlay_urls
);

const main_vehicle_image = ref(vehicle_images[0]);
const current_main_vehicle_image_index = ref(0);

const hidePrice = parseInt(inventory["hide_price"], 10);
const sellingPrice = parseInt(inventory["selling_price"], 10);
const hasSpecialPrice = parseInt(inventory["special_price_on"], 10);
const vehiclePrice = parseInt(inventory["price"], 10);
const specialPrice = parseInt(inventory["special_price"], 10);
const hasFinancing = parseInt(inventory["financing_on"], 10);
const duration = parseInt(inventory["term"], 10);
const interestRate = parseFloat(inventory["interest_rate"]);

let downPayment = 0;

if (sellingPrice > 0 && parseInt(inventory.downpayment) > 0) {
  downPayment = (sellingPrice * parseFloat(inventory.downpayment)) / 100;
}

const showGalleryImage = (index) => {
  indexRef.value = index;
  visibleRef.value = true;
};
const onHideGalleryImage = () => (visibleRef.value = false);

const downloadWindowSticker = async (inventory_id) => {
  try {
    sAltert.fire();
    const response = await $fetch(
      `${CLIENT_DOMAIN}/api/website/inventory/sticker/v2/${inventory_id}`
    );
    console.log(response);
    const file = new Blob([response], { type: "application/pdf" });
    const fileURL = URL.createObjectURL(file);
    window.open(fileURL);

    sAltert.update({
      title: "Window Sticker Download",
      icon: "success",
    });
  } catch (e) {
    console.log(e);

    sAltert.update({
      title: "There were some errors while downloading.",
      icon: "error",
    });
  } finally {
    for (let index = 0; index < 1000; index++) {}

    sAltert.close();
  }
};

let dynamic_price_placeholder = "CALL FOR PRICE";

if (sellingPrice > 0) {
  dynamic_price_placeholder = formatNumber(sellingPrice, {
    style: "currency",
    currency: "USD",
  });
}

useHead({
  titleTemplate: zDSiteConfig.vdp_page_title_template,
  templateParams: {
    dynamic_price_placeholder,
    ...inventory,
    ...dealershipConfig,
  },
});

useSeoMeta({
  description: zDSiteConfig.vdp_page_description_template,
  ogImage: vehicle_images.length > 0 ? `${vehicle_images[0]}?quality=30` : "",
  ogImageAlt: `%year %make %model %trim Image`,
  twitterCard: "summary_large_image",
  ogLocale: "en_US",
});
</script>
<template>
  <div class="container my-4">
    <div class="row">
      <!-- Left Section: Main Car Image and Thumbnails -->
      <div class="col-lg-8">
        <NuxtImg
          id="mainCarImage"
          class="car-image mb-3"
          :src="main_vehicle_image"
          @click="() => showGalleryImage(current_main_vehicle_image_index)"
        ></NuxtImg>
        <div class="car-thumbnails d-flex flex-wrap">
          <img
            :src="vehicle_image"
            :alt="`${inventory.year} ${inventory.make} ${inventory.model} - Thumbnail ${current_image_index}`"
            v-for="(vehicle_image, current_image_index) in vehicle_images"
            :key="`vehicle_image_${current_image_index}`"
            @click="
              () => {
                main_vehicle_image = vehicle_image;
                current_main_vehicle_image_index = current_image_index;
              }
            "
            v-show="current_image_index <= 6"
          />
        </div>

        <div class="mobile-view-p d-block d-sm-none mt-3">
          <!-- Header -->

          <!-- Price -->
          <div class="pt-2" v-if="hidePrice || sellingPrice === 0">
            <a href="tel:" class="btn btn-primary w-100 mb-2 btn-text-left"
              >CALL FOR PRICE</a
            >
          </div>
          <div class="pt-2" v-else-if="hasSpecialPrice && specialPrice > 0">
            <p class="sale-d-price-sub">Price</p>
            <h2 class="fw-bold sale-d-price h6">
              <del>
                {{
                  formatNumber(vehiclePrice, {
                    style: "currency",
                    currency: "USD",
                  })
                }}
              </del>
            </h2>
            <h2 class="fw-bold sale-d-price">
              {{
                formatNumber(specialPrice, {
                  style: "currency",
                  currency: "USD",
                })
              }}
            </h2>
          </div>
          <div class="pt-2" v-else>
            <p class="sale-d-price-sub">Price</p>
            <h2 class="fw-bold sale-d-price">
              {{
                formatNumber(vehiclePrice, {
                  style: "currency",
                  currency: "USD",
                })
              }}
            </h2>
            <small>+ Taxes and Licensing Fee</small>
          </div>
          <!-- Estimated Payment -->
          <div
            v-if="hasFinancing && !hidePrice"
            class="border p-3 rounded mb-3 estimate-payment"
          >
            <span class="badge bg-dark mb-2">ESTIMATED PAYMENT</span>
            <div class="align-items-center">
              <h4 class="mb-0">
                {{
                  formatNumber(inventory.emi_amount, {
                    style: "currency",
                    currency: "USD",
                  })
                }}
                / {{ inventory.payment_frequency }}
              </h4>
            </div>
            <small class="d-block"
              >{{
                formatNumber(downPayment, {
                  style: "currency",
                  currency: "USD",
                })
              }}
              downpayment, {{ inventory.interest_rate }}% APR for
              {{ inventory.term }} Months.</small
            >
            <b-a
              toggle="modal"
              target="#financeCalculatorModal"
              class="text-primary text-decoration-none"
              style="cursor: pointer"
            >
              Personalize your payment →
            </b-a>
          </div>

          <!-- Action Buttons -->
          <NuxtLink
            :to="`/finance?inventory_id=${inventory.inventory_id}`"
            class="btn btn-primary w-100 mb-2 btn-text-left"
          >
            Get Prequalified Instantly<br /><small
              >No Impact To Your Credit</small
            >
          </NuxtLink>
          <NuxtLink
            :to="`/book-a-test-drive?inventory_id=${inventory.inventory_id}`"
            class="btn btn-outline-primary w-100 mb-3 btn-text-left"
          >
            Schedule a Test Drive
          </NuxtLink>

          <b-a
            toggle="modal"
            target="#requestInformationModal"
            class="btn btn-primary w-100 mb-3 btn-text-left"
          >
            Request Information
          </b-a>

          <!-- Trade-in Section -->
          <NuxtLink
            :to="`/trade-in-appraisal`"
            class="text-center bg-primary rounded text-white p-3 mt-4 d-flex align-items-center value-tride"
            data-driveo-form-open="true"
          >
            <img
              alt="Get your trade-in value"
              loading="lazy"
              decoding="async"
              data-nimg="1"
              src="https://zopsoftware-asset.b-cdn.net/phaeton/themes/theme-1/images/detail-icon/car-tool-keys.png"
            />
            <div class="px-3 mb-0 ms-1 text-start">
              <div class="h4 mb-0 vdp--trade-value">What's your car worth?</div>
              Get your trade-in value
            </div>
          </NuxtLink>
        </div>

        <h1 class="h1 mt-2" v-html="inventory.title"></h1>
        <div
          class="vdp-vehicle-tags py-2"
          v-show="
            typeof inventory.vehicle_tags == 'object' && inventory.vehicle_tags
          "
        >
          <span
            :class="`badge mx-1 bg-danger text-uppercase ${vehicle_tag
              .replace(/[^a-zA-Z]/g, '_')
              .toLowerCase()}`"
            :key="vehicle_tag"
            v-for="vehicle_tag in inventory.vehicle_tags"
            >{{ vehicle_tag }}</span
          >
        </div>
        <small class="small d-block">
          <span
            v-if="parseInt(inventory.vindisplay) !== 0"
            class="d-inline-block pe-3"
            >VIN: <b>{{ inventory.vin }}</b></span
          >
          Stock #: <b>{{ inventory.stock_no }}</b></small
        >
        <div class="row py-2">
          <!-- Vehicle History Report : START -->
          <div
            class="col-md-3 col-xs-12"
            v-if="files.hasOwnProperty('Vehicle History Report')"
          >
            <NuxtLink
              external
              target="_blank"
              :to="`${files['Vehicle History Report']}`"
            >
              <img
                class="w-100"
                :src="
                  files.hasOwnProperty('Vehicle History Badge')
                    ? files['Vehicle History Badge']
                    : 'https://cfx-wp-images.s3.amazonaws.com/2017/12/carfax-logo-small.jpg'
                "
                alt="Carfax"
              />
            </NuxtLink>
          </div>
          <!-- Vehicle History Report : END -->

          <!-- Vehicle Repair Report : START -->
          <div
            class="col-md-3 col-xs-12"
            v-if="files.hasOwnProperty('Vehicle Repair Report')"
          >
            <NuxtLink
              class="fs-6 text-decoration-none"
              style="vertical-align: sub"
              external
              target="_blank"
              :to="`${files['Vehicle Repair Report']}`"
            >
              <Icon name="bx:bx-file" class="fw-bolder me-2" /> Vehicle Repair
              Report
            </NuxtLink>
          </div>
          <!-- Vehicle Repair Report : END -->

          <!-- Window Sticker : START -->
          <div
            class="col-md-3 col-xs-12"
            v-if="files.hasOwnProperty('Window Sticker')"
          >
            <NuxtLink
              class="fs-6 text-decoration-none"
              style="vertical-align: sub"
              external
              target="_blank"
              :to="`${files['Window Sticker']}`"
            >
              <Icon name="bx:bxs-file-export" class="fw-bolder me-2" /> Window
              Sticker
            </NuxtLink>
          </div>
          <div class="col-md-3 col-xs-12" v-else>
            <a
              :data-id="inventory.inventory_id"
              @click.prevent="downloadWindowSticker(inventory.inventory_id)"
              style="vertical-align: sub; cursor: pointer"
              class="fs-6 text-decoration-none window-sticker-button"
            >
              <Icon name="bx:bxs-file-export" class="fw-bolder me-2" /> Window
              Sticker
            </a>
          </div>
          <!-- Window Sticker : END -->

          <!-- Other Report : START -->
          <div
            class="col-md-3 col-xs-12"
            v-if="files.hasOwnProperty('Other Report')"
          >
            <NuxtLink
              class="fs-6 text-decoration-none"
              style="vertical-align: sub"
              external
              target="_blank"
              :to="`${files['Other Report']}`"
            >
              <Icon name="bx:bxs-file-pdf" class="fw-bolder me-2" /> Other
              Report
            </NuxtLink>
          </div>
          <!-- Other Report : END -->
        </div>
        <hr />
        <h5 class="h5">About this vehicle</h5>
        <ul id="vdp-vehicle-summary" class="d-flex ps-0 flex-wrap">
          <li class="mx-2 my-2 card ps-3 pt-1">
            <NuxtImg
              src="https://zopsoftware-asset.b-cdn.net/phaeton/themes/theme-1/detail-icon/image_2021_02_23T18_04_45_790Z.png"
            ></NuxtImg>
            <BSpan class="card-title m-0">Odometer</BSpan>
            <BSpan>{{ inventory.odometer }} {{ inventory.km_miles }}</BSpan>
          </li>
          <li class="mx-2 my-2 card ps-3 pt-1">
            <NuxtImg
              src="https://zopsoftware-asset.b-cdn.net/phaeton/themes/theme-1/detail-icon/image_2021_02_23T18_05_32_062Z.png"
            ></NuxtImg>
            <BSpan class="card-title m-0">Exterior Colour</BSpan>
            <BSpan>{{ inventory.exterior_color }}</BSpan>
          </li>
          <li class="mx-2 my-2 card ps-3 pt-1">
            <NuxtImg
              src="https://zopsoftware-asset.b-cdn.net/phaeton/themes/theme-1/detail-icon/image_2021_02_23T18_05_32_062Z.png"
            ></NuxtImg>
            <BSpan class="card-title m-0">Interior Colour</BSpan>
            <BSpan>{{ inventory.interior_color }}</BSpan>
          </li>
          <li class="mx-2 my-2 card ps-3 pt-1">
            <NuxtImg
              src="https://zopsoftware-asset.b-cdn.net/phaeton/themes/theme-1/detail-icon/image_2021_02_23T18_05_01_607Z.png"
            ></NuxtImg>
            <BSpan class="card-title m-0">Body Style</BSpan>
            <BSpan>{{ inventory.body_type }}</BSpan>
          </li>
          <li class="mx-2 my-2 card ps-3 pt-1">
            <NuxtImg
              src="https://zopsoftware-asset.b-cdn.net/phaeton/themes/theme-1/detail-icon/image_2021_02_23T18_14_54_759Z.png"
            ></NuxtImg>
            <BSpan class="card-title m-0">Transmission</BSpan>
            <BSpan>{{ inventory.transmission }}</BSpan>
          </li>
          <li class="mx-2 my-2 card ps-3 pt-1">
            <NuxtImg
              src="https://zopsoftware-asset.b-cdn.net/phaeton/themes/theme-1/detail-icon/image_2021_02_23T18_15_18_939Z.png"
            ></NuxtImg>
            <BSpan class="card-title m-0">Drive Train</BSpan>
            <BSpan>{{ inventory.drivetrain }}</BSpan>
          </li>
          <li class="mx-2 my-2 card ps-3 pt-1">
            <NuxtImg
              src="https://zopsoftware-asset.b-cdn.net/phaeton/themes/theme-1/detail-icon/image_2021_02_23T18_15_42_825Z.png"
            ></NuxtImg>
            <BSpan class="card-title m-0">Fuel Type</BSpan>
            <BSpan>{{ inventory.fuel_type }}</BSpan>
          </li>
          <li class="mx-2 my-2 card ps-3 pt-1">
            <NuxtImg
              src="https://zopsoftware-asset.b-cdn.net/phaeton/themes/theme-1/detail-icon/image_2021_02_23T18_05_01_607Z.png"
            ></NuxtImg>
            <BSpan class="card-title m-0">Doors</BSpan>
            <BSpan>{{ inventory.door }}</BSpan>
          </li>
        </ul>

        <div class="vehicle-description-block my-4 overflow-hidden">
          <h4 class="vehicle-d-title">Vehicle Description</h4>
          <div v-html="inventory.vehicle_description"></div>
        </div>

        <!-- Specifications : START -->
        <div class="vehile-note my-4">
          <CommonAccordion :class="`accordion-flush border`">
            <VDPStandardFeature :inventory="inventory"></VDPStandardFeature>

            <VDPTechnicalFeatureV2
              :inventory="inventory"
            ></VDPTechnicalFeatureV2>

            <VDPVehicleOption :inventory="inventory"></VDPVehicleOption>

            <VDPCustomFeature :inventory="inventory"></VDPCustomFeature>
          </CommonAccordion>
        </div>
        <!-- Specifications : END -->
      </div>

      <!-- Right Sidebar -->
      <div class="col-lg-4 d-none d-md-block d-lg-block dxl-block">
        <div class="sidebar">
          <!-- Header -->

          <!-- Price -->
          <div class="pt-2" v-if="hidePrice || sellingPrice === 0">
            <a href="tel:" class="btn btn-primary w-100 mb-2 btn-text-left"
              >CALL FOR PRICE</a
            >
          </div>
          <div class="pt-2" v-else-if="hasSpecialPrice && specialPrice > 0">
            <p class="sale-d-price-sub">Price</p>
            <h2 class="fw-bold sale-d-price h6">
              <del>
                {{
                  formatNumber(vehiclePrice, {
                    style: "currency",
                    currency: "USD",
                  })
                }}
              </del>
            </h2>
            <h2 class="fw-bold sale-d-price">
              {{
                formatNumber(specialPrice, {
                  style: "currency",
                  currency: "USD",
                })
              }}
            </h2>
          </div>
          <div class="pt-2" v-else>
            <p class="sale-d-price-sub">Price</p>
            <h2 class="fw-bold sale-d-price fs-4">
              {{
                formatNumber(vehiclePrice, {
                  style: "currency",
                  currency: "USD",
                })
              }}
            </h2>
            <small>+ Taxes and Licensing Fee</small>
          </div>
          <!-- Estimated Payment -->
          <div
            class="border p-3 rounded mb-3 estimate-payment"
            v-if="hasFinancing && !hidePrice"
          >
            <span class="badge bg-dark mb-2">ESTIMATED PAYMENT</span>
            <div class="align-items-center">
              <h4 class="mb-0">
                {{
                  formatNumber(inventory.emi_amount, {
                    style: "currency",
                    currency: "USD",
                  })
                }}
                / {{ inventory.payment_frequency }}
              </h4>
              <a href="#" class="text-decoration-none"
                ><i class="bi bi-pencil"></i
              ></a>
            </div>
            <small class="d-block"
              >{{
                formatNumber(downPayment, {
                  style: "currency",
                  currency: "USD",
                })
              }}
              downpayment, {{ inventory.interest_rate }}% APR for
              {{ inventory.term }} Months.</small
            >
            <b-a
              toggle="modal"
              target="#financeCalculatorModal"
              class="text-primary text-decoration-none"
              style="cursor: pointer"
            >
              Personalize your payment →
            </b-a>
          </div>

          <!-- Action Buttons -->
          <NuxtLink
            :to="`/finance?inventory_id=${inventory.inventory_id}`"
            class="btn btn-primary w-100 mb-2 btn-text-left"
          >
            Get Prequalified Instantly<br /><small
              >No Impact To Your Credit</small
            >
          </NuxtLink>
          <NuxtLink
            :to="`/book-a-test-drive?inventory_id=${inventory.inventory_id}`"
            class="btn btn-outline-primary w-100 mb-3 btn-text-left"
          >
            Schedule a Test Drive
          </NuxtLink>

          <b-a
            toggle="modal"
            target="#requestInformationModal"
            class="btn btn-primary w-100 mb-3 btn-text-left"
          >
            Request Information
          </b-a>

          <!-- Trade-in Section -->
          <NuxtLink
            :to="`/trade-in-appraisal`"
            class="text-center bg-primary rounded text-white p-3 mt-4 d-flex align-items-center value-tride"
            data-driveo-form-open="true"
          >
            <img
              alt="Get your trade-in value"
              loading="lazy"
              decoding="async"
              data-nimg="1"
              src="https://zopsoftware-asset.b-cdn.net/phaeton/themes/theme-1/images/detail-icon/car-tool-keys.png"
            />
            <div class="px-3 mb-0 ms-1 text-start">
              <div class="h4 mb-0 vdp--trade-value">What's your car worth?</div>
              Get your trade-in value
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
    <VueEasyLightbox
      :visible="visibleRef"
      :imgs="vehicle_images"
      :index="indexRef"
      @hide="onHideGalleryImage"
    />
    <VDPPaymentCalculator
      :vehicle_price="sellingPrice"
      :downpayment="downPayment"
      :duration="duration"
      :interest_rate="interestRate"
      :inventory_id="`${inventory.inventory_id}`"
    ></VDPPaymentCalculator>

    <VDPRequestInformation
      :year="`${inventory.year}`"
      :make="`${inventory.make}`"
      :model="`${inventory.model}`"
      :inventory_id="`${inventory.inventory_id}`"
    ></VDPRequestInformation>
  </div>
</template>
