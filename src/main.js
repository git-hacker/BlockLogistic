// require('babel-polyfill');
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// 使用element-ui
import Element from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import axios from './util/interceptor.js'

Vue.use(Element);

import './web3.js';
const ABI = require('./const/logisticABI');

const Address = '0xf30826f0a321b5d39b364c8863335d588c7d40ce';

let web3js = null;
if (typeof web3 !== 'undefined') {
    web3js = new Web3(web3.currentProvider);
    window.contractInstance = new web3js.eth.Contract(ABI, Address);
} else {
    console.log('Please install the metaMask.');
}


Vue.prototype.$http = axios;

import store from './store/index.js'


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    store,
    router,
    template: '<App/>',
    components: {
        App
    }
})