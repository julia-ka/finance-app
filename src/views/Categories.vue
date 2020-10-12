<template>
  <div>
    <div class="page-title">
      <h3>{{'Categories' | localize}}</h3>
    </div>
    <section>
      <loader v-if="loading"></loader>
      <div v-else class="row">
        <div class="col s12 m6">
          <category-create @created="addNewCategory"></category-create>
        </div>
        <div class="col s12 m6">
          <category-edit
              v-if="categories.length"
            :categories="categories"
            :key="categories.length + updateCount"
            @updated="updateCategories"
          ></category-edit>
          <div v-else class="center">{{'NoCategories' | localize}}</div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import CategoryCreate from "@/components/category/CategoryCreate";
import CategoryEdit from "@/components/category/CategoryEdit";
export default {
  name: "Categories",
  components: {CategoryEdit, CategoryCreate},
  data: () => ({
    categories: [],
    loading: true,
    updateCount: 0
  }),
  metaInfo() {
    return {
      title: this.$title('Categories')
    }
  },
  async mounted() {
    this.categories = await this.$store.dispatch('fetchCategories')
    this.loading = false
  },
  methods: {
    /**
     * Добавить категорию
     * @param category
     */
    addNewCategory(category) {
      this.categories.push(category)
    },
    /**
     * Обновить данные категории
     * @param category
     */
    updateCategories(category) {
      const idx = this.categories.findIndex(c => c.id === category.id)
      this.categories[idx].title = category.title
      this.categories[idx].limit = category.limit
      this.updateCount++
    }
  }
}
</script>

<style scoped>

</style>