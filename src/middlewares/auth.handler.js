import boom from '@hapi/boom';

import { config } from '../config/config.js';

export function checkApiKey(req, res, next) {
  const apiKey = req.headers['api'];
  if(apiKey === config.apiKey) {
    next();
  } else {
    next(boom.unauthorized());
  }
}

export function checkRoles(...roles) {
  return(req, rest, next) => {
    const user = req.user;
    if(user.role === 'admin') {
      next();
    } else {
      next(boom.forbidden('You need permissions to do that'));
    }
  }
}
