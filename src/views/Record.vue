<template>
  <div>

    <div class="page-title">
      <h3>{{'NewRecord' | localize}}</h3>
    </div>

    <loader v-if="loading"></loader>
    <p v-else-if="!categories.length" class="center">
      {{'NoCategories' | localize}}.
      <router-link to="/categories">{{'AddCategory' | localize}}</router-link>
    </p>
    <form v-else class="form" @submit.prevent="submitHandler">
      <div class="input-field" >
        <select ref="select" v-model="category">
          <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{cat.title}}</option>
        </select>
        <label>{{'SelectCategory' | localize}}</label>
      </div>

      <p>
        <label>
          <input
              class="with-gap"
              name="type"
              type="radio"
              value="income"
              v-model="type"
          />
          <span>{{'Income' | localize}}</span>
        </label>
      </p>

      <p>
        <label>
          <input
              class="with-gap"
              name="type"
              type="radio"
              value="outcome"
              v-model="type"
          />
          <span>{{'Outcome' | localize}}</span>
        </label>
      </p>

      <div class="input-field">
        <input
            id="amount"
            type="number"
            v-model.number="amount"
            :class="{invalid: $v.amount.$dirty && !$v.amount.required || $v.amount.$dirty && !$v.amount.minValue}"
        >
        <label for="amount">{{'Sum' | localize}}</label>
        <span
            v-if="$v.amount.$dirty && !$v.amount.required || $v.amount.$dirty && !$v.amount.minValue"
            class="helper-text invalid"
        >{{'Message_MinValue' | localize}}: {{$v.amount.$params.minValue.min}}</span>
      </div>

      <div class="input-field">
        <input
            id="description"
            type="text"
            v-model="description"
            :class="{invalid: $v.description.$dirty && !$v.description.required}"
        >
        <label for="description">{{'Description' | localize}}</label>
        <span
            v-if="$v.description.$dirty && !$v.description.required"
            class="helper-text invalid"
        >{{'Message_AddDescription' | localize}}</span>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        {{'Create' | localize}}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import {minValue, required} from "vuelidate/lib/validators";
import {mapGetters} from 'vuex'

export default {
  name: "Record",
  data: () => ({
    categories: [],
    category: null,
    loading: true,
    select: null,
    type: 'outcome',
    amount: 1,
    description: ''
  }),
  metaInfo() {
    return {
      title: this.$title('NewRecord')
    }
  },
  validations: {
    amount: {required, minValue: minValue(1)},
    description: {required}
  },
  async mounted() {
    this.categories = await this.$store.dispatch('fetchCategories')
    this.loading = false

    if (this.categories.length) {
      this.category = this.categories[0].id
    }

    setTimeout(() => {
      this.select = window.M.FormSelect.init(this.$refs.select);
      window.M.updateTextFields()
    }, 0)

  },
  computed: {
    ...mapGetters(['info']),
    canCreateRecord() {
      if (this.type === 'income') {
        return true
      }

      return this.info.bill >= this.amount
    }
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      if (this.canCreateRecord) {
        try {
          const recordData = {
            categoryId: this.category,
            type: this.type,
            amount: this.amount,
            description: this.description,
            date: new Date().toJSON()
          }
          await this.$store.dispatch('createRecord', recordData)
          const bill = this.type === 'income' ? this.info.bill + this.amount : this.info.bill - this.amount
          await this.$store.dispatch('updateInfo', {bill})
          this.$message('Запись успешно добавлена')
          this.$v.$reset()
          this.amount = 1
          this.description = ''
        } catch (e) {
          console.log(e)
        }
      } else {
        this.$message('Недостаточно средств на счете (' + (this.amount - this.info.bill) + ')')
      }
    }
  }
}
</script>

<style scoped>

</style>