<template>
  <v-container>
    <v-table fixed-header height="80vh">
      <thead>
        <tr>
          <th class="text-left">De</th>
          <th class="text-left">Para</th>
          <th class="text-left">FUM de</th>
          <th class="text-left">Mensaje</th>
          <th class="text-left"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in notifications" :key="item.id">
          <td>{{ item.from }}</td>
          <td>{{ item.to }}</td>
          <td>{{ item.employee }}</td>
          <td>{{ item.message }}</td>
          <td><v-btn
        class="ma-2"
        variant="text"
        icon="mdi-eye-outline"
      ></v-btn></td>
        </tr>
      </tbody>
    </v-table>
  </v-container>
</template>

<script setup>
const notifications = [
  { id: 1, from: "Monse", to: "Diana", employee: "Julion Alvarez", message: "Consectetur quis officia in tempor." },
  { id: 2, from: "Diana", to: "Diana", employee: "Christian Talavera", message: "Ut qui ad ut est dolor officia amet." },
  { id: 3, from: "Eli", to: "Diana", employee: "Alejandra Martinez", message: "Qui consequat tempor reprehenderit deserunt commodo." },
  { id: 4, from: "Monse", to: "Eli", employee: "Federico Lomelier", message: "Adipisicing quis minim excepteur duis enim eu fugiat." },
  { id: 5, from: "Cesar", to: "Monse", employee: "Tabatah Ledezma", message: "Ad duis do irure qui irure enim velit ut tempor." },
  { id: 6, from: "Monse", to: "Eli", employee: "Tania LIbertad", message: "Culpa proident laborum amet incididunt magna." },
];
</script>
