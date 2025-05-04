import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import Razorpay from 'npm:razorpay';

const razorpay = new Razorpay({
  key_id: Deno.env.get("RAZORPAY_KEY_ID")!,
  key_secret: Deno.env.get("RAZORPAY_SECRET")!,
});

serve(async (req) => {
  const { amount } = await req.json();

  try {
    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency: 'INR',
      receipt: 'receipt_' + Date.now(),
    });

    return new Response(JSON.stringify(order), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500,
    });
  }
});
