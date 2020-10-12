<template>
  <nav class="navbar orange lighten-1">
    <div class="nav-wrapper">
      <div class="navbar-left">
        <a href="#" @click.prevent="$emit('clickMenuIcon')">
          <i class="material-icons black-text">dehaze</i>
        </a>
        <span class="black-text">{{date | date('datetime')}}</span>
      </div>

      <ul class="right hide-on-small-and-down">
        <li>
          <a
              class="dropdown-trigger black-text"
              href="#"
              data-target="dropdown"
              ref="dropdown"
          >
            {{name}}
            <i class="material-icons right">arrow_drop_down</i>
          </a>

          <ul id='dropdown' class='dropdown-content'>
            <li>
              <router-link to="/profile" class="black-text">
                <i class="material-icons">account_circle</i>Профиль
              </router-link>
            </li>
            <li class="divider" tabindex="-1"></li>
            <li>
              <a href="#" class="black-text" @click.prevent="logout">
                <i class="material-icons">assignment_return</i>Выйти
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  data: function () {
    return {
      date: new Date(),
      interval: null,
      dropDown: null
    }
  },
  mounted() {
    this.interval = setInterval(() => {
      this.date = new Date()
    } , 1000)
    this.dropDown = window.M.Dropdown.init(this.$refs.dropdown, {
      constrainWidth: true
    })
  },
  computed: {
    name() {
      return this.$store.getters.info.name
    }
  },
  methods: {
    /**
     * Функция - выход из учетной записи
     * @returns {Promise<void>}
     */
    async logout() {
      await this.$store.dispatch('logout')
      this.$router.push('/login?message=logout')
    }
  },
  beforeDestroy() {
    clearInterval(this.interval)
    if (this.dropDown && this.dropDown.destroy) {
      this.dropDown.destroy()
    }
  }
}
</script>

<style scoped>

</style>