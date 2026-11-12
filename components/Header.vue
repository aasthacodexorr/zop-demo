<script setup>
const { $swal } = useNuxtApp();
const appConfig = useAppConfig();
const dealershipConfig = appConfig.dealership;
const zDSiteConfig = appConfig.site;

const waitLimit = (ms) => {
  let start = new Date().getTime();
  let end = start;
  while (end < start + ms) {
    end = new Date().getTime();
  }
};

const sAltert = $swal.mixin({
  showConfirmButton: false,
  timerProgressBar: true,
  confirmButtonText: "",
  title: "Sending your message...",
  didOpen: () => {
    sAltert.showLoading();
  },
});

onMounted(() => {
  window.addEventListener("message", function (event) {
    if (event.origin !== zDSiteConfig.saas_api) return;

    switch (event.data) {
      case "alertFire":
        sAltert.fire();
        console.log("alertFire");
        break;
      case "alertSuccessUpdate":
        console.log("alertSuccessUpdate");
        sAltert.update({
          title: "Thank You! \n Your message has been sent.",
          icon: "success",
        });
        break;
      case "redirectToThankYouPage":
        console.log("redirectToThankYouPage");
        navigateTo("/thank-you");
        break;
      case "alertErrorUpdate":
        console.log("alertErrorUpdate");
        sAltert.update({
          title: "There were errors in submitting the form.",
          icon: "error",
        });
        break;
      case "alertClose":
        console.log("alertClose");
        waitLimit(1500);
        sAltert.close();
        break;
      case "singleCreditApplicationHeight":
        console.log("singleCreditApplicationHeight");
        break;
      default:
        break;
    }

    if (event.data.hasOwnProperty("type")) {
      if (event.data.type == "css") {
        let currentForm = document.getElementById(`${event.data.element_id}`);
        if (currentForm !== null) {
          currentForm.style.minHeight = `${parseInt(event.data.value) + 150}px`;
        }
      }
    }
  });
});
</script>

<template>
  <header>
    <!-- Navbar -->
    <div class="py-2 bg-preheader border-bottom">
      <div class="container d-flex flex-wrap">
        <ul class="nav me-auto">
          <li class="nav-item">
            <a
              :href="dealershipConfig.address_1_bar"
              target="_blank"
              class="nav-link text-light mobile-icon px-2"
              ><Icon
                name="bxs:map"
                class="fs-5 align-middle me-2"
              />
              <span class="d-none d-sm-inline-block">
                {{ dealershipConfig.full_address_1 }},
                {{ dealershipConfig.city_1 }},
                {{ dealershipConfig.province_1 }},
                {{ dealershipConfig.postal_code_1 }},
                {{ dealershipConfig.country_1 }}</span
              ></a
            >
          </li>
          <li class="nav-item">
            <a
              :href="`tel:${dealershipConfig.sales_number_1}`"
              class="nav-link text-light mobile-icon px-2"
              ><Icon
                name="bxs:phone"
                class="fs-5 align-middle me-2"
              />
              <span class="d-none d-sm-inline-block">{{
                dealershipConfig.sales_number_1
              }}</span></a
            >
          </li>
        </ul>
        <ul class="nav">
          <WidgetUniversalSearchVDP></WidgetUniversalSearchVDP>
        </ul>
      </div>
    </div>
    <Navbar expand="lg" class="navbar navbar-dark bg-white">
      <div class="container">
        <NuxtLink
          :to="'/'"
          class="d-flex align-items-center mb-md-0 me-md-auto text-dark text-decoration-none"
        >
          <img
            :src="dealershipConfig.dealership_logo"
            class="main-logo"
          />
        </NuxtLink>
        <NavbarToggler />
        <NavbarCollapse>
          <NavbarNavList margin="s-auto b-2 b-lg-0">
            <NavItem>
              <NavLink to="/inventory"> Inventory </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/finance"> Apply Online </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/trade-in-appraisal"> Trade-In Appraisal </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/book-an-appointment"> Service </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/contact-us"> Contact </NavLink>
            </NavItem>
          </NavbarNavList>
        </NavbarCollapse>
      </div>
    </Navbar>
  </header>
</template>