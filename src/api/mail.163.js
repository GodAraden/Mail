import axios from "axios"

export function login (data) {
  return axios({
    url: 'api/163/login/',
    method: 'POST',
    data
  })
}

export function logout (data) {
  return axios({
    url: 'api/163/logout/',
    method: 'POST',
    data
  })
}

export function checkSession (data) {
  return axios({
    url: 'api/163/checkSession/',
    method: 'POST',
    data
  })
}

export function sendMail (data) {
  return axios({
    url: 'api/163/send/',
    method: 'POST',
    data
  })
}

export function getMails (data = {}) {
  return axios({
    url: 'api/163/get/',
    method: 'POST',
    data
  })
}
