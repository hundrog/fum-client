<template>
  <form @submit.prevent="submit">
    <v-row>
      <v-col sm="12" md="6">
        <v-text-field
          model-value="Cambio de puesto"
          label="Tipo de movimiento"
          readonly
        ></v-text-field>

        <v-textarea
          v-model="justification.value.value"
          :counter="50"
          :error-messages="justification.errorMessage.value"
          label="Justificacion"
        ></v-textarea>
      </v-col>

      <v-col sm="12" md="6">
        <v-radio-group
          v-model="duration.value.value"
          :error-messages="duration.errorMessage.value"
          inline
          label="Motivo del cambio"
        >
          <v-radio label="Temporal" value="temporal" color="primary"></v-radio>
          <v-radio
            label="Permanente"
            value="permanent"
            color="primary"
          ></v-radio>
        </v-radio-group>

        <v-checkbox
          v-model="training.value.value"
          label="¿Solicita Entrenamiento?"
          color="primary"
        ></v-checkbox>

        <v-checkbox
          v-model="jobPosting.value.value"
          label="¿Solicitud a travez de JobPosting?"
          color="primary"
        ></v-checkbox>
      </v-col>
    </v-row>

    <div class="pb-4">
      <v-divider></v-divider>
    </div>

    <v-row>
      <v-col sm="12" md="6">
        <v-text-field
          v-model="name.value.value"
          :counter="10"
          :error-messages="name.errorMessage.value"
          label="Nombre de empleado"
        ></v-text-field>
      </v-col>

      <v-col sm="12" md="6">
        <v-text-field
          v-model="phone.value.value"
          :counter="7"
          :error-messages="phone.errorMessage.value"
          label="Numero de empleado"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col sm="12" md="6">
        <VueDatePicker
          v-model="date_start.value.value"
          :max-date="new Date()"
          :enable-time-picker="false"
          auto-apply
          :format="formatDate"
          locale="es"
          week-start="0"
        >
          <template #trigger>
            <v-text-field
              label="Fecha de creación"
              :model-value="formatDate(date_start.value.value)"
              :error-messages="date_start.errorMessage.value"
            />
          </template>
        </VueDatePicker>
      </v-col>

      <v-col sm="12" md="6" >
        <VueDatePicker
          v-model="date_end.value.value"
          :min-date="new Date()"
          :enable-time-picker="false"
          auto-apply
          :format="formatDate"
          locale="es"
          week-start="0"
          v-if="duration.value.value === 'temporal'"
        >
          <template #trigger>
            <v-text-field
              label="Fecha fin"
              :model-value="formatDate(date_end.value.value)"
              :error-messages="date_end.errorMessage.value"
            />
          </template>
        </VueDatePicker>
        <v-text-field v-else readonly></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col sm="12" md="6">
        <v-combobox
          v-model="current_position.value.value"
          :items="positions"
          :error-messages="current_position.errorMessage.value"
          label="Puesto actual"
        ></v-combobox>
      </v-col>

      <v-col sm="12" md="6">
        <v-combobox
          v-model="new_position.value.value"
          :items="positions"
          :error-messages="new_position.errorMessage.value"
          label="Puesto a ocupar"
        ></v-combobox>
      </v-col>
    </v-row>

    <v-row>
    <v-col sm="12" md="6">
      <v-select
          v-model="current_boss.value.value"
          :items="persons"
          :error-messages="current_boss.errorMessage.value"
          multiple
          label="Jefe actual"
        ></v-select>
    </v-col>

    <v-col sm="12" md="6">
      <v-select
          v-model="vacant_boss.value.value"
          :items="persons"
          :error-messages="vacant_boss.errorMessage.value"
          multiple
          label="Jefe de la vacante"
        ></v-select>
    </v-col>
  </v-row>

    <v-row>
      <v-col sm="12" md="6">
      <v-select
          v-model="vacant_coordinator.value.value"
          :items="persons"
          :error-messages="vacant_coordinator.errorMessage.value"
          multiple
          label="Jefe coordinador de la vacante"
        ></v-select>
    </v-col>
    <v-col sm="12" md="6">
        <v-select
          v-model="notify.value.value"
          :items="persons"
          :error-messages="notify.errorMessage.value"
          multiple
          label="Notificar a"
        ></v-select>
      </v-col>
    </v-row>

    <div class="text-right py-4">
      <v-btn class="me-4" type="submit"> guardar </v-btn>
    </div>
  </form>
</template>

<script setup>
import { ref } from "vue";
import { useField, useForm } from "vee-validate";
import { format } from "date-fns";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

const formatDate = (date) => {
  return date === undefined ? "" : format(date, "dd/MM/yyyy");
};
const { handleSubmit } = useForm({
  validationSchema: {
    name(value) {
      if (value?.length >= 2) return true;

      return "El nombre de empleado debe ser minimo 2 caractéres";
    },
    justification(value) {
      if (value?.length >= 10) return true;

      return "La justificación debe ser minimo 10 caractéres";
    },
    phone(value) {
      if (value?.length > 2 && /[0-9-]+/.test(value)) return true;

      return "El numero de empleado es necesario";
    },
    current_position(value) {
      if (value) return true;

      return "Selecciona una opción";
    },
    new_position(value) {
      if (value) return true;

      return "Selecciona una opción";
    },
    duration(value) {
      if (value === "temporal" || value === "permanent") return true;

      return "Selecciona una opción";
    },
    training() {
      return true;
    },
    jobPosting() {
      return true;
    },
    notify(value) {
      if (value) return true;

      return "Selecciona al menos una opción";
    },
    date_start(value) {
      console.log(duration.value.value)
      if (value) return true;

      return "La fecha es requerida";
    },
    date_end(value) {
      if (duration.value.value === "permanent" || (duration.value.value === "temporal" && value)) return true;

      return "La fecha es requerida";
    },
    current_boss(value) {
      if (value) return true;

      return "Selecciona una opción";
    },
    vacant_boss(value) {
      if (value) return true;

      return "Selecciona una opción";
    },
    vacant_coordinator(value) {
      if (value) return true;

      return "Selecciona una opción";
    },
  },
});
const name = useField("name");
const phone = useField("phone");
const current_position = useField("current_position");
const new_position = useField("new_position");
const duration = useField("duration");
const training = useField("training");
const jobPosting = useField("jobPosting");
const justification = useField("justification");
const notify = useField("notify");
const date_start = useField("date_start");
const date_end = useField("date_end");
const current_boss = useField("current_boss");
const vacant_boss = useField("vacant_boss");
const vacant_coordinator = useField("vacant_coordinator");

const positions = ref(["Puesto 1", "Puesto 2", "Puesto 3", "Puesto 4"]);
const persons = ref(["Persona 1", "Persona 2", "Persona 3", "Persona 4"]);

const submit = handleSubmit((values) => {
  alert(JSON.stringify(values, null, 2));
});
</script>

<style lang="scss">
.action-row {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}
</style>
