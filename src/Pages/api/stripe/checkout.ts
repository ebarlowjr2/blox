import { NextApiRequest, NextApiResponse } from 'next';
import { stripe } from '../../../lib/stripe';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'subscription',
        line_items: [{
          price: 'your_stripe_price_id',
          quantity: 1,
        }],
        success_url: `${req.headers.origin}/dashboard`,
        cancel_url: `${req.headers.origin}/`,
      });

      res.status(200).json({ url: session.url });
    } catch (err) {
      res.status(500).json({ error: 'Checkout session failed.' });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}