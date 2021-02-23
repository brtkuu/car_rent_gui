<template>
    <div>
        <div v-if="this.$store.state.historia.length">
        <div>
            <label for="wyszukaj_wyp_nazwisko">Nazwisko: </label>
            <input type="text" name="wyszukaj_wyp_nazwisko" id="wyszukaj_wyp_nazwisko">
            <button @click="wyszukaj()">Wyszukaj</button>
        </div>
        </div>
        <ul>
            <li v-for="item in this.$store.state.historia" v-bind:key="item.WY_ID">   
                {{item.KL_IMIE}} {{item.KL_NAZWISKO}} - {{item.AU_MARKA}} {{item.AU_MODEL}} | {{new Date(item.WY_DATA_OD).toLocaleString('pl-PL', {year: 'numeric', month: 'long', day: 'numeric' })}} - {{new Date(item.WY_DATA_ZW).toLocaleString('pl-PL', {year: 'numeric', month: 'long', day: 'numeric' })}} | {{item.WY_KOSZT}} zł
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
        wyszukaj() {
            const params = {
                nazwisko: document.getElementById("wyszukaj_wyp_nazwisko").value,
            }
            ipcRenderer.send("wypozyczenia", params);
        },
        cena(start, zwrot) {
            const time = zwrot.getTime() - start.getTime();
            console.log(time);
        }
    },
    mounted() {
        ipcRenderer.send("historia", {nazwisko: ""});
    }
}
</script>
<style scoped>

</style>
