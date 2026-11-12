// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "usebootstrap",
    "nuxt-easy-lightbox",
    "vue3-carousel-nuxt",
    "@nuxtjs/sitemap",
    "@nuxtjs/robots",
    "nuxt-seo-utils",
    "nuxt-og-image",
  ],
  sitemap: {
    enabled: true,
    debug: false,
    sitemapsPathPrefix: "/",
    autoLastmod: true,
    sitemaps: {
      pages: {
        includeGlobalSources: true,
        includeAppSources: true,
        // ...
      },
      index: [{ sitemap: `/api/website/sitemap` }],
    },
  },
  css: [
    "usebootstrap/scss/usebootstrap",
    "vue-select/dist/vue-select.css",
    "vue3-carousel/dist/carousel.css",
  ],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
          @import "@/assets/scss/_navbar.scss";
           @import "@/assets/scss/_variables.scss";
           @import "@/assets/scss/_custom.scss";
           `,
        },
      },
    },
  },
  compatibilityDate: "2024-10-07",
});
