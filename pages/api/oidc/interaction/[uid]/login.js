import assert from 'assert';

import Account from '../../../../../modules/oidc/account';
import oidc from '../../../../../modules/oidc/provider';

export default async (req, res) => {
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Cache-Control', 'no-cache, no-store');

  if (req.method !== 'POST') {
    return res.status(404).end();
  }

  const provider = await oidc();
  const { prompt: { name } } = await provider.interactionDetails(req, res);

  assert.strictEqual(name, 'login');

  const account = await Account.findByEmail(req.body.email);

  const result = {
    login: {
      accountId: account.accountId,
    },
  };

  const redirectTo = await provider.interactionResult(
    req, res, result, { mergeWithLastSubmission: false },
  );

  return res.send({ redirectTo });
};
