<template>
  <div>
    <loader v-if="loading"></loader>
    <div v-else class="app-main-layout">

      <navbar @clickMenuIcon="isOpen = !isOpen"></navbar>

      <sidebar :value="isOpen" :key="locale"></sidebar>

      <main class="app-content" :class="!isOpen? 'full': ''">
        <div class="app-page">
          <router-view />
        </div>
      </main>

      <div class="fixed-action-btn">
        <router-link class="btn-floating btn-large blue" to="/record" v-tooltip="'Создать новую запись'">
          <i class="large material-icons">add</i>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/app/Navbar";
import Sidebar from "@/components/app/Sidebar";
import messages from "@/utils/messages";

export default {
  name: "MainLayout",
  components: {
    Navbar, Sidebar
  },
  data: function () {
    return {
      isOpen: true,
      loading: true
    }
  },
  async mounted() {
    if (!Object.keys(this.$store.getters.info).length) {
      await this.$store.dispatch('fetchInfo')
    }

    this.loading = false
  },
  computed: {
    error() {
      return this.$store.getters.error
    },
    locale() {
      return this.$store.getters.info.locale
    }
  },
  watch: {
    error(fbError) {
      this.$error(messages[fbError.code] || 'Что-то пошло не так')
    }
  }
}
</script>

<style scoped>

</style>