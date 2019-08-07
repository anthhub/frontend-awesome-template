import { header } from '@config/config'
import exchange from './exchange'

const a = []

class Request {
  get(url: string, data = {}) {
    return exchange.fetch({ url, data: { data, header }, method: 'GET' })
  }

  post(url: string, data = {}) {
    return exchange.fetch({ url, header: { 'content-type': 'application/json' }, data: { data, header }, method: 'POST' })
  }
}

const request = new Request()

async function aaa() {
  try {
    const rs = await request.post('https://api-beta.heywoof.com/user/client/status', {
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
    console.log('%c%s', 'color: #20bd08;font-size:15px', '===TQY===: rs', rs)
  } catch (error) {
    console.log('%c%s', 'color: #20bd08;font-size:15px', '===TQY===: error', error)
  }
}

aaa()

export default request
