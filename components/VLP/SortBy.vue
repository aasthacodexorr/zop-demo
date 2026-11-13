<script setup>
const props = defineProps({
  collection: { type: String, required: true },
});
</script>
<template>
  <ais-sort-by
    :class-names="{
      'ais-SortBy-select': 'form-select rounded shadow-sm',
      'ais-SortBy': 'ms-2 d-inline-block',
    }"
    :items="[
      {
        value: `${collection}/sort/status_rank:asc,created_at:desc`,
        label: 'Recently Added',
      },
      {
        value: `${collection}/sort/status_rank:asc,selling_price:asc`,
        label: 'Price (Low to High)',
      },
      {
        value: `${collection}/sort/status_rank:asc,selling_price:desc`,
        label: 'Price (High to Low)',
      },
      {
        value: `${collection}/sort/status_rank:asc,odometer:asc`,
        label: 'Odometer (Low to High)',
      },
      {
        value: `${collection}/sort/status_rank:asc,odometer:desc`,
        label: 'Odometer (High to Low)',
      },
      {
        value: `${collection}/sort/status_rank:asc,make_rank:asc`,
        label: 'Make (A - Z)',
      },
      {
        value: `${collection}/sort/status_rank:asc,make_rank:desc`,
        label: 'Make (Z - A)',
      },
      {
        value: `${collection}/sort/status_rank:asc,model_rank:asc`,
        label: 'Model (A - Z)',
      },
      {
        value: `${collection}/sort/status_rank:asc,model_rank:desc`,
        label: 'Model (Z - A)',
      },
      {
        value: `${collection}/sort/status_rank:asc,year:asc`,
        label: 'Year (Low to High)',
      },
      {
        value: `${collection}/sort/status_rank:asc,year:desc`,
        label: 'Year (High to Low)',
      },
      {
        value: `${collection}/sort/status_rank:asc,image_count:asc`,
        label: 'Image Count (Low to High)',
      },
      {
        value: `${collection}/sort/status_rank:asc,image_count:desc`,
        label: 'Image Count (High to Low)',
      },
    ]"
  />
</template>