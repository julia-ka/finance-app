<template>
  <ul class="sidenav app-sidenav" :class="value? 'open': ''">
    <router-link
        v-for="(link, index) in links"
        :key="index"
        tag="li"
        active-class="active"
        :to="link.url"
        :exact="link.exact"
    >
      <a :href="link.url" class="waves-effect waves-orange pointer">{{link.title}}</a>
    </router-link>

  </ul>
</template>

<script>
import localizeFilter from "@/filters/localize.filter";

export default {
  name: "Sidebar",
  props: ['value'],
  data: function () {
    return {
      links: [
        {
          title: localizeFilter('Menu_Bill'),
          url: '/',
          exact: true
        },
        {
          title: localizeFilter('Menu_History'),
          url: '/history'
        },
        {
          title: localizeFilter('Menu_Planning'),
          url: '/planning'
        },
        {
          title: localizeFilter('Menu_NewRecord'),
          url: '/record'
        },
        {
          title: localizeFilter('Menu_Categories'),
          url: '/categories'
        },
      ]
    }
  }
}
</script>

<style scoped>

</style>