
require('./bootstrap');
window.Vue = require('vue');
let axios =require('axios');


Vue.component('contact', require('./components/Contact.vue'));

const app = new Vue({
    el: '#app'
});
