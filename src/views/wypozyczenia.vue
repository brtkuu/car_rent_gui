<template>
    <div>
        <div v-if="wypozyczenia.length">
        <div>
            <label for="wyszukaj_wyp_nazwisko">Nazwisko: </label>
            <input type="text" name="wyszukaj_wyp_nazwisko" id="wyszukaj_wyp_nazwisko">
            <button @click="wyszukaj()">Wyszukaj</button>
        </div>
        <div>
            Miejsce oddania: <select name="placowka" id="placowka">
            <option v-for="item in placowki" v-bind:key="item.PL_NAZWA">{{item.PL_NAZWA}}</option>
            </select>
        </div>
        </div>
        <ul>
            <li v-for="item in wypozyczenia" v-bind:key="item.WY_ID">   
                {{item.KL_IMIE}} {{item.KL_NAZWISKO}} - {{item.AU_MARKA}} {{item.AU_MODEL}} <button @click="zwrot(item.AU_ID)">🔙</button>
            </li>
        </ul>
    </div>
</template>
<script>
import { ipcRenderer } from 'electron'
export default {
    name:'wypozyczenia',
    data() {
        return {
            wypozyczenia: [],
            placowki: [],
        }
    },
    methods: {
        zwrot(auto_id){
            const params = {
                auto_id,
                pl_nazwa: document.getElementById("placowka").value
            }
            ipcRenderer.send("zwrot", params);
        },
        wyszukaj() {
            const params = {
                nazwisko: document.getElementById("wyszukaj_wyp_nazwisko").value,
            }
            ipcRenderer.send("wypozyczenia", params);
        }
    },
    mounted() {
        ipcRenderer.on("wypozyczenia", (event, data)=>{
            this.wypozyczenia = data;
            this.$forceUpdate();
        });
        ipcRenderer.on("placowki", (event, data)=>{
            this.placowki = data;
            this.$forceUpdate();
        });
        ipcRenderer.on("zwrot", event =>{
            ipcRenderer.send("wypozyczenia", {nazwisko: ""});
        })
        ipcRenderer.send("wypozyczenia", {nazwisko: ""});
        ipcRenderer.send("placowki");
    }
}
</script>
<style scoped>

</style>
