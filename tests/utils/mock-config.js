import _ from 'lodash'

const defaultTestConfig = {
  server: {
    protocol: 'https',
    host: 'iam.example.com',
    proxy: true
  },
  db: {
    uri: 'sqlite::memory:'
  }
}

export default function mockConfig (toMerge) {
  return {
    get: (s) => {
      return _.merge(defaultTestConfig, toMerge)[s]
    }
  }
}
