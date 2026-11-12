<script setup>
const appConfig = useAppConfig();
const zDSiteConfig = appConfig.site;
const route = useRoute();

useSeoMeta({
  title: zDSiteConfig.finance_page_title,
  description: zDSiteConfig.finance_page_description,
});

const props = defineProps({
  inventory_id: { type: String, required: false, default: "" },
});

let url = `${zDSiteConfig.saas_api}/api/templates/render/5`;

if (route.query.inventory_id) {
  url += `?inventory_id=${route.query.inventory_id}`;
}
</script>
<template>
  <div class="container my-4">
    <div class="row">
      <h1>Credit Application</h1>
      <p>
        Please fill out the information below and one of our representatives
        will contact you regarding your credit application request.
      </p>
    </div>
    <iframe
      :src="url"
      id="finance_form"
      class="w-100"
      height="1320px"
      frameborder="0"
    ></iframe>
  </div>
</template>