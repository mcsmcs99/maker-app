import { api } from 'boot/axios'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({ authUser: null, authIsAuthenticated: false }),
  getters: {
    user: (state) => state.authUser,
    isAuthenticated: (state) => state.authIsAuthenticated,
  },
  actions: {
    async loginUser(email, password) {

      const response = await api.post('/get-token', { email, password })
      if (response.data.data.code === 200) {

        const token = response.data

        // Salva o token no localStorage
        localStorage.setItem('token', token)
        if (token) {

          this.checkAuth()

        }

        return response.data.data.code

      }

      this.logoutUser()

      return response.data.data.code

    },
    async register (form) {
      try {

        const response = await api.post('/register', form )
        console.log(response)
        return { code: response.status, data: response.data.data }
        
      } catch (error) {
        console.log(error)
        return { code: error.response.status, message: error.response.data?.message }

      }
    },
    async checkAuth() {

      try {

        if (localStorage.getItem('token')) {

          api.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('token')}`
          console.log(localStorage.getItem('token'))
          const response = await api.get('/user') // Endpoint para obter os dados do usuário
          this.authUser = response.data
          this.authIsAuthenticated = true

        } else {

          this.authIsAuthenticated = false
          this.authUser = null

        }

      } catch (error) {

        this.authIsAuthenticated = false
        this.authUser = null
        this.logoutUser()

      }

    },
    async logoutUser() {

      localStorage.removeItem('token')
      this.authIsAuthenticated = false
      this.authUser = null

    },
  },
})
