import Vue from 'vue'
import store from './store'
import app from '../vue/appAdmin.vue'
import flatpickr from 'flatpickr'
import moment from 'moment'
import numeral from 'numeral'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPencilAlt, faPlus, faAngleLeft, faAngleRight, faEraser, faUserPlus, faUser, faUsers, faCalendarAlt, faBars, faEnvelope, faRocket } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

Object.defineProperty(Vue.prototype, '$numeral', { value: numeral });
Object.defineProperty(Vue.prototype, '$moment', { value: moment });
Object.defineProperty(Vue.prototype, '$flatpickr', { value: flatpickr });

library.add(faPencilAlt);
library.add(faPlus);
library.add(faAngleLeft);
library.add(faAngleRight);
library.add(faEraser);
library.add(faUserPlus);
library.add(faUser);
library.add(faUsers);
library.add(faCalendarAlt);
library.add(faBars);
library.add(faEnvelope);
library.add(faRocket);

Vue.component('fai', FontAwesomeIcon);

new Vue({
    store,
    el: '#adminVue',
    created() {
    },
    render: h => h(app)
});