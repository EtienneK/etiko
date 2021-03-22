import puppeteer from 'puppeteer'
import fetch from 'cross-fetch'
import crypto from 'crypto'
import base64url from 'base64url'

describe('oidc module - login tests', () => {
  let browser

  beforeAll(async () => {
    // browser = await puppeteer.launch()
  })

  afterAll(async () => {
    await browser.close()
  })

  test('should authenticate a user successfully', async () => {
    browser = await puppeteer.launch()
    const page = await browser.newPage()
    const authUrl = new AuthUrl()

    await page.goto(authUrl.url)
    await page.type('input[name="email"]', 'user@example.com')
    await page.type('input[name="password"]', 'test_p455w0rd!')
    await page.click('input[type="submit"]')

    await page.waitForNavigation()
    await page.click('button[type="submit"]')

    const res = await page.waitForNavigation()

    const code = new URL(res.url()).searchParams.get('code')

    expect(code).toBeDefined()

    const tokenBody = new URLSearchParams()
    tokenBody.append('grant_type', 'authorization_code')
    tokenBody.append('code', code)
    tokenBody.append('redirect_uri', authUrl.options.redirectUri)
    tokenBody.append('code_verifier', authUrl.options.codeVerifier)

    const tokenRes = await fetch('http://localhost:3000/api/oidc/token', {
      method: 'post',
      body: tokenBody,
      headers: {
        Authorization: `Basic ${Buffer.from(authUrl.options.clientId + ':' + 'super_secret_client_secret').toString('base64')}`
      }
    })

    const tokenResBody = await tokenRes.json()
    expect(tokenResBody.access_token).toBeDefined()
    expect(tokenResBody.id_token).toBeDefined()
  })
})

class AuthUrl {
  constructor (options) {
    this.options = {
      protocol: 'http',
      host: 'localhost:3000',
      clientId: 'oidcCLIENT',
      responseType: 'code',
      redirectUri: 'https://example.com/redirect',
      codeChallengeMethod: 'S256',
      codeVerifier: '1235gregfebfhbwefbkwefbukwbfiuewbfkjewbkvhbhjergberhbgerhjbhjgbjerker',
      scope: 'openid',
      prompt: 'login',
      ...options
    }

    if (!this.options.codeChallenge) {
      this.options.codeChallenge =
        base64url.fromBase64(crypto.createHash('sha256').update(this.options.codeVerifier).digest('base64'))
    }

    this.url = new URL(
      `${
        this.options.protocol
      }://${
        this.options.host
      }/api/oidc/auth?client_id=${
        encodeURIComponent(this.options.clientId)
      }&response_type=${
        encodeURIComponent(this.options.responseType)
      }&redirect_uri=${
        encodeURIComponent(this.options.redirectUri)
      }&code_challenge=${
        encodeURIComponent(this.options.codeChallenge)
      }&code_challenge_method=${
        encodeURIComponent(this.options.codeChallengeMethod)
      }&scope=${
        encodeURIComponent(this.options.scope)
      }&prompt=${
        encodeURIComponent(this.options.prompt)
      }`
    )
  }
}
