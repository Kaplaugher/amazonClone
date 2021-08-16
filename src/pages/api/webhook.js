import { buffer } from 'micro';
import * as admin from 'firebase-admin';

// firebase conncection from backend
const serviceAccount = require('../../../permissions.json');
const app = !admin.apps.length
  ? admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    })
  : admin.app();

const fulfillOrder = async (session) => {
  console.log('fulfilling order');

  return app
    .firestore()
    .collection('users')
    .doc(session.metadata.email)
    .collection('orders')
    .doc(session.id)
    .set({
      amount: session.amount_total / 100,
      amount_shipping: session.total_details.amount_shipping / 100,
      images: JSON.parse(session.metadata.images),
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    })
    .then(() => {
      console.log(`success: order ${session.id} has been added to db`);
    });
};

// connection to stripe
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_SIGNING_SECRET;
export default async function webhook(req, res) {
  if (req.method === 'POST') {
    const requestBuffer = await buffer(req, res);
    const payload = requestBuffer.toString();
    const sig = req.headers['stripe-signature'];

    let event;
    // verify event came from stripe
    try {
      event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
    } catch (err) {
      console.log(err.message, 'ERROR');
      return res.status(400).send(`webhook error: ${err.message}`);
    }

    // handle checkout session completed events

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;

      // fulfill order
      return fulfillOrder(session)
        .then(() => res.status(200))
        .catch((err) => res.status.send(`webhook error: ${err.message}`));
    }
  }
}

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};
