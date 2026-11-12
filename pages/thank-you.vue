<script setup>
const appConfig = useAppConfig();
const zDSiteConfig = appConfig.site;

useSeoMeta({
  title: zDSiteConfig.thank_you_page_title,
  description: zDSiteConfig.thank_you_page_description,
});
</script>
<template>
  <div class="container my-4">
    <div class="thank-you-block text-center">
      <h1>Thank you for submitting your form!</h1>
      <p>We respond within 2 Business Hours.</p>
      <p>
        <NavLink
          :class="`rounded-0 fs-5 d-inline-block btn btn-primary`"
          to="/"
        >
          GO BACK TO HOME PAGE
        </NavLink>
      </p>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.thank-you-block {
  height: 50vh;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>