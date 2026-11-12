<template>
  <ais-stats
    :class-names="{
      'ais-Stats': 'd-inline',
    }"
  >
    <template v-slot="{ nbHits }">
      {{ nbHits }}
    </template>
  </ais-stats>
</template>