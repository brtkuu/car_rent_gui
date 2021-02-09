<template>
  <div id="app">
	<router-link to="/klienci" exact>Klienci</router-link>
	<router-link to="/auta" exact>Auta</router-link>
	<div>
	  <router-view></router-view>
	</div>
  </div>
</template>
<script>
export default {
	name: "App",
};
</script>
