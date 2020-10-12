import Vue from 'vue'
import App from './App.vue'
import Vuelidate from "vuelidate";
import VueMeta from 'vue-meta'
import Paginate from 'vuejs-paginate'
import './registerServiceWorker'
import router from './router'
import store from './store'
import dateFilter from "./filters/date.filter";
import currencyFilter from "@/filters/currency.filter";
import localizeFilter from "@/filters/localize.filter";
import tooltipDirective from './tooltip.directive'
import messagePlugin from '@/utils/message.plugin';
import titlePlugin from '@/utils/title.plugin';
import Loader from "@/components/app/Loader";
import 'materialize-css/dist/js/materialize.min'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false

Vue.use(messagePlugin)
Vue.use(titlePlugin)
Vue.use(Vuelidate)
Vue.use(VueMeta)
Vue.filter('date', dateFilter)
Vue.filter('currency', currencyFilter)
Vue.filter('localize', localizeFilter)
Vue.directive('tooltip', tooltipDirective)
Vue.component('Loader', Loader)
Vue.component('paginate', Paginate)

firebase.initializeApp({
  apiKey: "AIzaSyDe9J69BECljtdxvCqHmLAj0o3_APLM1v4",
  authDomain: "vue-finance-control.firebaseapp.com",
  databaseURL: "https://vue-finance-control.firebaseio.com",
  projectId: "vue-finance-control",
  storageBucket: "vue-finance-control.appspot.com",
  messagingSenderId: "286356839792",
  appId: "1:286356839792:web:602775e7ddac21f6ee03b5",
  measurementId: "G-QERBTZR4KM"
})

let app

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})
