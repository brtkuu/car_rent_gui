import Vue from "vue";
import Vuex from "vuex";
var fs = require("fs");

import { ipcRenderer } from "electron";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		placowki: [],
		klienci: [],
		wypozyczenia: [],
		auta: [],
		historia: [],
	},
	mutations: {},
	actions: {},
	getters: {},
});
