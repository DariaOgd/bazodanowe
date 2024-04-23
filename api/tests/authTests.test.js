import { expect } from 'chai';
import { register } from '../controllers/auth.controller.js';
import User from '../models/user.model.js';

describe('Auth Controller', () => {
  describe('register', () => {
    it('should register a new user', async () => {
      // Mock request and response objects
      const req = {
        body: {
          email: 'test@example.com',
          password: 'password123',
        },
      };
      let statusCode = null;
      let message = null;
      const res = {
        status(code) {
          statusCode = code;
          return this;
        },
        send(msg) {
          message = msg;
        },
      };

      const saveStub = User.prototype.save = async function() {};

      await register(req, res);

      // Expectations
      expect(statusCode).to.equal(201);
      expect(message).to.equal('User has been created.');

      User.prototype.save = saveStub;
    });
  });
});
