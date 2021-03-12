/**
 * @jest-environment node
 */

import { testApiHandler } from 'next-test-api-route-handler'
import mockConfig from '../../../../utils/mock-config'

describe('Integrations tests for health endpoint', () => {
  beforeEach(() => {
    jest.resetModules()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('/.well-known/openid-configuration should return 200 - https; proxied', async () => {
    jest.mock('config', () => mockConfig())
    const handler = require('../../../../../src/pages/api/oidc/[...]')

    expect.hasAssertions()

    await testApiHandler({
      requestPatcher: (req) => (req.url = '/api/oidc/.well-known/openid-configuration'),
      handler,
      test: async ({ fetch }) => {
        const res = await fetch({
          headers: {
            host: 'iam.example.com',
            'x-real-ip': '203.0.113.195',
            'x-forwarded-for': '203.0.113.195, 70.41.3.18, 150.172.238.178',
            'x-forwarded-proto': 'https'
          }
        })
        const json = await res.json()
        expect(json.issuer).toEqual('https://iam.example.com/api/oidc')
        expect(json.authorization_endpoint).toEqual('https://iam.example.com/api/oidc/auth')
        expect(json.token_endpoint).toEqual('https://iam.example.com/api/oidc/token')
      }
    })
  })

  test('/.well-known/openid-configuration should return 200 - http; not proxied', async () => {
    jest.mock('config', () => mockConfig({ server: { host: 'example.org', protocol: 'http', proxy: false } }))
    const handler = require('../../../../../src/pages/api/oidc/[...]')

    expect.hasAssertions()

    await testApiHandler({
      requestPatcher: (req) => (req.url = '/api/oidc/.well-known/openid-configuration'),
      handler,
      test: async ({ fetch }) => {
        const res = await fetch({
          headers: {
            host: 'example.org'
          }
        })
        const json = await res.json()
        expect(json.issuer).toEqual('http://example.org/api/oidc')
        expect(json.authorization_endpoint).toEqual('http://example.org/api/oidc/auth')
        expect(json.token_endpoint).toEqual('http://example.org/api/oidc/token')
      }
    })
  })
})
