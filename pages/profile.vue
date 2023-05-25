<template>
  <v-row justify="center">
    <v-col cols="6">
      <v-card style="min-height: 50vh">
        <v-tabs v-model="tab" color="primary" grow>
          <v-tab value="0">Detalles</v-tab>
          <v-tab value="1">Cambiar Contraseña</v-tab>
        </v-tabs>
        <v-card-title>
          <h2>{{ user.name }}</h2>
        </v-card-title>
        <v-card-text>
          <v-window v-model="tab">
            <v-window-item value="0"> <ProfileDetails /> </v-window-item>

            <v-window-item value="1"> <ProfileChangePassword /> </v-window-item>
          </v-window>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup>
import { ref } from "vue";
const user = useCookie("user").value;
const tab = ref();
</script>
