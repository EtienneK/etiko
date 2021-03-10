import { Provider } from 'oidc-provider';

import SequelizeAdapter from './adapters/sequelize';
import configuration from './configuration';

const provider = new Provider('http://localhost:3000/api/oidc', configuration);

let initialized = false;
export default async function oidc() {
  if (!initialized) {
    await SequelizeAdapter.connect();
    initialized = true;
  }

  return provider;
}
