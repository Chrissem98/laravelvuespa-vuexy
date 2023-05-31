import axios from 'axios'
import router from '@/router'

const axiosIns = axios.create({
// You can add your headers here
// ================================
// baseURL: 'https://some-domain.com/api/',
// timeout: 1000,
// headers: {'X-Custom-Header': 'foobar'}
  headers: {
    "X-Requested-With": "XMLHttpRequest",
  },
  withCredentials: true, // required to handle the CSRF token
})

// ℹ️ Add response interceptor to handle 401 response
axiosIns.interceptors.response.use(response => {
  return response
}, error => {
  // Handle error
  if (error.response && [401, 419].includes(error.response.status)) {
    // // ℹ️ Logout user and redirect to login page
    // // Remove "userData" from localStorage
    // localStorage.removeItem('userData')

    // // Remove "accessToken" from localStorage
    // localStorage.removeItem('accessToken')
    // localStorage.removeItem('userAbilities')

    // // If 401 response returned from api
    // router.push('/login')

    console.info("[401, 419]: User not authorized, login failed with API")
  }
  else {
    return Promise.reject(error)
  }
})
export default axiosIns
