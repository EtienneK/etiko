/**
 * @jest-environment node
 */
import configuration from '../../../../modules/oidc/configuration'

describe('OIDC configuration tests', () => {
  describe('interactions', () => {
    it('url() should return correct interactions url', () => {
      expect(configuration.interactions.url(null, { uid: 'testuid123' }))
        .toEqual('/api/oidc/interaction/testuid123')
    })
  })
})
