import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';

import { config } from './../config/config.js'
import AuthService from './../services/auth.service.js';

const router = express.Router();
const service = new AuthService;

router.post('/login',
  passport.authenticate('local', {session: false}),
  async (req, res, next) => {
    try {
      const user = req.user;
      res.json(service.signToken(user));
    } catch (error) {
      next(error);
    }
});

router.post('/recovery',
  async (req, res, next) => {
    try {
      const { email } = req.body;
      const response = await service.sendRecovery(email);
      res.json(response);
    } catch (error) {
      next(error);
    }
});

router.post('/change-password',
  async (req, res, next) => {
    try {
      const { token, newPassword } = req.body;
      const response = await service.changePassword(token, newPassword);
      res.json(response);
    } catch (error) {
      next(error);
    }
});

export default router;
