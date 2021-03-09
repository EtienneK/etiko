import type { NextApiRequest, NextApiResponse } from 'next'

export default (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const { uid } = req.query;
    return res.redirect(`/oidc/interaction/${uid}`);
  } else if (req.method === 'POST') {

  }
  return res.status(404).end();
}
