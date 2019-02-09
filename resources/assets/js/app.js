
require('./bootstrap');

window.Vue = require('vue');


Vue.component('contact', require('./components/Contact.vue'));

const app = new Vue({
    el: '#app'
});
