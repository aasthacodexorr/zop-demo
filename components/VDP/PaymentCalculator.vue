<script setup>
import debounce from "lodash.debounce";
const appConfig = useAppConfig();
const zDSiteConfig = appConfig.site;
const CLIENT_DOMAIN = zDSiteConfig.saas_api;

const props = defineProps({
  vehicle_price: { type: Number, required: false, default: 25000 },
  downpayment: { type: Number, required: false, default: 0 },
  duration: { type: Number, required: false, default: 84 },
  interest_rate: { type: Number, required: false, default: 7.99 },
  inventory_id: { type: String, required: false, default: "" },
});

const default_tax_rate = 13;

const universal_calculator = ref({
  vehicle_price: props.vehicle_price,
  additional_fees: 0,
  trade_in_value: 0,
  lien_value: 0,
  downpayment: props.downpayment,
  duration: props.duration,
  tax_1: 0,
  tax_2: 0,
  interest_rate: props.interest_rate,
});

const calculator_response = ref({
  biweekly_amount: 0,
  financing_amount: 0,
  monthly_amount: 0,
  total_repayment_amount: 0,
  weekly_amount: 0,
});

const include_sales_tax = ref(false);
const isCalculating = ref(false);
const adjust_amount = ref(0);

const calculateFinancingInformation = async () => {
  isCalculating.value = true;
  let formData = new FormData();

  if (include_sales_tax.value) {
    universal_calculator.value.tax_1 = default_tax_rate;
  } else {
    universal_calculator.value.tax_1 = 0;
  }

  for (const key in universal_calculator.value) {
    formData.append(key, universal_calculator.value[key]);
  }

  try {
    const data = await $fetch(
      `${CLIENT_DOMAIN}/api/services/calculator/finance`,
      {
        method: "POST",
        body: formData,
      }
    );

    for (const key in data) {
      console.log(data[key]);
      if (calculator_response.value.hasOwnProperty(key)) {
        calculator_response.value[key] = data[key];
      }
    }
  } catch (err) {
    console.log(err.toString());
  }

  isCalculating.value = false;
};

const rollADeal = async () => {
  let formData = new FormData();
  formData.append("payment_frequency", "Bi-Weekly");
  formData.append("interest_rate", universal_calculator.value.interest_rate);
  formData.append("term", universal_calculator.value.duration);
  formData.append("trade_value", 0);
  formData.append("purchase_tax_percentage", universal_calculator.value.tax_1);
  formData.append(
    "purchase_tax_percentage_secondary",
    universal_calculator.value.tax_2
  );
  formData.append("emi_amount", calculator_response.value.biweekly_amount);
  formData.append("adjust_amount", adjust_amount.value);
  formData.append("purchase_price", universal_calculator.value.vehicle_price);
  formData.append("finance_amount", calculator_response.value.financing_amount);
  formData.append("adjust_column", "purchase_price");
  formData.append("request_column", "emi_amount");
  formData.append("deal_type", "Financed");

  try {
    const data = await $fetch(`${CLIENT_DOMAIN}/api/services/roll-a-deal`, {
      method: "POST",
      body: formData,
    });

    if (data.hasOwnProperty("request_amount")) {
      universal_calculator.value.vehicle_price = parseInt(
        data.request_amount,
        10
      );
      calculateFinancingInformation();
      adjust_amount.value = 0;
    }
  } catch (err) {
    console.log(err.toString());
  }
};

calculateFinancingInformation();

watch(
  universal_calculator.value,
  debounce(() => {
    calculateFinancingInformation();
  }, 500)
);

