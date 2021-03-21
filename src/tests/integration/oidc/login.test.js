import puppeteer from 'puppeteer'

describe('oidc module - login tests', () => {
  let browser

  beforeAll(async () => {
    browser = await puppeteer.launch()
  })

  afterAll(async () => {
    await browser.close()
  })

  test('should authenticate a user successfully', async () => {
    const page = await browser.newPage()
    await page.goto('http://localhost:3000/api/oidc/auth?client_id=oidcCLIENT&response_type=code&redirect_uri=https://example.com/redirect&code_challenge=1235gregfebfhbwefbkwefbukwbfiuewbfkjewbkvhbhjergberhbgerhjbhjgbjerker&code_challenge_method=S256&scope=openid&prompt=login')
    // await page.screenshot({ path: 'example.png' })
  })
})
