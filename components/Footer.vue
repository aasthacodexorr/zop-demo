<script setup>
const appConfig = useAppConfig();
const dealershipConfig = appConfig.dealership;
const d = new Date();
let year = d.getFullYear();
</script>
<template>
  <!-- Footer -->
  <footer class="footer bg-dark">
    <div class="container">
      <div class="row align-items-center">
        <div class="col col-8 col-lg-6">
          <p class="three-box-title u-pb-1">
            <strong class="text-white">{{
              dealershipConfig.dealership_name
            }}</strong>
          </p>
        </div>
        <div class="col col-4 col-lg-6">
          <p class="social-link-box">
            <WidgetSocialMedia></WidgetSocialMedia>
          </p>
        </div>
      </div>
    </div>
    <div class="text-white bg-black u-pt-2 u-pb-2">
      <div class="container">
        <div class="row">
          <div class="mb-4 mb-sm-0 col-sm-4">
            <div class="h5 text-white border-bottom d-inline-block pb-3">
              Location
            </div>
            <div>
              <div class="row">
                <div class="col-lg-6 col-12">
                  <div class="vcard mb-3">
                    <a
                      class="adr text-white"
                      target="_blank"
                      title=""
                      :href="`tel:${dealershipConfig.sales_number_1}`"
                      ><b class="notranslate">{{
                        dealershipConfig.dealership_name
                      }}</b
                      ><br /><span class="street-address">{{
                        dealershipConfig.full_address_1
                      }}</span
                      ><br /><span class="locality">{{
                        dealershipConfig.city_1
                      }}</span
                      >,
                      <span class="region">{{
                        dealershipConfig.province_1
                      }}</span
                      ><br />
                      <span class="postal-code">{{
                        dealershipConfig.postal_code_1
                      }}</span
                      ><br
                    /></a>
                    <span
                      role="button"
                      class="tel text-white d-block mt-2 mb-4"
                    >
                      <span class="d-inline-block text-white"> </span>
                      {{ dealershipConfig.sales_number_1 }}
                    </span>
                  </div>
                </div>
                <div
                  class="col-lg-6 col-12"
                  v-if="dealershipConfig.show_address_2"
                >
                  <div class="vcard mb-3">
                    <a class="adr text-white" target="_blank" title="" href="#"
                      ><b class="notranslate"
                        >{{ dealershipConfig.dealership_name }} -
                        {{ dealershipConfig.city_2 }}</b
                      ><br /><span class="street-address">{{
                        dealershipConfig.full_address_2
                      }}</span
                      ><br /><span class="locality">{{
                        dealershipConfig.city_2
                      }}</span
                      >,
                      <span class="region">{{
                        dealershipConfig.province_2
                      }}</span>
                      <br />
                      <span class="postal-code">{{
                        dealershipConfig.postal_code_2
                      }}</span
                      ><br
                    /></a>
                    <span
                      role="button"
                      class="tel text-white d-block mt-2 mb-4"
                    >
                      <span class="d-inline-block text-white"> </span>
                    </span>
                  </div>
                </div>

                <div
                  class="col-lg-6 col-12"
                  v-if="dealershipConfig.show_address_3"
                >
                  <div class="vcard mb-3">
                    <a class="adr text-white" target="_blank" title="" href="#"
                      ><b class="notranslate"
                        >{{ dealershipConfig.dealership_name }} -
                        {{ dealershipConfig.city_3 }}</b
                      ><br /><span class="street-address">{{
                        dealershipConfig.full_address_3
                      }}</span
                      ><br /><span class="locality">{{
                        dealershipConfig.city_3
                      }}</span
                      >,
                      <span class="region">{{
                        dealershipConfig.province_3
                      }}</span>
                      <br />
                      <span class="postal-code">{{
                        dealershipConfig.postal_code_3
                      }}</span
                      ><br
                    /></a>
                    <span
                      role="button"
                      class="tel text-white d-block mt-2 mb-4"
                    >
                      <span class="d-inline-block text-white"> </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="mb-4 mb-sm-0 col-sm-4">
            <div class="h5 text-white border-bottom d-inline-block pb-3">
              Quick Links
            </div>
            <nav class="row">
              <div class="col-lg-6 col-12">
                <a
                  target="_self"
                  class="text-white d-block py-3 py-sm-1"
                  href="/inventory"
                  >View inventory</a
                >
              </div>
              <div class="col-lg-6 col-12">
                <NuxtLink
                  target="_self"
                  class="text-white d-block py-3 py-sm-1"
                  :to="`/contact-us`"
                  >Contact us</NuxtLink
                >
              </div>
              <div class="col-lg-6 col-12">
                <NuxtLink
                  target="_self"
                  class="text-white d-block py-3 py-sm-1"
                  :to="`/payment-calculator`"
                  >Payment calculator</NuxtLink
                >
              </div>
              <div class="col-lg-6 col-12">
                <NuxtLink
                  target="_self"
                  class="text-white d-block py-3 py-sm-1"
                  :to="`/privacy-policy`"
                  >Privacy policy</NuxtLink
                >
              </div>
              <div class="col-lg-6 col-12">
                <NuxtLink
                  target="_self"
                  class="text-white d-block py-3 py-sm-1"
                  :to="`/terms-conditions`"
                  >Terms of service</NuxtLink
                >
              </div>
            </nav>
          </div>
          <div class="mb-4 mb-sm-0 col-sm-4 col-12 d-none">
            <div class="h5 text-white border-bottom d-inline-block pb-3">
              Stay Updated
            </div>
            <p>Get special offers directly to your inbox.</p>
            <div class="rounded p-4 bg-secondary-light">
              <div class="mb-0 row">
                <div class="col-sm-6">
                  <div>
                    <label class="d-none form-label">First name</label
                    ><input
                      placeholder="First"
                      name="firstname"
                      type="text"
                      class="form-control-inverted mb-4 form-control"
                      value=""
                    />
                  </div>
                </div>
                <div class="col-sm-6">
                  <div>
                    <label class="d-none form-label">Last name</label
                    ><input
                      placeholder="Last"
                      name="lastname"
                      type="text"
                      class="form-control-inverted mb-4 form-control"
                      value=""
                    />
                  </div>
                </div>
              </div>
              <div class="mb-3 mb-md-4">
                <input
                  data-cy="formcontrol-email"
                  name="email"
                  placeholder="you@email.com"
                  aria-label="Your email"
                  autocomplete="email"
                  type="email"
                  id="email"
                  class="form-control form-control-inverted form-control"
                  value=""
                />
              </div>
              <button type="button" class="w-100 btn btn-primary">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container text-center">
      <p class="pt-4">
        &copy; {{ year }} {{ dealershipConfig.dealership_name }} - All rights
        reserved.
      </p>
    </div>
  </footer>
</template>