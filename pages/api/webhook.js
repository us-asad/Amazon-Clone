import firebase from "firebase/app";
import { buffer } from "micro";
import { db } from "../../firebase.js";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const fulfillOrder = async session => {
  db
    .collection("users")
    .doc(session.metadata.email)
    .collection("orders")
    .doc(session.id)
    .set({
      amount: session.amount_total / 100,
      amount_shipping: session.total_details.amount_shipping / 100,
      images: JSON.parse(session.metadata.images),
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(() => console.log(`SUCCESS: Order ${session.id} had been added to the DB`))
}

export default async (req, res) => {
  if (req.method === "POST") {
    const requestBuffer = await buffer(req);
    const sessionData = JSON.parse(requestBuffer);

    if (sessionData.type === "checkout.session.completed") {
      fulfillOrder(sessionData.data.object)
    }
  }
}

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true
  }
}