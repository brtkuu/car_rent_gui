<template>
    <div>
        <form>
            <input type="text">
        </form>
        <button @click="wyszukaj()">
        <ul>
        <li v-for="(item) in this.wypozyczenia" v-bind:key="item.AU_ID" @click="autoClick(item)">
            {{item.AU_MARKA}} {{item.AU_MODEL}} {{item.AU_DOSTEPNOSC}}
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
            wypozyczenia: [],
            wybrane_auto: {},
            show_component_auto: false,
        }
    },
    methods: {
        autoClick(item) {
            this.wybrane_auto = item;
            this.show_component_auto = true;
        }
    },
    mounted() {
        ipcRenderer.on("auta", (_event, data)=>{
            this.wypozyczenia = data;
        });
        ipcRenderer.send("auta");
    }
}
</script>
