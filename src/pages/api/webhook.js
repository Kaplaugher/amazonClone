import { buffer } from 'micro';
import * as admin from 'firebase-admin';

// firebase conncection from backend
const serviceAccount = require('../../../permissions.json');
const app = !admin.apps.length
  ? admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    })
  : admin.app();

// connection to stripe
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
export default async function webhook(req, res) {
  if (req.method === 'POST') {
  }
}
