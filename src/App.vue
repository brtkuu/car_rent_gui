<template>
  <div id="app">
	<router-link to="/klienci" exact>Klienci</router-link> |
	<router-link to="/auta" exact>Auta</router-link> |
	<router-link to="/dodajKlienta" exact>Dodaj klienta</router-link> | 
	<router-link to="/wypozyczenia" exact>Wypozyczenia</router-link> | 
	<router-link to="/historia" exact>Historia</router-link> |
	<router-link to="/wypozycz" exact>Wypozycz</router-link>  
	<div>
	  <router-view></router-view>
	</div>
  </div>
</template>
<script>
import {ipcRenderer} from "electron";

export default {
	name: "App",
	mounted() {
		ipcRenderer.on("placowki", (event, data)=>{
            this.$store.state.placowki = data;
        });
		ipcRenderer.on("klienci", (_event, data)=>{
			this.$store.state.klienci = data;
		});
        ipcRenderer.on("wyszukaj_klient", (_event, data)=>{
            this.$store.state.klienci = data;
        });
		ipcRenderer.on("auta", (_event, data)=>{
            this.$store.state.auta = data;
        });
        ipcRenderer.on("wyszukaj_auta", (_event, data)=>{
            this.$store.state.auta = data;
        });
		ipcRenderer.on("wypozyczenia", (_event, data)=>{
            this.$store.state.wypozyczenia = data;
        });
		ipcRenderer.on("historia", (_event, data)=>{
            this.$store.state.historia = data;
        });
		ipcRenderer.send("placowki");
	}
};
</script>
