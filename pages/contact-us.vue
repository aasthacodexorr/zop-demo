<script setup>
const appConfig = useAppConfig();
const zDSiteConfig = appConfig.site;

useSeoMeta({
  title: zDSiteConfig.contact_us_page_title,
  description: zDSiteConfig.contact_us_page_description,
});
</script>
<template>
  <div class="container my-4">
    <div class="row">
      <h1>Contact Us</h1>
    </div>
    <iframe
      :src="`${zDSiteConfig.saas_api}/api/templates/render/2`"
      id="contact_us"
      class="w-100"
      height="570px"
      frameborder="0"
    ></iframe>
  </div>
</template>