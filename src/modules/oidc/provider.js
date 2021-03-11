import { Provider } from 'oidc-provider'

import SequelizeAdapter from './adapters/sequelize'
import configuration from './configuration'

const provider = new Provider(`${process.env.PROTOCOL}://${process.env.HOST}/api/oidc`, configuration)
provider.proxy = process.env.PROXY === 'true'

let initialized = false
export default async function oidc () {
  if (!initialized) {
    await SequelizeAdapter.connect()
    initialized = true
  }
  return provider
}
