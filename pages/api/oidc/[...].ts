import type { NextApiRequest, NextApiResponse } from 'next';
import { oidc } from '../../../modules/oidc/provider';

let callback;
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (!callback) {
    callback = (await oidc()).callback();
  }
  (req as any).originalUrl = req.url;
  req.url = req.url.replace('/api/oidc', '');
  return callback(req, res);
}
