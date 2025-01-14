<template>
  <q-page>
    <q-form @submit.prevent="handleLogin">
      <q-input v-model="form.email" label="Email" />
      <q-input v-model="form.password" label="Password" type="password" />
      <q-btn type="submit" label="Login" />
      <q-btn @click="handleGotoCreateAccount" label="Criar conta" />
    </q-form>
  </q-page>
</template>

<script>
import { ref } from 'vue'
import { useGotoRouter } from 'src/utils/goToRouter'
import { useAuthStore } from '../stores/auth'

export default {
  setup() {

    const authStore = useAuthStore()
    const { handleGotoDashboard, handleGotoCreateAccount } = useGotoRouter()

    const form = ref({ email: '', password: '' })
    const handleLogin = async () => {

      try {

        const status = await authStore.loginUser(form.value.email, form.value.password)
        if (status === 200) {

          handleGotoDashboard()

        } else if (status === 401) {

          alert('E-mail ou senha incorretos!')

        } else {

          alert('Erro ao fazer o login!')

        }

      } catch (error) {

        console.error('Erro ao fazer login:', error)

      }

    }

    return { form, handleLogin, handleGotoCreateAccount }

  },
}
</script>
