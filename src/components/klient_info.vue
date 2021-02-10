<template>
    <div class="klient_info">
        <h2>Dane klienta</h2>
        <p>Imie: {{item.KL_IMIE}}</p>
        <p>Nazwisko: {{item.KL_NAZWISKO}}</p>
        <p>NIP: {{item.KL_NIP}}</p>
        <p>Tel: {{item.KL_TEL}}</p>
        <p>Adres: {{item.AD_UL}} {{item.AD_NR_DOMU}} {{item.AD_KOD_POCZTOWY}} {{item.AD_MIEJSCOWOSC}}</p>
    </div>
   
</template>
<script>
import { ipcRenderer } from 'electron'
export default {
    name: "Klient_info",
    props: ["item"],
    data() {
        return {
            dostepne_auta: [],
            wypozyczone: [],
        }
    },
    methods: {
        wypozycz(klient, auto) {
            const params = {
                klient,
                auto,
                start: `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}`,
                zwrot: document.getElementById('zwrot').value,
            }

        }
    }
}
</script>
<style scoped>
    .klient_info{
        border: 1px solid black;
    }
</style>
