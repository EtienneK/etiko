import assert from 'assert'

import oidc from '../../../../../modules/oidc/provider'

export default async (req, res) => {
  res.setHeader('Pragma', 'no-cache')
  res.setHeader('Cache-Control', 'no-cache, no-store')

  if (req.method !== 'GET') {
    return res.status(404).end()
  }

  const provider = await oidc()
  const {
    uid, prompt
  } = await provider.interactionDetails(req, res)

  assert.strictEqual([
    'login',
    'consent'
  ].includes(prompt.name), true)

  const redirectTo = `/oidc/interaction/${uid}/${prompt.name}`

  if (req.headers.accept === 'application/json') {
    return res.json({ redirectTo })
  }

  return res.redirect(redirectTo)
}
