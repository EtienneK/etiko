/**
 * @jest-environment node
 */

import { testApiHandler } from 'next-test-api-route-handler'
import handler from '../../../../../src/pages/api/oidc/[...]'

describe('Integrations tests for health endpoint', () => {
  test('/.well-known/openid-configuration should return 200', async () => {
    expect.hasAssertions()

    await testApiHandler({
      requestPatcher: (req) => (req.url = '/api/oidc/.well-known/openid-configuration'),
      handler,
      test: async ({ fetch }) => {
        const res = await fetch({
          headers: {
            host: 'www.example.com',
            'x-real-ip': '203.0.113.195',
            'x-forwarded-for': '203.0.113.195, 70.41.3.18, 150.172.238.178',
            'x-forwarded-proto': 'https'
          }
        })
        expect((await res.json()).issuer).toEqual('https://www.example.com/api/oidc')
      }
    })
  })
})
