<template>
    <div>
        <ul>
            <li v-for="item in wypozyczenia" v-bind:key="item.WY_ID">   
                {{item.KL_IMIE}} {{item.KL_NAZWISKO}} - {{item.AU_MARKA}} {{item.AU_MODEL}}
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
        }
    },
    mounted() {
        ipcRenderer.on("wypozyczenia", (event, data)=>{
            this.wypozyczenia = data;
            this.$forceUpdate();
        })
        ipcRenderer.send("wypozyczenia");
    }
}
</script>
<style scoped>

</style>
