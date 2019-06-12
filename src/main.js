import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
// import tools from './utils'
// import config from './config'      
Vue.config.productionTip = false
// Vue.prototype.tools = tools;                         // 挂载 tools
// Vue.prototype.config = config;                       // 挂载 config
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
