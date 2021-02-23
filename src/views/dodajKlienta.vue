<template>
<div>
    <form>
        <p><label for="imie">Imie: </label>
        <input type="text" id="imie" required></p>
        <p><label for="nazwisko">Nazwisko: </label>
        <input type="text" id="naziwsko" required></p>
        <p><label for="pesel">PESEL: </label>
        <input type="text" id="pesel" required></p>
        <p><label for="tel">Tel: </label>
        <input type="text" id="tel" required></p>
        <p><label for="NIP">NIP</label>
        <input type="text" id="NIP"></p>
        <p><label for="ulica">Ulica: </label>
        <input type="text" id="ulica" required></p>
        <p><label for="nr_domu">Nr domu: </label>
        <input type="text" id="nr_domu" required></p>
        <p><label for="kod_pocztowy">Kod pocztowy: </label>
        <input type="text" id="kod_pocztowy" required></p>
        <p><label for="miejscowosc">Miejscowosc: </label>
        <input type="text" id="miejscowosc" required></p>
    </form>
    <button @click="dodajKlienta()">Dodaj</button>
</div>
</template>
<script>
import {ipcRenderer} from "electron";

export default {
    name: "dodaj_klienta",
    methods: {
        dodajKlienta() {
            const params = {
                imie: document.getElementById('imie').value,
                nazwisko: document.getElementById('naziwsko').value,
                pesel: document.getElementById('pesel').value,
                tel: document.getElementById('tel').value,
                nip: document.getElementById("NIP").value,
                ulica: document.getElementById("ulica").value,
                nr_domu: document.getElementById("nr_domu").value,
                kod_pocztowy: document.getElementById("kod_pocztowy").value,
                miejscowosc: document.getElementById("miejscowosc").value
            }

            ipcRenderer.send("dodaj_klienta", params);
        }
    }
}
</script>
