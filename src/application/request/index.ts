import { header } from '@config/config'
import exchange from './exchange'

class Request {
  get(url: string, data = {}) {
    return exchange.fetch({ url, data: { data, header }, method: 'GET' })
  }

  post(url: string, data = {}) {
    return exchange.fetch({ header: { 'content-type': 'application/json' }, url, data: { data, header }, method: 'POST' })
  }
}

const request = new Request()

request.post('https://api-beta.heywoof.com/user/client/status', {})

export default request
