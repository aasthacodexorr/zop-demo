import { updateSiteConfig } from "#imports";

export default defineNuxtPlugin({
  enforce: "pre", // make it happen early
  setup() {
    const appConfig = useAppConfig();
    updateSiteConfig({
      name: appConfig.dealership.dealership_name,
    });
  },
});
