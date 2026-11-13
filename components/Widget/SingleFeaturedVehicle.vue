<script setup>
const appConfig = useAppConfig();
const dealershipConfig = appConfig.dealership;
const zDSiteConfig = appConfig.site;

const props = defineProps({
  item: { type: Object, required: true },
});
</script>
<template>
  <div class="h-100 m-2">
    <div class="feature-slde h-100 d-flex flex-column justify-content-between">
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
      <div class="feature-content">
        <div class="card-detail-row">
          <span class="detail-label">Engine:</span>
          <span class="detail-value">{{ item.engine || 'N/A' }}</span>
        </div>
        <div class="card-detail-row">
          <span class="detail-label">Transmission:</span>
          <span class="detail-value">{{ item.transmission || 'N/A' }}</span>
        </div>
        <div class="card-price-row border-top">
          <div class="price-left">
            <span class="detail-label">Sale price:</span>
            <span
              v-if="
                parseInt(item.selling_price) > 0 &&
                parseInt(item.hide_price) === 0
              "
              class="price-number"
            >
              {{
                formatNumber(item.selling_price, {
                  style: "currency",
                  currency: "USD",
                })
              }}
            </span>
            <span v-else class="price-number">CALL FOR PRICE</span>
          </div>
          <div
            v-if="
              parseInt(item.emi_amount) > 0 &&
              parseInt(item.financing_on) !== 0 &&
              parseInt(item.hide_price) === 0
            "
            class="price-emi"
          >
            {{
              formatNumber(item.emi_amount, {
                style: "currency",
                currency: "USD",
              })
            }}
            / mo.
          </div>
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