<template>
<div>
    <form>
        <label for="imie">Imie:</label>
        <input type="text" id="imie">
        <label for="nazwisko">Nazwisko:</label>
        <input type="text" id="nazwisko">
    </form>
    <button @click="wyszukaj()">Wyszukaj</button>
    <ul>
        <li v-for="(item) in this.$store.state.klienci" v-bind:key="item.KL_ID" >
            <span @click="klientclick(item)">{{item.KL_IMIE}} {{item.KL_NAZWISKO}} </span><button @click="deleteUser(item.KL_ID)">❌</button>
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
            show_modal_klient: false,
        }
    },
    methods: {
        klientclick(item) {
            this.wybrany_klient = item;
            this.show_modal_klient = false;
            this.show_modal_klient = true;
        },
        wyszukaj() {
            const params = {
                imie: document.getElementById('imie').value,
                nazwisko: document.getElementById('nazwisko').value,
            }
            ipcRenderer.send("wyszukaj_klient", params);
            
        },
        deleteUser(id){
            ipcRenderer.send("delete", {kl_id: id});
        }
    },
    mounted() {	
        ipcRenderer.send("klienci");
        ipcRenderer.on("deleted", ()=> {
            ipcRenderer.send("klienci");
            this.$forceUpdate();
        })
	}
}
</script>
<style scoped>
li {
    cursor: pointer;
}
</style>
