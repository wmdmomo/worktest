import axios from 'axios'
import {Message} from 'element-ui'

axios.interceptors.request.use(config => {
  return config
}, error => {
  Message.error({message: '请求超时!'})
  console.log('request error ' + error)
})
axios.interceptors.response.use(data => {
  if (data.status && data.status === 200 && (data.data.code === 1 || data.data.code === -1)) {
    Message.error({message: data.data.msg})
    if (data.data.code === -1) {
      location.href = '/'
    }
    return
  }
  if (data.data.msg) {
    Message.success({message: data.data.msg})
  }
  return data.data
}, err => {
  if (err.response.status === 504 || err.response.status === 404) {
    Message.error({message: '服务器错误'})
  } else if (err.response.status === 403) {
    Message.error({message: '权限不足,请联系管理员!'})
  } else if (err.response.status === 401) {
    Message.error({message: err.response.data.msg})
  } else {
    if (err.response.data.msg) {
      Message.error({message: err.response.data.msg})
    } else {
      Message.error({message: '未知错误!'})
    }
  }
})
let base = ''
export const postRequest = (url, params) => {
  return axios({
    method: 'post',
    url: `${base}${url}`,
    data: params,
    transformRequest: [function (data) {
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}
export const getRequest = (url) => {
  return axios({
    method: 'get',
    url: `${base}${url}`
  })
}
