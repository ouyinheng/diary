import axios from 'axios'

const http = axios.create()
// http request 拦截器
// 每次请求都为http头增加Authorization字段，其内容为Token
http.interceptors.request.use(
  config => {
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.common['Authorization'] = token;
    // }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// http response 拦截器
http.interceptors.response.use(res => {
    let data = res.data
    if (res.status === 200) {
        return res.data
    }
    return Promise.reject(res.data)
}, error => {
    return Promise.reject(error)
})

export default http