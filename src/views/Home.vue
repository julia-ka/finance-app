<template>
  <div>
    <div class="page-title">
      <h3>Счет</h3>

      <button class="btn waves-effect waves-light btn-small" @click="refresh">
        <i class="material-icons">refresh</i>
      </button>
    </div>
    <loader v-if="loading"></loader>
    <div class="row" v-else>
      <div class="col s12 m6 l4">
        <home-bill
            :rates="currency.rates"
        ></home-bill>
      </div>

      <div class="col s12 m6 l8">
        <home-currency
            :rates="currency.rates"
            :date="currency.date"
        ></home-currency>
      </div>
    </div>
  </div>
</template>

<script>

import HomeBill from "@/components/home/HomeBill";
import HomeCurrency from "@/components/home/HomeCurrency";
export default {
  name: 'Home',
  components: {HomeCurrency, HomeBill},
  data: () => ({
    loading: true,
    currency: null
  }),
  async mounted() {
    this.currency = await this.$store.dispatch('fetchCurrency')
    this.loading = false
  },
  methods: {
    async refresh() {
      this.loading = true
      this.currency = await this.$store.dispatch('fetchCurrency')
      this.loading = false
    }
  }
}
</script>
