<template>
  <div>
    <loader v-if="loading"></loader>
    <div v-else-if="record">
      <div class="breadcrumb-wrap">
        <router-link to="/history" class="breadcrumb">{{'History' | localize}}</router-link>
        <a @click.prevent class="breadcrumb">
          {{ (record.type === 'income' ? 'Income' : 'Outcome') | localize}}
        </a>
      </div>
      <div class="row">
        <div class="col s12 m6">
          <div class="card" :class="{
            'red': record.type === 'outcome',
            'green': record.type === 'income'
          }">
            <div class="card-content white-text">
              <p>{{'Description' | localize}}: {{record.description}}</p>
              <p>{{'Sum' | localize}}: {{record.amount | currency}}</p>
              <p>{{'Category' | localize}}: {{record.categoryName}}</p>

              <small>{{record.date | date('datetime')}}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="center">{{'Message_NoRecord' | localize}}</div>
  </div>
</template>

<script>
export default {
  name: "DetailRecord",
  data: () => ({
    record: null,
    loading: true
  }),
  metaInfo() {
    return {
      title: this.$title('Record')
    }
  },
  async mounted() {
    const id = this.$route.params.id
    const record = await this.$store.dispatch('fetchRecordById', id)
    const category = await this.$store.dispatch('fetchCategoryById', record.categoryId)
    this.record = {
      ...record,
      categoryName: category.title
    }
    this.loading = false
  }
}
</script>

<style scoped>

</style>