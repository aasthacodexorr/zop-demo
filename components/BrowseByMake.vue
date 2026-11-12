<script setup>
const makes = [
  "Audi",
  "BMW",
  "Buick",
  "Cadillac",
  "Chevrolet",
  "Chrysler",
  "Dodge",
  "Ford",
  "Genesis",
  "GMC",
  "Honda",
  "Hyundai",
  "INFINITI",
  "Jaguar",
  "Jeep",
  "Kia",
  "Land Rover",
  "Lexus",
  "Lincoln",
  "Mazda",
  "Mercedes-Benz",
  "MINI",
  "Mitsubishi",
  "Nissan",
  "Ram",
  "Subaru",
  "Tesla",
  "Toyota",
  "Volkswagen",
  "Volvo",
];
</script>
<template>
  <!-- Browse Inventory -->
  <section class="ptb-4">
    <div class="container">
      <div class="row d-flex align-items-center">
        <div class="col col-12 col-md-12">
          <h2 class="h2">Browse Inventory</h2>
        </div>
      </div>
      <div class="mt-3 row bt-link">
        <div class="pb-3 col-md-3 col-sm-2 col-6" :key="make" v-for="make in makes">
          <NuxtLink :to="`/inventory?refinementList[make][0]=${make}`" :title="make ">{{ make }}</NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>