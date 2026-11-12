<template>
  <Row style="position: relative">
    <LazyNuxtImg
      v-show="currentIndex === index"
      :key="`${uid}-MG-${index}`"
      :placeholder="placeholder"
      v-for="(image, index) in images"
      :src="image"
    />
    <BSpan
      class="d-inline-block bg-black p-1"
      :opacity="75"
      v-if="currentIndex > 0"
      style="
        width: auto;
        position: absolute;
        top: 45%;
        left: 0;
        cursor: pointer;
      "
      @click="decrementIndex"
    >
      <Icon name="bx:bxs-chevron-left" class="fs-2 fw-bolder py-4 text-white" />
    </BSpan>
    <BSpan
      class="d-inline-block bg-black p-1"
      :opacity="75"
      v-if="currentIndex < images.length - 1"
      @click="incrementIndex"
      style="
        width: auto;
        position: absolute;
        top: 45%;
        right: 0;
        cursor: pointer;
      "
    >
      <Icon
        name="bx:bxs-chevron-right"
        class="fs-2 fw-bolder py-4 text-white"
      />
    </BSpan>
  </Row>
</template>
<script setup>
const props = defineProps({
  images: { type: Array, required: true },
  placeholder: { type: String, required: false },
  uid: {
    type: String,
    required: false,
    default: "",
  },
});

const currentIndex = ref(0);

const decrementIndex = () => {
  if (currentIndex.value > 0) {
    --currentIndex.value;
  }
};

const incrementIndex = () => {
  if (currentIndex.value < props.images.length - 1) {
    ++currentIndex.value;
  }
};
</script>