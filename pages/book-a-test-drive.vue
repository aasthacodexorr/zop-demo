<script setup>
const appConfig = useAppConfig();
const zDSiteConfig = appConfig.site;
const route = useRoute();

useSeoMeta({
  title: zDSiteConfig.book_a_test_drive_page_title,
  description: zDSiteConfig.book_a_test_drive_page_description,
});

const props = defineProps({
  inventory_id: { type: String, required: false, default: "" },
});

let url = `${zDSiteConfig.saas_api}/api/templates/render/6`;

if (route.query.inventory_id) {
  url += `?inventory_id=${route.query.inventory_id}`;
}
</script>
<template>
  <div class="container my-4">
    <div class="row">
      <h1>Book A Test Drive</h1>
    </div>
    <iframe
      :src="url"
      id="book_test_drive"
      class="w-100"
      height="1272px"
      frameborder="0"
    ></iframe>
  </div>
</template>