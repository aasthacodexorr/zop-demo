<script setup>
const appConfig = useAppConfig();
const zDSiteConfig = appConfig.site;

useSeoMeta({
  title: zDSiteConfig.book_an_appointment_page_title,
  description: zDSiteConfig.book_an_appointment_page_description,
});
</script>
<template>
  <div class="container my-4">
    <div class="row">
      <h1>Book A Service Appointment</h1>
      <p>
        Please complete the form below and one of our representatives will
        contact you as soon as possible to confirm the availability of your
        appointment date and time.
      </p>
    </div>
    <iframe
      :src="`${zDSiteConfig.saas_api}/api/templates/render/3`"
      id="service_appointment"
      class="w-100"
      height="1400px"
      frameborder="0"
    ></iframe>
  </div>
</template>