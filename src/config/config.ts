// import { user } from '../http/urls'

// export const appInfo = {
//   channel: 15,
//   version: '0.9.0',
// }

export const header = {
  authToken: '',
  channel: '15',
  client: '15',
  deviceType: '',
  transactionId: '',
}

export const getTokenOption = (code: string) => ({
  header: { 'content-type': 'application/json' },
  url: '',
  data: { header, data: { code, channel: 15 } },
  method: 'POST',
})
