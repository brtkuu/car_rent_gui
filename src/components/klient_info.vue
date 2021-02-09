<template>
    <div class="klient_info">
        <p>Imie: {{item.KL_IMIE}}</p>
        <p>Nazwisko: {{item.KL_NAZWISKO}}</p>
        <p>NIP: {{item.KL_NIP}}</p>
        <p>Tel: {{item.KL_TEL}}</p>
        <p>Adres: {{item.AD_UL}} {{item.AD_NR_DOMU}} {{item.AD_KOD_POCZTOWY}} {{item.AD_MIEJSCOWOSC}}</p>
    </div>
</template>
<script>
export default {
    name: "Klient_info",
    props: ["item"],
}
</script>
<style scoped>
    .klient_info{
        border: 1px solid black;
    }
</style>
