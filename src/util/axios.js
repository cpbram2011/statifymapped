import axios from 'axios'


axios.interceptors.response.use( response => {
  return response;
}, error => {
  console.log('err', error)
  return Promise.reject(error);
})



export default axios