<template>
  <div class="card light-blue bill-card">
    <div class="card-content white-text">
      <span class="card-title">Счет в валюте</span>

      <p
          v-for="cur of currencies"
          :key="cur"
          class="currency-line">
        <span>
          {{getCurrency(cur) | currency(cur)}}
        </span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeBill",
  props: ['rates'],
  data: () => ({
    currencies: ['RUB', 'USD', 'EUR']
  }),
  computed: {
    base() {
      return this.$store.getters.info.bill / (this.rates['RUB'] / this.rates['EUR'])
    }
  },
  methods: {
    /**
     * Получить счет в определенной валюте
     * @param currency
     * @returns {number}
     */
    getCurrency(currency) {
      return Math.floor(this.base * this.rates[currency])
    }
  }
}
</script>

<style scoped>

</style>