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
const SafeABI = require('./const/saveABI');
const safeAddress = '0xA99Da1f05B1639Bd682B8d2f7C25256AC1a988c9';
const Address = '0xa29be289dDcE36B10dc50748cfCBD52FbDa851e4';
const etcAddress = '0x6E373E2658552d8C022c979026353bd2729476f3';

let web3js = null;
if (typeof web3 !== 'undefined') {
    web3js = new Web3(web3.currentProvider);
    window.contractInstance = new web3js.eth.Contract(ABI, Address);
    window.etcContract = new web3js.eth.Contract(ETCABI, etcAddress);
    window.safeContract = new web3js.eth.Contract(SafeABI, safeAddress);
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