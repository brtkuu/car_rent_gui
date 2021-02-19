<template>
    <div>
        <div v-if="this.$store.state.wypozyczenia.length">
        <div>
            <label for="wyszukaj_wyp_nazwisko">Nazwisko: </label>
            <input type="text" name="wyszukaj_wyp_nazwisko" id="wyszukaj_wyp_nazwisko">
            <button @click="wyszukaj()">Wyszukaj</button>
        </div>
        <div>
            Miejsce oddania: <select name="placowka" id="placowka">
            <option v-for="item in this.$store.state.placowki" v-bind:key="item.PL_NAZWA">{{item.PL_NAZWA}}</option>
            </select>
        </div>
        </div>
        <ul>
            <li v-for="item in this.$store.state.wypozyczenia" v-bind:key="item.WY_ID">   
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
            koszt: 0,
        }
    },
    methods: {
        zwrot(auto_id){
            const params = {
                auto_id,
                pl_nazwa: document.getElementById("placowka").value,
                data_zwrotu: `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}`,
            }
            ipcRenderer.send("zwrot", params);
            

            this.$forceUpdate();
        },
        wyszukaj() {
            const params = {
                nazwisko: document.getElementById("wyszukaj_wyp_nazwisko").value,
            }
            ipcRenderer.send("wypozyczenia", params);
        }
    },
    mounted() {
        ipcRenderer.send("wypozyczenia", {nazwisko: ""});
        ipcRenderer.on("zwrot", ()=> {
            ipcRenderer.send("wypozyczenia", {nazwisko: ""});
        })
    }
}
</script>
<style scoped>

</style>
