<template>
<div>
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
        getDate(){
            
        },
        klientclick(item) {
            this.wybrany_klient = item;
            this.show_modal_klient = true;
        }
    },
    mounted() {
		ipcRenderer.on("klienci", (_event, data)=>{
			this.klienci = data;
            this.$forceUpdate();
		});
        ipcRenderer.send("klienci");
	}
}
</script>
