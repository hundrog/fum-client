<template>
  <v-row align="center" justify="center" style="height: 100vh">
    <v-col cols="4">
      <div align="center">
        <v-img aspect-ratio="1" width="150" src="cedis-logo.png" />
      </div>
      <form @submit.prevent="submit">
        <v-text-field
          name="email"
          label="email"
          v-model="email.value.value"
          :error-messages="email.errorMessage.value"
        ></v-text-field>

        <v-text-field
          name="password"
          label="password"
          type="password"
          v-model="password.value.value"
          :error-messages="password.errorMessage.value"
        ></v-text-field>

        <div class="text-center py-4">
          <v-btn class="me-4" type="submit"> Conectar </v-btn>
        </div>
      </form>
    </v-col>
  </v-row>
</template>

<script setup>
definePageMeta({
  layout: "blank",
});

const token = useCookie("token");
const { handleSubmit, setFieldError } = useForm({
  validationSchema: {
    email(value) {
      if (/\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/i.test(value)) return true;

      return "El email es invalido";
    },
    password(value) {
      if (value?.length > 0) return true;

      return "Introduzca su contraseña";
    },
  },
});
const email = useField("email");
const password = useField("password");

const submit = handleSubmit(async (values) => {
  const { data, pending, error } = await logIn(values)
  console.log(error)
  if(error.value) {
    setFieldError('email', " ");
    setFieldError('password', error.value.data.error);
  } else if(data.value) {
    token.value = data.value.token;
    navigateTo('/');
  }
});

async function logIn(values) {
  const { data, pending, error } = await useFetch(
    "http://localhost:8080/api/users/sign_in",
    {
      method: "POST",
      body: { user: { ...values } },
    }
  );

  return { data, pending, error };
}
</script>
