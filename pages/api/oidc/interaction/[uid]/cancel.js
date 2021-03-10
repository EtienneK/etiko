import oidc from '../../../../../modules/oidc/provider';

export default async (req, res) => {
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Cache-Control', 'no-cache, no-store');

  if (req.method !== 'GET') {
    return res.status(404).end();
  }

  const provider = await oidc();
  const result = {
    error: 'access_denied',
    error_description: 'End-User cancelled interaction',
  };

  return provider.interactionFinished(req, res, result, { mergeWithLastSubmission: false });
};
