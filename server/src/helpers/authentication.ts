import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { env } from './env';

const saltRounds = 10;
const Authenticate = {
  hash: async (password) => {
    return bcrypt
      .genSalt(saltRounds)
      .then((salt) => bcrypt.hash(password, salt))
      .then((hash) => ({ result: hash, error: false }))
      .catch((err) => ({ result: err.message, error: true }));
  },
  verify: async (clientPassword, storedHash) => {
    try {
      return bcrypt.compare(clientPassword, storedHash).then((res) => {
        if (res) {
          return { result: true, error: false };
        } else {
          return { result: 'Could not validate password', error: true };
        }
      });
    } catch (err) {
      return { result: err.message, error: true };
    }
  },

  createToken: (id) => {
    try {
      const token = jwt.sign({ id: id }, env.JWT_SECRET, { expiresIn: '2h' });
      return { result: token, error: false };
    } catch (error) {
      return { result: error, error: true };
    }
  },

  getUserIdFromToken: async (token) => {
    try {
      const user = jwt.verify(token, env.JWT_SECRET);

      return { result: user['id'], error: false };
    } catch (err) {
      return { result: err, error: true };
    }
  },
};
export { Authenticate };
