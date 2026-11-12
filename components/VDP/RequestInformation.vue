<script setup>
const appConfig = useAppConfig();
const dealershipConfig = appConfig.dealership;
const zDSiteConfig = appConfig.site;

const props = defineProps({
  year: { type: String, required: false, default: "" },
  make: { type: String, required: false, default: "" },
  model: { type: String, required: false, default: "" },
  inventory_id: { type: String, required: false, default: "" },
});
</script>
<template>
  <!-- Modal : START  -->
  <Modal id="requestInformationModal">
    <ModalDialog>
      <ModalContent>
        <ModalHeader>
          <ModalTitle class="w-100">Request Information </ModalTitle>
          <CloseButton dismiss="modal" />
        </ModalHeader>
        <ModalBody class="p-0 request-form">
          <h6 class="text-center my-3">{{ year }} {{ make }} {{ model }}</h6>
          <iframe
            :src="`${zDSiteConfig.saas_api}/api/templates/render/7?inventory_id=${inventory_id}`"
            class="w-100"
            style="height: 580px"
            frameborder="0"
          ></iframe>
        </ModalBody>
        <ModalFooter class="justify-content-center bg-primary text-white py-3 h5 m-0">
          Speak with a Personal Internet Manager {{ dealershipConfig.sales_number_1 }}
        </ModalFooter>
      </ModalContent>
    </ModalDialog>
  </Modal>
  <!-- Modal : END  -->
</template>