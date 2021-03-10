import assert from 'assert';

import oidc from '../../../../../modules/oidc/provider';

export default async (req, res) => {
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Cache-Control', 'no-cache, no-store');

  if (req.method !== 'POST') {
    return res.status(404).end();
  }

  const provider = await oidc();
  const interactionDetails = await provider.interactionDetails(req, res);
  const { prompt: { name, details }, params, session: { accountId } } = interactionDetails;

  assert.strictEqual(name, 'consent');

  let { grantId } = interactionDetails;
  let grant;

  if (grantId) {
    // We'll be modifying existing grant in existing session
    grant = await provider.Grant.find(grantId);
  } else {
    // We're establishing a new grant
    grant = new provider.Grant({
      accountId,
      clientId: params.client_id,
    });
  }

  if (details.missingOIDCScope) {
    grant.addOIDCScope(details.missingOIDCScope.join(' '));
  }
  if (details.missingOIDCClaims) {
    grant.addOIDCClaims(details.missingOIDCClaims);
  }
  if (details.missingResourceScopes) {
    // eslint-disable-next-line no-restricted-syntax
    for (const [
      indicator,
      scopes,
    ] of Object.entries(details.missingResourceScopes)) {
      grant.addResourceScope(indicator, scopes.join(' '));
    }
  }

  grantId = await grant.save();

  const consent = {};

  if (!interactionDetails.grantId) {
    // We don't have to pass grantId to consent, we're just modifying existing one
    consent.grantId = grantId;
  }

  const result = { consent };
  const redirectTo = await provider.interactionResult(
    req, res, result, { mergeWithLastSubmission: true },
  );

  return res.send({ redirectTo });
};
