<template>
<div>
    <form>
        <label for="imie">Imie:</label>
        <input type="text" id="imie">
        <label for="nazwisko">Naziwsko:</label>
        <input type="text" id="nazwisko">
    </form>
    <button @click="wyszukaj()">Wyszukaj</button>
    <ul>
        <li v-for="(item) in klienci" v-bind:key="item.KL_ID" @click="klientclick(item)">
            {{item.KL_IMIE}} {{item.KL_NAZWISKO}}
        </li>
    </ul>
    <klient-info v-if="show_modal_klient" v-bind:item="wybrany_klient" />
</div>
</template>
<script>
import {ipcRenderer} from "electron";
import klient_info from "../components/klient_info";
export default {
    name: 'Klienci',
    components: {
        "klient-info": klient_info
    },
    data() {
        return {
            klienci : [],
            wybrany_klient: {},
            show_modal_klient: false,
        }
    },
    methods: {
        klientclick(item) {
            this.wybrany_klient = item;
            this.show_modal_klient = true;
        },
        wyszukaj() {
            const params = {
                imie: document.getElementById('imie').value,
                nazwisko: document.getElementById('nazwisko').value,
            }
            ipcRenderer.send("wyszukaj_klient", params);
            
        }
    },
    mounted() {
		ipcRenderer.on("klienci", (_event, data)=>{
			this.klienci = data;
            this.$forceUpdate();
		});
        ipcRenderer.on("wyszukaj_klient", (_event, data)=>{
            this.klienci = data;
        });
        ipcRenderer.send("klienci");
	}
}
</script>
<style scoped>
li {
    cursor: pointer;
}
</style>
