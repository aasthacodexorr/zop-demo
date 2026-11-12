<script setup>
const appConfig = useAppConfig();
const zDSiteConfig = appConfig.site;

useSeoMeta({
  title: zDSiteConfig.trade_in_appraisal_page_title,
  description: zDSiteConfig.trade_in_appraisal_page_description,
});
</script>
<template>
  <div class="container my-4">
    <div class="row">
      <h1>Trade-In Estimate</h1>
      <p>
        Find out how much your trade-in vehicle is worth. Our trade-in estimate
        tool uses data from industry leading partners, giving you relevant and
        robust vehicle valuations.
      </p>
    </div>
    <iframe
      :src="`${zDSiteConfig.saas_api}/api/templates/render/4`"
      id="trade_in_appraisal"
      class="w-100"
      height="1320px"
      frameborder="0"
    ></iframe>
  </div>
</template>