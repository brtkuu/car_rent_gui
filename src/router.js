import Vue from "vue";
import Router from "vue-router";
import klienci from "./views/klienci";
import auta from "./views/auta";

Vue.use(Router);

export default new Router({
	routes: [
		{
			path: "/klienci",
			name: "klienci",
			component: klienci,
		},
		{
			path: "/auta",
			name: "auta",
			component: auta,
		},
	],
});
