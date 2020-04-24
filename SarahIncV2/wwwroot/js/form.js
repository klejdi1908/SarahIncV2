import Vue from 'vue'
import store from './store'
import app from '../vue/appForm.vue'
import flatpickr from 'flatpickr'
import numeral from 'numeral'
import moment from 'moment'
import chosen from 'chosen-js'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
    faPencilAlt, faPlus, faAngleLeft, faAngleRight, faEraser, faUserPlus, faUser, faUsers, faCalendarAlt, faBars, faEnvelope, faRocket,
    faStepForward, faFastForward, faStepBackward, faFastBackward, faArrowDown, faSearch, faMinus, faThLarge, faCut, faEyeSlash, faEye, faFill
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

Object.defineProperty(Vue.prototype, '$numeral', { value: numeral });
Object.defineProperty(Vue.prototype, '$moment', { value: moment });
Object.defineProperty(Vue.prototype, '$flatpickr', { value: flatpickr });
Object.defineProperty(Vue.prototype, '$chosen', { value: chosen });

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
library.add(faEyeSlash);
library.add(faEye);
library.add(faRocket);
library.add(faStepBackward);
library.add(faFastBackward);
library.add(faStepForward);
library.add(faFastForward);
library.add(faArrowDown);
library.add(faSearch);
library.add(faMinus);
library.add(faThLarge);
library.add(faCut);
library.add(faFill);

Vue.component('fai', FontAwesomeIcon);

new Vue({
    store,
    el: '#formVue',
    created() {
    },
    render: h => h(app)
});