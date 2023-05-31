<template>
  <form @submit.prevent="submit">
    <p hidden><v-text-field name="username" autocomplete="username" readonly></v-text-field></p>
    <v-text-field
      name="current_password"
      label="Conraseña Actual"
      v-model="current_password"
      :type="show1 ? 'text' : 'password'"
      autocomplete="current-password"
      :append-inner-icon="show1 ? 'mdi-eye-off' : 'mdi-eye'"
      @click:append-inner="show1 = !show1"
    ></v-text-field>
    <v-text-field
      name="new_passsword"
      label="Nueva Contraseña"
      v-model="new_passsword"
      :type="show2 ? 'text' : 'password'"
      autocomplete="new-password"
      :append-inner-icon="show2 ? 'mdi-eye-off' : 'mdi-eye'"
      @click:append-inner="show2 = !show2"
    ></v-text-field>
    <v-text-field
      name="confirmation_password"
      label="Confirmar Nueva Contraseña"
      v-model="confirmation_password"
      :type="show3 ? 'text' : 'password'"
      autocomplete="new-password"
      :append-inner-icon="show3 ? 'mdi-eye-off' : 'mdi-eye'"
      @click:append-inner="show3 = !show3"
    ></v-text-field>
    <div class="text-center py-4">
      <v-btn block size="large" class="me-4" type="submit">
        Cambiar Contraseña
      </v-btn>
    </div>
  </form>
</template>

<script setup>
import { ref } from "vue";
const current_password = ref("");
const new_passsword = ref("");
const confirmation_password = ref("");
const show1 = ref(false);
const show2 = ref(false);
const show3 = ref(false);
</script>
