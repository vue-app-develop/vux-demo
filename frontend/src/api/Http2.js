// 基于 axios 封装的 HTTP 库
import axios from 'axios'
// import Auth from '@/auth/Auth'
// import InfoException from '@/exceptions/InfoException'
import Unauthorized from '../exceptions/Unauthorized'
import AccessDenied from '../exceptions/AccessDenied'
import NotFound from '../exceptions/NotFound'
// 基本配置
// https://github.com/axios/axios#request-config
const baseConfig = {
  timeout: 60000,
  headers: {},

  transformRequest: [(data, headers) => {
    if (typeof data === 'object') { // 如果是数组或者对象
      headers['Content-Type'] = 'application/json'
      return JSON.stringify(data)
    }

    return data
  }],
}

// 添加认证令牌
const authConfig = Object.assign({}, baseConfig)
authConfig.transformRequest.push((data, headers) => {
  // const jwtToken = Auth.getAccessToken()
  // if (jwtToken) {
  //   headers.Authorization = `Bearer ${jwtToken}`
  // }

  return data
})

export const newAxios = (config = {}) => {
  return axios.create(Object.assign({}, authConfig, config))
}

// 使用 Http.fetch('/api/xxx', {method: 'post', data: data}).then(({data, message}) => {
//   console.log(data, message)
// })
export const fetch = (url, config = {}) => {
  return newAxios()
    .request({url, method: 'get'}, config)
    .then(res => {
      if (res.data) {
        if (!res.data.ok) {
          // throw InfoException(response.data.message)
        }
        return { data: res, message: res.data.message, res }
      }

      return {}
    })
    .catch(error => {
      if (error.response) {
        if (error.response.status === 404) {
          throw NotFound('404', error.request.responseURL)
        }
        if (error.response.status === 401) {
          throw Unauthorized('认证失败')
        }
        if (error.response.status === 403) {
          throw AccessDenied('无权访问')
        }
        if (error.response.status === 500) {
          // throw InfoException(error.response.data.message)
        }
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request)
      }

      throw error
    })
}

export const post = (url,params) => {
  return axios.post(url, params);
}

export const edit = (url,params) => {
  return axios.put(url, params);
};

export const del = (url) => {
  return axios.delete(url);
}
