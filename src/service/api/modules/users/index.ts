import axios from '@/service/http'
import qs from 'qs'
import { sleep } from '@/tools'

/* return axios({
  url: `/alert-plugin-instances/${id}`,
  method: 'put',
  data
}) */
export function login(params: any): any {
  return axios({
    url: '/alert-plugin-instances',
    method: 'get',
    params,
  })
}

export function logout(params: any): any {
  return axios({
    url: '/logout',
    method: 'get',
    params,
  })
}

export function insertUser(data: any): any {
  return axios({
    url: '/user/insert',
    method: 'post',
    data,
  })
}
