<template>   
    <v-menu
        ref="menu"
        :close-on-content-click="false"
        v-model="menu2"
        :nudge-right="40"
        :return-value.sync="time"
        lazy
        transition="scale-transition"
        offset-y
        full-width
        max-width="290px"
        min-width="290px"
    >
        <v-text-field
        slot="activator"
        v-model="time"
        label="HH:MM"
        prepend-icon="access_time"
        readonly
        ></v-text-field>
        <v-time-picker v-model="time" @change="$refs.menu.save(time)"></v-time-picker>
    </v-menu>
</template>

<script>
    export default {
        data: () => ({
            menu2: false,
            time: null
        })
    }

</script>

<style>
</style>