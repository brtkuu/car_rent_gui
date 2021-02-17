<template>
    <div>
        <form>
            <label for="marka">Marka:</label>
           <input type="text" id="marka">
           <label for="model">Model:</label>
           <input type="text" id="model">
        </form>
        <button @click="wyszukaj()">Wyszukaj</button>
        <ul>
        <li v-for="(item) in this.$store.state.auta" v-bind:key="item.AU_ID" @click="autoClick(item)">
            {{item.AU_MARKA}} {{item.AU_MODEL}} | Dostepnosc: {{item.AU_DOSTEPNOSC}} | {{item.PL_NAZWA}}
        </li>
    </ul>
    <auto-info v-if="show_component_auto" v-bind:item="wybrane_auto" />
    </div>
</template>
<script>
import { ipcRenderer } from 'electron';
import auto_info from "../components/auto_info";

export default {
    name: "Wypozyczenia",
    components: {
        "auto-info": auto_info
    },
    data() {
        return {
            show_component_auto: false,
        }
    },
    methods: {
        autoClick(item) {
            this.wybrane_auto = item;
            this.show_component_auto = false;
            this.show_component_auto = true;
        },
        wyszukaj() {
            const params = {
                marka: document.getElementById('marka').value,
                model: document.getElementById('model').value,
                dostepnosc: "T",
            }
            ipcRenderer.send("wyszukaj_auta", params);
            
        }
    },
    mounted() {
        ipcRenderer.send("auta");
    }
}
</script>
<style scoped>
li {
    cursor: pointer;
}
</style>
