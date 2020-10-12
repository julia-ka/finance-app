<template>
  <div>
    <div class="page-subtitle">
      <h4>{{'Create' | localize}}</h4>
    </div>

    <form @submit.prevent="submitHandler">
      <div class="input-field">
        <input
            v-model="title"
            id="name"
            type="text"
            :class="{invalid: $v.title.$dirty && !$v.title.required}"
        >
        <label for="name">{{'Title' | localize}}</label>
        <span
            v-if="$v.title.$dirty && !$v.title.required"
            class="helper-text invalid"
        >
          {{'Message_EnterCategoryTitle' | localize}}
        </span>
      </div>

      <div class="input-field">
        <input
            v-model.number="limit"
            id="limit"
            type="number"
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
        {{'Create' | localize}}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import {required, minValue} from 'vuelidate/lib/validators'
export default {
  name: "CategoryCreate",
  data: () => ({
    title: '',
    limit: 100
  }),
  validations: {
    title: {required},
    limit: {required, minValue: minValue(100)}
  },
  mounted() {
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
        const category = await this.$store.dispatch('createCategory', {
          title: this.title,
          limit: this.limit
        })

        this.title = ''
        this.limit = 100
        this.$v.$reset()
        this.$message('Категория была создана')
        this.$emit('created', category)

      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style scoped>

</style>