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
const ETCABI = require('./const/etcABI');
const Address = '0x6dd053cc650d0288492289e445ef5072177fef76';
const etcAddress = '0xb19ac2fc81d8fa369ed6389060446bb7c3e6d023';

let web3js = null;
if (typeof web3 !== 'undefined') {
    web3js = new Web3(web3.currentProvider);
    window.contractInstance = new web3js.eth.Contract(ABI, Address);
    window.etcContract = new web3js.eth.Contract(ETCABI, etcAddress);
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