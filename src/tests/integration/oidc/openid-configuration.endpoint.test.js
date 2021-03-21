/**
 * @jest-environment node
 */
import fetch from 'cross-fetch'

describe('oidc module - openid-configuration endpoint tests', () => {
  test('should return 200 - https; proxied', async () => {
    const res = await fetch('http://localhost:3000/api/oidc/.well-known/openid-configuration')
    expect(res.status).toEqual(200)
    const json = await res.json()
    expect(json.issuer).toEqual('http://localhost:3000/api/oidc')
    expect(json.authorization_endpoint).toEqual('http://localhost:3000/api/oidc/auth')
    expect(json.token_endpoint).toEqual('http://localhost:3000/api/oidc/token')
  })
})
