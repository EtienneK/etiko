import config from 'config'
import { Provider } from 'oidc-provider'

import SequelizeAdapter from './adapters/sequelize'
import configuration from './configuration'

const { protocol, host, proxy } = config.get('server')
const provider = new Provider(`${protocol}://${host}/api/oidc`, configuration)
provider.proxy = proxy === true

let initialized = false
export default async function oidc () {
  if (!initialized) {
    await SequelizeAdapter.connect()
    initialized = true
  }
  return provider
}
