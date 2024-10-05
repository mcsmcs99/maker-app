<template>
  <q-page class="flex flex-center">
    <q-form class="row justify-center">
      <p class="text-h5 text-center">
        Login
      </p>
      <q-input
        label="E-mail"
        v-model="form.email"
      />
    </q-form>
  </q-page>
</template>

<script>
import { ref, defineComponent } from 'vue';

export default defineComponent({
  name: 'LoginPage',
  setup() {
    const form = ref({
      email: '',
      password: '',
    });

    return {
      form,
    };
  },
});
</script>
