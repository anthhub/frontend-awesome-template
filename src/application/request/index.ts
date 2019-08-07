import { header } from '@config/config'
import exchange from './exchange'

class Request {
  async get(url: string, data = {}) {
    const rs = await exchange.fetch({ url, data: { data, header }, method: 'GET' })
    return rs.data
  }

  async post(url: string, data = {}) {
    const rs = await exchange.fetch({ url, header: { 'content-type': 'application/json' }, data: { data, header }, method: 'POST' })
    return rs.data
  }
}

const request = new Request()

request.post('https://api-beta.heywoof.com/user/client/status', {
  data: { channel: 15, version: '1.1.0' },
  header: {
    authToken:
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJoYXNCaW5kUGhvbmUiOjEsImV4cCI6MTU3Mjc3NDEwNywidXNlcklkIjoiMjA1NTM3ODk4MDc5ODE5NDI0IiwiY2hhbm5lbElkIjoxNX0.CNPxHeA-e78Y1ek57cSJQZrwclAz1NoLukWuHjicHhw',
    channel: 15,
    client: 15,
    deviceType: '',
    transactionId: 'A781515A2B',
  },
})

export default request
