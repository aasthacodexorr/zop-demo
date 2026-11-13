<script setup>
const appConfig = useAppConfig();
const dealershipConfig = appConfig.dealership;
const zDSiteConfig = appConfig.site;

useSeoMeta({
  title: zDSiteConfig.home_page_title,
  description: zDSiteConfig.home_page_description,
  twitterCard: "summary_large_image",
  ogLocale: "en_US",
});
</script>
<template>
  <main class="container-fluid g-0">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="container">
        <h1>Quality Used Cars, Affordable Prices</h1>
        <p>Explore our wide selection of vehicles for every budget.</p>
        <div class="serch-filter">
          <WidgetUniversalSearchVLP></WidgetUniversalSearchVLP>
        </div>
      </div>
    </section>

    <BrowseByStyle></BrowseByStyle>

    <section class="box-divider"></section>

    <section class="ptb-4">
      <div class="container">
        <div class="about-content">
          <h2 class="title-box text-center">
            Experience the best in used car sales at
            {{ dealershipConfig.city_1 }}'s premier dealership
          </h2>
          <h3 class="subtitle">
            Experience the excellence of {{ dealershipConfig.dealership_name }},
            the leading used car dealership in
            {{ dealershipConfig.city_1 }}. We have
            <a class="bs-red"
              >two branches in {{ dealershipConfig.province_1 }}</a
            >
            with vast range of inventory. No matter if you need a
            <a class="bs-red"
              >used car, truck, SUV, van, convertible, or luxury model</a
            >, {{ dealershipConfig.dealership_name }} guarantees the ideal
            choice at a price that fits your budget.
          </h3>
          <div class="paragraph-text">
            <p>
              At {{ dealershipConfig.dealership_name }}, we are committed to
              providing our customers with an extraordinary experience that
              truly sets us apart from others in the market. We are proud to be
              the only dealership in the area where you can complete your
              vehicle purchase in just 60 minutes or less. We recognize the
              value of your time and strive to make the car-buying process not
              only quick but also enjoyable and hassle-free.
            </p>
            <p>
              We are committed to helping you drive away in the vehicle you've
              always wanted, all while ensuring the price and payment fit your
              budget perfectly. If you've faced challenges with financing
              before, we specialize in turning those setbacks into success
              stories, getting you approved for the car, truck, or SUV of your
              choice. Our financing process is second to none, and you can
              kickstart your journey without affecting your credit score by
              filling out our simple approval form today.
            </p>
            <p>
              With so many reliable vehicles to choose from,
              {{ dealershipConfig.dealership_name }} is the right choice for
              anyone in the market for a used car.
              <a class="bs-red">Start shopping for your dream car today!</a>
            </p>
          </div>
        </div>
        <div class="border-top mt-4 pt-4"></div>
        <div class="row">
          <div class="col col-12 col-md-4">
            <div class="text-center">
              <div class="three-box-icon pt-4">
                <img
                  src="https://zopsoftware-asset.b-cdn.net/phaeton/themes/theme-1/images/icon/dead.png"
                />
              </div>
              <p class="three-box-title"><strong>Fast</strong></p>
              <p>Know your options instantly</p>
            </div>
          </div>
          <div class="col col-12 col-md-4 pt-4">
            <div class="text-center">
              <div class="three-box-icon">
                <img
                  src="https://zopsoftware-asset.b-cdn.net/phaeton/themes/theme-1/images/icon/sec.png"
                />
              </div>
              <p class="three-box-title"><strong>Safe</strong></p>
              <p>Transparent buying process</p>
            </div>
          </div>
          <div class="col col-12 col-md-4 pt-4">
            <div class="text-center">
              <div class="three-box-icon">
                <img
                  src="https://zopsoftware-asset.b-cdn.net/phaeton/themes/theme-1/images/icon/easy.png"
                />
              </div>
              <p class="three-box-title"><strong>Easy</strong></p>
              <p>No minimum credit score</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <WidgetFeaturedVehicles></WidgetFeaturedVehicles>

    <BrowseByMake></BrowseByMake>

    <section class="bg-gray ptb-4">
      <div class="container">
        <div class="row map-box">
          <div class="col col-12 col-sm-6 col-md-6">
            <div class="site-location">
              <div class="text-center">
                <div class="three-box-icon">
                  <Icon name="bx:map" class="fs-3 fw-bolder text-primary" />
                </div>
                <p class="three-box-title">
                  <strong>{{ dealershipConfig.dealership_name }}</strong>
                </p>
                <div class="border-top mt-2 pb-2"></div>
                <div class="mt-2">
                  <p>
                    <strong class="d-block">Address:</strong
                    >{{ dealershipConfig.full_address_1 }},
                    {{ dealershipConfig.city_1 }},<br />
                    {{ dealershipConfig.province_1 }}
                    {{ dealershipConfig.postal_code_1 }},
                    {{ dealershipConfig.country_1 }}
                  </p>
                  <p>
                    <strong class="d-block">Phone:</strong>
                    <a :href="`tel:${dealershipConfig.sales_number_1}`">{{
                      dealershipConfig.sales_number_1
                    }}</a>
                  </p>
                </div>
              </div>
              <div class="time-table">
                <ul class="time-table-list text-center">
                  <li><strong> Hours of Operation</strong></li>
                  <li><strong> Sales</strong></li>
                  <template
                    :key="`operation_${index}`"
                    v-for="(operation, index) in dealershipConfig.working_hours"
                  >
                    <li v-html="operation.day"></li>
                    <li v-html="operation.hours"></li>
                  </template>
                </ul>
              </div>
            </div>
          </div>
          <div class="col col-12 col-sm-6 col-md-6">
            <div class="map-location">
              <iframe
                :src="dealershipConfig.address_map_url_1"
                width="100%"
                height="630"
                style="border: 0"
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>