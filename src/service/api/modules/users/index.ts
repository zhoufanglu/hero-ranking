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

export function delUser(data: any): any {
  return axios({
    url: '/user/delete',
    method: 'post',
    data,
  })
}

export function getUsers(params: any): any {
  return axios({
    url: '/user/list',
    method: 'get',
    params,
  })
}

export function insertRecord(data: { userId: string; createAt: string }): any {
  return axios({
    url: '/record/insert',
    method: 'post',
    data,
  })
}

export function delRecord(data: { id: string }): any {
  return axios({
    url: '/record/delete',
    method: 'post',
    data,
  })
}
