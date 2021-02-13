<template>
<div>
    <div>
    </div>
    <div class="grid">
        <div class="klienci">
            <form>
                <label for="nazwisko">
                    Wyszukaj klienta (nazwisko):
                </label>
                <input type="text" name="nazwisko" id="nazwisko">
            </form>
            <button @click="wyszukaj_klient()">Wyszukaj</button>
            <div v-for="klient in this.$store.state.klienci" v-bind:key="klient.KL_ID">
                <input type="radio" name="klient" v-bind:value="klient.KL_ID" />
                <label for="">{{klient.KL_IMIE}} {{klient.KL_NAZWISKO}}</label>
            </div>
        </div>
        <div class="auta">
            <form>
                <label for="marka">Marka:</label>
                <input type="text" id="marka">
                <label for="model">Model:</label>
                <input type="text" id="model">
            </form>
            <button @click="wyszukaj_auto()">Wyszukaj</button>
            <div v-for="auto in this.$store.state.auta" v-bind:key="auto.AU_ID">
                <input type="radio" name="auto" v-bind:value="auto.AU_ID" />
                <label for="">{{auto.AU_MARKA}} {{auto.AU_MODEL}}</label>
            </div>
        </div>
    </div>
</div>
</template>
<script>
import { ipcRenderer } from 'electron'
export default {
    name: "Wypozycz",
    data() {
        return {
            do_wypozyczenia: [],
        }
    },
    methods: {
        wypozycz() { 
           console.log(document.querySelector('input[name="klient"]:checked').value);
            // ipcRenderer.send("wypozycz", params);
        },
        wyszukaj_klient() {
            const params = {
                imie: "",
                nazwisko: document.getElementById('nazwisko').value,
            }
            ipcRenderer.send("wyszukaj_klient", params);
            
        },
        wyszukaj_auto() {
            const params = {
                marka: document.getElementById('marka').value,
                model: document.getElementById('model').value,
            }
            ipcRenderer.send("wyszukaj_auta", params);
            
        }
    },
    mounted() {
        ipcRenderer.send("do_wyp");
    }
}
</script>
<style>
    .grid {
        display: grid;
        grid-template-columns: 50% 50%;
        grid-template-rows: 1fr;
    }
    .klienci {
        width: 50vw;
    }
</style>
