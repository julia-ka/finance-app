<template>
  <div>
    <div class="page-title">
      <h3>{{'RecordsHistory' | localize}}</h3>
    </div>

    <div class="history-chart">
      <canvas ref="canvas"></canvas>
    </div>

    <section>
      <loader v-if="loading"></loader>
      <div v-else-if="!records.length" class="center">{{'Message_NoRecords' | localize}}. <router-link to="/record">{{'AddRecord' | localize}}</router-link></div>
      <div v-else>
        <history-table :records="items"></history-table>
        <paginate
            v-model="page"
            :page-count="pageCount"
            :click-handler="pageChangeHandler"
            :prev-text="prev"
            :next-text="next"
            :container-class="'pagination'"
            :page-class="'waves-effect'"
        ></paginate>
      </div>
    </section>
  </div>
</template>

<script>
import HistoryTable from "@/components/history/HistoryTable";
import paginationMixin from '@/mixins/pagination.mixin'
import {Pie} from 'vue-chartjs'
import localizeFilter from "@/filters/localize.filter";

export default {
  name: "History",
  extends: Pie,
  mixins: [paginationMixin],
  data: () => ({
    loading: true,
    records: []
  }),
  metaInfo() {
    return {
      title: this.$title('History')
    }
  },
  async mounted() {
    this.records = await this.$store.dispatch('fetchRecords')
    const categories = await this.$store.dispatch('fetchCategories')

    this.setup(categories)

    this.loading = false
  },
  components: {HistoryTable},
  computed: {
    prev() {
      return localizeFilter('Prev')
    },
    next() {
      return localizeFilter('Next')
    }
  },
  methods: {
    /**
     * Подготовка данных для страницы
     * @param categories
     */
    setup(categories) {
      this.setupPagination(this.records.map(record => {
        return {
          ...record,
          categoryName: categories.find(cat => cat.id === record.categoryId).title,
          typeClass: record.type === 'income' ? 'green': 'red',
          typeText: record.type === 'income' ? localizeFilter('Income'): localizeFilter('Outcome'),
        }
      }))

      this.renderChart({
        labels: categories.map(cat => cat.title),
        datasets: [{
          label: localizeFilter('OutcomeByCategories'),
          data: categories.map(cat => {
            return this.records.reduce((total, r) => {
              if (r.categoryId === cat.id && r.type === 'outcome') {
                total += +r.amount
              }

              return total
            }, 0)
          }),
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      })
    }
  }
}
</script>

<style scoped>

</style>