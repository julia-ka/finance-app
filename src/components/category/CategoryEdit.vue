<template>
  <div>
    <div class="page-subtitle">
      <h4>{{'Edit' | localize}}</h4>
    </div>

    <form @submit.prevent="submitHandler">
      <div class="input-field" >
        <select ref="select" v-model="current">
          <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{cat.title}}</option>
        </select>
        <label>{{'SelectCategory' | localize}}</label>
      </div>

      <div class="input-field">
        <input type="text" id="name"
               v-model="title"
               :class="{invalid: $v.title.$dirty && !$v.title.required}">
        <label for="name">{{'Title' | localize}}</label>
        <span
            v-if="$v.title.$dirty && !$v.title.required"
            class="helper-text invalid"
        >{{'Message_EnterCategoryTitle' | localize}}</span>
      </div>

      <div class="input-field">
        <input
            id="limit"
            type="number"
            v-model.number="limit"
            :class="{invalid: $v.limit.$dirty && !$v.limit.minValue || $v.limit.$dirty && !$v.limit.required}"
        >
        <label for="limit">{{'Limit' | localize}}</label>
        <span
            v-if="$v.limit.$dirty && !$v.limit.minValue || $v.limit.$dirty && !$v.limit.required"
            class="helper-text invalid"
        >
          {{'Message_MinValue' | localize}}: {{$v.limit.$params.minValue.min}}
        </span>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        {{'Update' | localize}}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import {minValue, required} from "vuelidate/lib/validators";

export default {
  name: "CategoryEdit",
  props: ['categories'],
  data: () => ({
    select: null,
    current: null,
    title: '',
    limit: 100
  }),
  validations: {
    title: {required},
    limit: {required, minValue: minValue(100)}
  },
  watch:{
    current(catId) {
      const {title, limit} = this.categories.find(c => c.id === catId)
      this.title = title
      this.limit = limit
    }
  },
  created() {
    const {id, title, limit} = this.categories[0]
    this.current = id
    this.title = title
    this.limit = limit
  },
  mounted() {
    this.select = window.M.FormSelect.init(this.$refs.select);
    window.M.updateTextFields()
  },
  methods: {
    /**
     * Функция отправки формы
     * @returns {Promise<void>}
     */
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      try {
        const categoryData = {
          id: this.current,
          title: this.title,
          limit: this.limit
        }
        await this.$store.dispatch('updateCategory', categoryData)
        this.$message('Категория успешно обновлена')
        this.$emit('updated', categoryData)
      } catch (e) {
        console.log(e)
      }
    }
  },
  destroyed() {
    if (this.select && this.select.destroy) {
      this.select.destroy()
    }
  }
}
</script>

<style scoped>

</style>