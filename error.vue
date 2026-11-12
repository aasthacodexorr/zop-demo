<script setup>
const error = useError();

useHead({
  title: "Error",
});

const handleError = () => {
  clearError({ redirect: "/" });
};
</script>
<template>
  <NuxtLayout>
    <div class="container my-4" style="height: 50vh">
      <div class="zd-error-component">
        <h1>{{ error.statusCode }}</h1>
        <p>{{ error.message }}</p>
        <p>
          <button
            :class="`rounded-0 fs-5 d-inline-block btn btn-primary`"
            @click="handleError"
          >
            GO BACK TO HOME PAGE
          </button>
        </p>
      </div>
    </div>
  </NuxtLayout>
</template>
<style scoped>
.zd-error-component {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>