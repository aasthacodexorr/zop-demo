<script setup>
const appConfig = useAppConfig();
const dealershipConfig = appConfig.dealership;
const zDSiteConfig = appConfig.site;

const props = defineProps({
  item: { type: Object, required: true },
});
</script>
<template>
  <div>
    <div class="feature-slde">
      <div class="feature-image">
        <CommonMiniGallery
          :images="
            getImageUrls(
              zDSiteConfig.cdn_api,
              dealershipConfig.default_placeholder_image,
              item.image_urls,
              item.image_with_overlay_urls
            )
          "
          :uid="item.stock_no"
          :placeholder="dealershipConfig.default_placeholder_image"
        ></CommonMiniGallery>
      </div>
      <div class="feature-title">
        <NuxtLink
          :to="getUrl(item.inventory_id, item.year, item.make, item.model)"
          class="feature-title-link"
        >
          <h3 class="h5" v-html="item.title"></h3>
        </NuxtLink>
      </div>
      <div class="feature-content d-flex align-items-center">
        <div class="col col-6 feature-content-left">
          <p>Engine:</p>
          <p>{{ item.engine }}</p>
          <p>Transmission:</p>
          <p>{{ item.transmission }}</p>
        </div>
        <div class="col col-6 feature-content-right text-end">
          <p><strong>Sale price</strong></p>
          <p
            v-if="
              parseInt(item.selling_price) > 0 &&
              parseInt(item.hide_price) === 0
            "
          >
            <strong>{{
              formatNumber(item.selling_price, {
                style: "currency",
                currency: "USD",
              })
            }}</strong>
          </p>
          <p v-else><strong>CALL FOR PRICE</strong></p>
          <p
            :style="
              parseInt(item.emi_amount) > 0 &&
              parseInt(item.financing_on) !== 0 &&
              parseInt(item.hide_price) === 0
                ? ''
                : 'visibility: hidden;'
            "
          >
            {{
              formatNumber(item.emi_amount, {
                style: "currency",
                currency: "USD",
              })
            }}
            / mo.
          </p>
        </div>
      </div>
      <div class="feature-content-detail">
        <ul>
          <li>
            <strong>{{ item.km_miles }}</strong>
            <span>{{ formatNumber(item.odometer) }}</span>
          </li>
          <li>
            <strong>Exterior</strong>
            <span class="feature-color">{{ item.exterior_color }}</span>
          </li>
          <li>
            <strong>Stock #</strong> <span>{{ item.stock_no }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>