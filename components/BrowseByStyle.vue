<template>
  <!-- Filter Section -->
  <section class="body-style pt-4">
    <div class="container">
      <h5 class="py-3 text-center d-none d-md-block font-weight-bold m-0">
        Browse By Style
      </h5>
      <div
        class="row-bordered no-gutters text-small font-weight-semibold cursor-pointer row"
      >
        <div class="text-center border-top border-left p-3 col-md-2 col-4">
          <NuxtLink
            class="d-block body-style-link"
            title="View Inventory: Sedan"
            :to="`/inventory?refinementList[body_type][0]=Sedan&refinementList[body_type][1]=Sedan%204%20Dr.`"
            ><img
              src="https://zopsoftware-asset.b-cdn.net/phaeton/themes/theme-1/images/sedan.webp"
              width="120"
              height="66"
              alt="Used Sedan"
              class="my-1 img-fluid"
            /><br />Cars</NuxtLink
          >
        </div>
        <div class="text-center border-top border-left p-3 col-md-2 col-4">
          <NuxtLink
            class="d-block body-style-link"
            title="View Inventory: SUV"
            :to="`/inventory?refinementList[body_type][0]=Sport%20Utility%20Vehicle&refinementList[body_type][1]=SUV-Crossover&refinementList[body_type][2]=Suv&refinementList[body_type][3]=SUV&refinementList[body_type][4]=Suvs&refinementList[body_type][5]=Sport%20Utility%204-Door`"
            ><img
              src="https://zopsoftware-asset.b-cdn.net/phaeton/themes/theme-1/images/suv.webp"
              width="120"
              height="66"
              alt="Used SUV"
              class="my-1 img-fluid"
            /><br />SUVs</NuxtLink
          >
        </div>
        <div class="text-center border-top border-left p-3 col-md-2 col-4">
          <NuxtLink
            class="d-block body-style-link"
            title="View Inventory: Pickup truck"
            :to="`/inventory?refinementList[body_type][0]=Truck&refinementList[body_type][1]=Pickup%20Truck&refinementList[body_type][2]=Pickup-Truck&refinementList[body_type][3]=pickup-truck&refinementList[body_type][4]=Trucks&refinementList[body_type][5]=Commercial%20Vehicle&refinementList[body_type][6]=Pickup%20Truck%20Truck`"
            ><img
              src="https://zopsoftware-asset.b-cdn.net/phaeton/themes/theme-1/images/truck.webp"
              width="120"
              height="66"
              alt="Used Pickup truck"
              class="my-1 img-fluid"
            /><br />Trucks</NuxtLink
          >
        </div>
        <div class="text-center border-top border-left p-3 col-md-2 col-4">
          <NuxtLink
            class="d-block body-style-link"
            title="View Inventory: Hatchback"
            :to="`/inventory?refinementList[body_type][0]=Hatchback&refinementList[body_type][1]=Hatchback%202%20Dr.`"
            ><img
              src="https://zopsoftware-asset.b-cdn.net/phaeton/themes/theme-1/images/wagon.webp"
              width="120"
              height="66"
              alt="Used Hatchback"
              class="my-1 img-fluid"
            /><br />Hatchback</NuxtLink
          >
        </div>
        <div class="text-center border-top border-left p-3 col-md-2 col-4">
          <NuxtLink
            class="d-block body-style-link"
            title="View Inventory: Vans"
            :to="`/inventory?refinementList[body_type][0]=Minivan&refinementList[body_type][1]=Van&refinementList[body_type][2]=Minivan-Van&refinementList[body_type][3]=minivan`"
            ><img
              src="https://zopsoftware-asset.b-cdn.net/phaeton/themes/theme-1/images/van.webp"
              width="120"
              height="66"
              alt="Used Vans"
              class="my-1 img-fluid"
            /><br />Vans</NuxtLink
          >
        </div>
        <div class="text-center border-top border-left p-3 col-md-2 col-4">
          <NuxtLink
            class="d-block body-style-link"
            title="View Inventory: Cargo vans"
            :to="`/inventory?refinementList[body_type][0]=Minivan&refinementList[body_type][1]=Van&refinementList[body_type][2]=Minivan-Van&refinementList[body_type][3]=minivan`"
            ><img
              src="https://zopsoftware-asset.b-cdn.net/phaeton/themes/theme-1/images/cargovan.webp"
              width="120"
              height="66"
              alt="Used Cargo vans"
              class="my-1 img-fluid"
            /><br />Cargo Vans</NuxtLink
          >
        </div>
      </div>
    </div>
  </section>
</template>