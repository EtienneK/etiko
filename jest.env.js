// Temp fix for this issue: https://github.com/vercel/next.js/issues/17903

import { loadEnvConfig } from '@next/env'
import { resolve } from 'path'

export default async () => {
  const envFile = resolve(__dirname, '.')
  loadEnvConfig(envFile)
}
