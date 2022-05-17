<template>
  <v-app style="background-color: #ecf0f1; overflow: hidden">
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

import Vue from 'vue'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import specific icons */
import { faAngleDown, faCircleUser, faCartShopping, faGear, faArrowTrendUp, faCircleInfo, faUser, faPhone, faLocationDot, faHouse } from '@fortawesome/free-solid-svg-icons'
import { faHeart } from '@fortawesome/free-regular-svg-icons'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* add icons to the library */
library.add(faAngleDown, faCircleUser, faCartShopping, faGear, faArrowTrendUp, faCircleInfo, faUser, faPhone, faLocationDot, faHouse, faHeart)

/* add font awesome icon component */
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

export default {
  name: 'App',

  data() {
    return{
      // token: localStorage.getItem('token')
    }
  }
};
</script>

<style>
  
  .v-application a{
    color: white;
    text-decoration: none;
  }
  .v-list-item{
    min-height: 0 !important;
    padding: 0 !important;
  }
  .navbar-link-option{
    padding:10px 20px;
  }
  .navbar-link-option:hover{
    background-color: #f5f6fa;
  }
</style>
