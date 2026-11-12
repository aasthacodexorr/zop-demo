<script setup>
const appConfig = useAppConfig();
const dealershipConfig = appConfig.dealership;
const props = defineProps({
  containerClass: { type: String, required: false, default: "" },
  iconClass: { type: String, required: false, default: "" },
});
</script>
<template>
  <div :class="containerClass">
    <BA
      style="cursor: pointer"
      target="_blank"
      v-if="dealershipConfig.social_media_facebook"
      :href="dealershipConfig.social_media_facebook"
    >
      <Icon name="bx:bxl-facebook" :class="iconClass" />
    </BA>
    <BA
      style="cursor: pointer"
      target="_blank"
      v-if="dealershipConfig.social_media_tiktok"
      :href="dealershipConfig.social_media_tiktok"
    >
      <Icon name="bx:bxl-tiktok" :class="iconClass" />
    </BA>
    <BA
      style="cursor: pointer"
      target="_blank"
      v-if="dealershipConfig.social_media_instagram"
      :href="dealershipConfig.social_media_instagram"
    >
      <Icon name="bx:bxl-instagram" :class="iconClass" />
    </BA>
    <BA
      style="cursor: pointer"
      target="_blank"
      v-if="dealershipConfig.social_media_twitter"
      :href="dealershipConfig.social_media_twitter"
    >
      <Icon name="bx:bxl-twitter" :class="iconClass" />
    </BA>
    <BA
      style="cursor: pointer"
      target="_blank"
      v-if="dealershipConfig.social_media_youtube"
      :href="dealershipConfig.social_media_youtube"
    >
      <Icon name="bx:bxl-youtube" :class="iconClass" />
    </BA>
    <BA
      style="cursor: pointer"
      target="_blank"
      v-if="dealershipConfig.social_media_google_review"
      :href="dealershipConfig.social_media_google_review"
    >
      <Icon name="bx:bxl-google" :class="iconClass" />
    </BA>
  </div>
</template>