/**
 * @jest-environment node
 */
import fetch from 'cross-fetch'
import serverPromise from '../../utils/test-server'

let httpServer
let port

describe('oidc module - openid-configuration endpoint tests', () => {
  beforeAll(async () => {
    jest.setTimeout(15000)
    httpServer = await serverPromise
    port = httpServer.address().port
  })

  afterAll(async () => {
    httpServer.close()
  })

  test('should return 200 - https; proxied', async () => {
    const res = await fetch(`http://localhost:${port}/api/oidc/.well-known/openid-configuration`, {
      headers: {
        host: 'iam.example.com',
        'x-real-ip': '203.0.113.195',
        'x-forwarded-for': '203.0.113.195, 70.41.3.18, 150.172.238.178',
        'x-forwarded-proto': 'https'
      }
    })

    expect(res.status).toEqual(200)
    const json = await res.json()
    expect(json.issuer).toEqual('https://iam.example.com/api/oidc')
    expect(json.authorization_endpoint).toEqual('https://iam.example.com/api/oidc/auth')
    expect(json.token_endpoint).toEqual('https://iam.example.com/api/oidc/token')
  })
})
