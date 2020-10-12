<template>
  <table>
    <thead>
    <tr>
      <th>#</th>
      <th>{{'Sum' | localize}}</th>
      <th>{{'Date' | localize}}</th>
      <th>{{'Category' | localize}}</th>
      <th>{{'Type' | localize}}</th>
      <th>{{'Open' | localize}}</th>
    </tr>
    </thead>

    <tbody>
      <tr v-for="(rec, index) in records" :key="rec.id">
        <td>{{index + 1}}</td>
        <td>{{rec.amount | currency}}</td>
        <td>{{rec.date | date('datetime')}}</td>
        <td>{{rec.categoryName}}</td>
        <td>
          <span class="white-text badge" :class="rec.typeClass">{{rec.typeText}}</span>
        </td>
        <td>
          <button
              v-tooltip="tooltipTitle"
              class="btn-small btn"
              @click="$router.push('/detail-record/' + rec.id)"
          >
            <i class="material-icons">open_in_new</i>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import localizeFilter from "@/filters/localize.filter";

export default {
  name: "HistoryTable",
  props: {
    records: {
      required: true,
      type: Array
    }
  },
  computed: {
    tooltipTitle() {
      return localizeFilter('OpenRecord')
    }
  }
}
</script>

<style scoped>

</style>