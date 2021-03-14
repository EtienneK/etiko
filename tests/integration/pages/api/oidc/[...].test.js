/**
 * @jest-environment node
 */
import fetch from 'cross-fetch'
import serverPromise from '../../../../utils/test-server'
import mockConfig from '../../../../utils/mock-config'

let httpServer
let port

describe('Integrations tests for oidc module', () => {
  beforeAll(async () => {
    jest.setTimeout(15000)
    httpServer = await serverPromise
    port = httpServer.address().port
  })

  beforeEach(() => {
    jest.resetModules()
  })

  afterAll(async () => {
    httpServer.close()
  })

  test('/.well-known/openid-configuration should return 200 - https; proxied', async () => {
    jest.mock('config', () => mockConfig())

    const res = await fetch(`http://localhost:${port}/api/oidc/.well-known/openid-configuration`, {
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
  })

  test('/.well-known/openid-configuration should return 200 - http; non-proxied', async () => {
    jest.mock('config', () => mockConfig({ server: { host: 'localhost:3001', protocol: 'http', proxy: false } }))

    const res = await fetch(`http://localhost:${port}/api/oidc/.well-known/openid-configuration`)

    const json = await res.json()
    expect(json.issuer).toEqual(`http://localhost:${port}/api/oidc`)
    expect(json.authorization_endpoint).toEqual(`http://localhost:${port}/api/oidc/auth`)
    expect(json.token_endpoint).toEqual(`http://localhost:${port}/api/oidc/token`)
  })
})
