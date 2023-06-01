import axios from "@/plugins/axios"
import { defineStore } from "pinia"
import router from '@/router'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    authUser: null,
    errors: null,
  }),

  getters: {
    loggedIn: state => !!state.authUser,
    user: state => state.authUser,
  },

  actions: {
    async getToken() {
      await axios.get('/sanctum/csrf-cookie')
    },

    async getAuthUser() {
      try {
        const response = await axios.get('/api/user')

        this.authUser = response.data

        return response
      } catch (error) {
        console.warn({ error })

        return error
      }
    },

    async login(payload) {
      try {
        await axios.post('/login', payload)

        return await this.getAuthUser()
      } catch (error) {
        console.warn({ error })

        return error
      }
    },

    async logout() {
      try {
        await axios.post('/logout')

        this.authUser = null

        router.push({ name: "login" })
      } catch (error) {
        console.warn({ error })

        this.authUser = null

        return error
      }
    },
  },
})