watch(
  include_sales_tax,
  debounce(() => {
    calculateFinancingInformation();
  }, 500)
);
</script>
<template>
  <!-- Modal : START  -->
  <Modal id="financeCalculatorModal">
    <ModalDialog class="modal-xl">
      <ModalContent>
        <ModalBody class="p-0">
          <div class="container zd-standalone-calculator m-0 p-0">
            <div class="form-bg-box">
              <div class="row g-0">
                <div class="col-md-8">
                  <form>
                    <h4>Payment Calculator</h4>
                    <CloseButton
                      dismiss="modal"
                      style="position: absolute; right: 2em; top: 2em"
                    />
                    <!-- Vehicle Price and Down Payment -->
                    <div class="mb-3 row">
                      <div class="col-md-6">
                        <label for="vehiclePrice" class="form-label"
                          >Vehicle Price</label
                        >
                        <input
                          type="number"
                          class="form-control"
                          id="vehiclePrice"
                          v-model="universal_calculator.vehicle_price"
                          placeholder="$ 0.00"
                        />
                      </div>
                      <div class="col-md-6">
                        <label for="downPayment" class="form-label"
                          >Down Payment</label
                        >
                        <input
                          type="number"
                          class="form-control"
                          id="downPayment"
                          v-model="universal_calculator.downpayment"
                          placeholder="$ 0.00"
                        />
                      </div>
                    </div>

                    <!-- Term Selection -->
                    <div class="mb-3">
                      <label class="form-label">Term (Months)</label>
                      <div
                        class="btn-group"
                        role="group"
                        aria-label="Term Selection"
                      >
                        <ul class="form-list-desgine finace-box">
                          <li>
                            <div class="head-felid">
                              <input
                                type="radio"
                                class="seclect-ratio-btn valid"
                                id="loan_term_12"
                                name="loan_term"
                                :value="12"
                                v-model="universal_calculator.duration"
                              /><label> 12</label>
                            </div>
                          </li>
                          <li>
                            <div class="head-felid">
                              <input
                                type="radio"
                                class="seclect-ratio-btn valid"
                                id="loan_term_24"
                                name="loan_term"
                                :value="24"
                                v-model="universal_calculator.duration"
                              /><label>24</label>
                            </div>
                          </li>
                          <li>
                            <div class="head-felid">
                              <input
                                type="radio"
                                class="seclect-ratio-btn valid"
                                id="loan_term_36"
                                name="loan_term"
                                :value="36"
                                v-model="universal_calculator.duration"
                              /><label> 36</label>
                            </div>
                          </li>
                          <li>
                            <div class="head-felid">
                              <input
                                type="radio"
                                class="seclect-ratio-btn valid"
                                id="loan_term_48"
                                name="loan_term"
                                :value="48"
                                v-model="universal_calculator.duration"
                              /><label>48 </label>
                            </div>
                          </li>
                          <li>
                            <div class="head-felid">
                              <input
                                type="radio"
                                class="seclect-ratio-btn valid"
                                id="loan_term_60"
                                name="loan_term"
                                :value="60"
                                v-model="universal_calculator.duration"
                              /><label>60</label>
                            </div>
                          </li>
                          <li>
                            <div class="head-felid">
                              <input
                                type="radio"
                                class="seclect-ratio-btn valid"
                                id="loan_term_72"
                                name="loan_term"
                                :value="72"
                                v-model="universal_calculator.duration"
                              /><label>72</label>
                            </div>
                          </li>
                          <li>
                            <div class="head-felid">
                              <input
                                type="radio"
                                class="seclect-ratio-btn valid"
                                id="loan_term_84"
                                name="loan_term"
                                checked=""
                                :value="84"
                                v-model="universal_calculator.duration"
                              /><label>84</label>
                            </div>
                          </li>
                          <li>
                            <div class="head-felid">
                              <input
                                type="radio"
                                class="seclect-ratio-btn valid"
                                id="loan_term_96"
                                name="loan_term"
                                :value="96"
                                v-model="universal_calculator.duration"
                              /><label>96</label>
                            </div>
                          </li>
                          <li>
                            <input
                              type="number"
                              class="form-control w-auto"
                              id="apr"
                              v-model="universal_calculator.duration"
                            />
                          </li>
                        </ul>
                      </div>
                    </div>

                    <!-- Trade-In Value and Existing Loan -->
                    <div class="mb-3 row">
                      <div class="col-md-6">
                        <label for="tradeInValue" class="form-label"
                          >Trade-In Value</label
                        >
                        <input
                          type="number"
                          class="form-control"
                          id="tradeInValue"
                          v-model="universal_calculator.trade_in_value"
                          placeholder="$ 0.00"
                        />
                      </div>
                      <div class="col-md-6">
                        <label for="existingLoan" class="form-label"
                          >Existing Vehicle Loan Balance</label
                        >
                        <input
                          type="number"
                          class="form-control"
                          id="existingLoan"
                          v-model="universal_calculator.lien_value"
                          placeholder="$ 0.00"
                        />
                      </div>
                    </div>

                    <!-- Credit Score -->
                    <div class="mb-3">
                      <label class="form-label">Approx. Credit Score</label>
                      <div
                        class="btn-group"
                        role="group"
                        aria-label="Credit Score"
                      >
                        <ul class="form-list-desgine finace-box">
                          <li>
                            <div class="head-felid">
                              <input
                                type="radio"
                                class="seclect-ratio-btn valid"
                                id="credit_poor"
                                name="credit_rating"
                                :value="14.99"
                                v-model="universal_calculator.interest_rate"
                              /><label>Poor</label>
                            </div>
                          </li>
                          <li>
                            <div class="head-felid">
                              <input
                                type="radio"
                                class="seclect-ratio-btn valid"
                                id="fair"
                                :value="9.99"
                                v-model="universal_calculator.interest_rate"
                              /><label>Fair</label>
                            </div>
                          </li>
                          <li>
                            <div class="head-felid">
                              <input
                                type="radio"
                                class="seclect-ratio-btn valid"
                                id="good"
                                name="credit_rating"
                                :value="5.99"
                                v-model="universal_calculator.interest_rate"
                              /><label>Good</label>
                            </div>
                          </li>
                          <li>
                            <div class="head-felid">
                              <input
                                type="radio"
                                class="seclect-ratio-btn valid"
                                id="excellent"
                                name="credit_rating"
                                :value="4.79"
                                v-model="universal_calculator.interest_rate"
                              /><label>Excellent</label>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <!-- Estimated APR and Sales Tax -->
                    <div class="mb-3 row">
                      <div class="col-md-6">
                        <label for="apr" class="form-label"
                          >Estimated APR</label
                        >
                        <input
                          type="number"
                          class="form-control"
                          id="apr"
                          v-model="universal_calculator.interest_rate"
                          placeholder="%"
                        />
                      </div>
                      <div class="col-md-12 d-flex align-items-center">
                        <div class="form-check pt-3">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="salesTax"
                            v-model="include_sales_tax"
                          />
                          <label class="form-check-label" for="salesTax"
                            >Include Sales Tax</label
                          >
                        </div>
                      </div>
                    </div>
                  </form>
                </div>

                <!-- Result Section -->
                <div class="col-md-4 m-auto">
                  <div class="payment-box p-4">
                    <h5 class="text-center">
                      Based on your input, your estimated payment:
                    </h5>
                    <div class="text-center my-3">
                      <h2 class="fw-bold">Bi-Weekly Payment</h2>
                      <p class="fs-3 text-success">
                        {{
                          formatNumber(calculator_response.biweekly_amount, {
                            style: "currency",
                            currency: "USD",
                          })
                        }}
                      </p>
                    </div>
                    <button
                      @click="calculateFinancingInformation"
                      :disabled="isCalculating"
                      class="btn btn-link text-decoration-none w-100 mb-3 fw-bolder"
                    >
                      <Icon
                        name="bx:sync"
                        :class="isCalculating ? 'rotating' : ''"
                        class="fs-5 align-middle fw-bolder"
                      />
                      Calculate Payment
                    </button>
                    <NuxtLink
                      :to="`/finance?inventory_id=${inventory_id}`"
                      class="btn btn-success text-white w-100 mb-3"
                    >
                      Get pre-approved
                    </NuxtLink>
                    <div v-if="false">
                      <label for="desiredPayment" class="form-label"
                        >Desired Bi-Weekly Payment</label
                      >
                      <input
                        type="number"
                        class="form-control"
                        id="desiredPayment"
                        placeholder="$ 0.00"
                        v-model="adjust_amount"
                      />
                      <button
                        @click="rollADeal"
                        class="btn btn-dark text-white w-100 mt-2"
                      >
                        Adjust Bi-Weekly
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Disclosures -->
              <div class="mt-4">
                <h4>Finance Disclosures</h4>
                <p class="text-muted small">
                  The payment estimator is not an advertisement or offer for
                  specific terms of credit and actual terms may vary. Payment
                  amounts presented are for illustrative purposes only and may
                  not be available. Actual vehicle price may vary by Dealer. The
                  Estimated Monthly Payment calculated is based on the variables
                  you entered, the price of the vehicle you entered, the term
                  you select, the down payment you enter, the Annual Percentage
                  Rate (APR) you select, and any net trade-in amount. The
                  payment estimate displayed does not include taxes, title,
                  license and/or registration fees. Payment amount is for
                  illustrative purposes only. Actual prices may vary by Dealer.
                  Payment amounts may be different due to various factors such
                  as fees, specials, rebates, term, down payment, APR, net
                  trade-in, and applicable tax rate. Actual APR is based on
                  available finance programs and the creditworthiness of the
                  customer. Not all customers will qualify for credit or for the
                  lowest rate. Please contact an authorized dealer for actual
                  rates, program details and actual terms.
                </p>
              </div>
            </div>
          </div>
        </ModalBody>
      </ModalContent>
    </ModalDialog>
  </Modal>
  <!-- Modal : END -->
</template>