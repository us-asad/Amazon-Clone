const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  const { items, email } = req.body;

  const transformedItems = items.map(item => ({
    description: item.description,
    quantity: item.quantity,
    price_data: {
      currency: "gbp",
      unit_amount: item.price * 100,
      product_data: {
        name: item.title,
        images: [item.image]
      },
    },
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    shipping_rates: [process.env.STRIPE_SHIPPING_RATE_ID],
    shipping_address_collection: {
      allowed_countries: ["US", "GB", "CA",],
    },
    line_items: transformedItems,
    mode: "payment",
    success_url: `${process.env.HOST}/success`,
    cancel_url: `${process.env.HOST}/cancel`,
    metadata: {
      email,
      images: JSON.stringify(items.map(({image}) => image))
    }
  });

  res.status(200).json({ id: session.id })
}