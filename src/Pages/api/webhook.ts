import { buffer } from 'micro';
import type { NextApiRequest, NextApiResponse } from 'next';
import { stripe } from '../../lib/stripe';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const sig = req.headers['stripe-signature']!;
    const buf = await buffer(req);

    try {
      const event = stripe.webhooks.constructEvent(buf, sig, process.env.WEBHOOK_SECRET!);
      // TODO: handle subscription events
      res.status(200).json({ received: true });
    } catch (err: unknown) {
      console.error(err);
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      res.status(400).send(`Webhook Error: ${errorMessage}`);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
