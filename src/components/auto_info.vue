<template>
    <div class="klient_info">
        <p>Marka: {{item.AU_MODEL}}</p>
        <p>Model: {{item.AU_MARKA}}</p>
        <p>Klasa: {{item.AU_KLASA}}</p>
        <p>Rocznik: {{item.AU_ROCZNIK}}</p>
        <p>Paliwo: {{item.AU_PALIWO}}</p>
        <p>Napęd: {{item.AU_NAPED}}</p>
        <p>Skrzynia biegów: {{item.AU_SKRZYNIA}}</p>
        <p>Nadwozie: {{item.AU_NADWOZIE}}</p>
        <p>Koszt (dzień): {{item.AU_KOSZT_DZIEN}}</p>
    </div>
</template>
<script>
export default {
    name: "auto_info",
    props: ["item"],
}
</script>
<style scoped>
    .klient_info{
        border: 1px solid black;
    }
</style>
