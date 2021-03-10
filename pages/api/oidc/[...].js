import oidc from '../../../modules/oidc/provider';

let callback;

export default async (req, res) => {
  if (!callback) {
    callback = (await oidc()).callback();
  }
  req.originalUrl = req.url;
  req.url = req.url.replace('/api/oidc', '');

  return callback(req, res);
};
