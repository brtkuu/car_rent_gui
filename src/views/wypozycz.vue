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
    <button @click="wypozycz()">Wypozycz</button>
</div>
</template>
<script>
import { ipcRenderer } from 'electron'
export default {
    name: "Wypozycz",
    methods: {
        wypozycz() { 
            const data = new Date();

            const params = {
                klient_id: document.querySelector('input[name="klient"]:checked').value, 
                auto_id: document.querySelector('input[name="auto"]:checked').value,
                data_wyp: `${data.getFullYear()}-${data.getMonth()+1}-${data.getDate()}`,
            }

            ipcRenderer.send("wypozycz", params);
            location.reload();
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
                dostepnosc: "T",
            }
            ipcRenderer.send("wyszukaj_auta", params);
        }
    },
    mounted() {
        const params = {
                marka: "",
                model: "",
                dostepnosc: "T",
            }
        ipcRenderer.send("wyszukaj_auta", params);
        ipcRenderer.send("klienci");
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
