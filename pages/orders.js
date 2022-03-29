import Head from "next/head";
import { useSession, getSession } from "next-auth/client";
import { db } from "../firebase.js";
import moment from "moment";
import { Order } from "components";

export default function Orders({ orders }) {
	const [session] = useSession();

	return (
		<div>
			<Head>
				<title>Orders | Amazon Clone</title>
			</Head>
			<main className="max-w-screen-lg mx-auto p-10">
				<h2 className="text-3xl border-b mb-2 pb-1 border-yellow-400">
					Your Orders
				</h2>
				{session
					? <h3>{orders.length} Orders</h3>
					: <h3>Please sign in to see your orders</h3>
				}
				<div className="mt-5 space-y-4">
					{orders?.map(order => <Order key={order.id} order={order} />)}
				</div>
			</main>
		</div>
	);
}

export async function getServerSideProps(context) {
	const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

	const session = await getSession(context);

	if(!session) {
		return {
			props: {},
		}
	}

	const stripeOrders = await db
		.collection("users")
		.doc(session.user.email)
		.collection("orders")
		.orderBy("timestamp", "desc")
		.get();

	const orders = await Promise.all(
		stripeOrders.docs.map(async order => ({
			id: order.id,
			amount: order.data().amount,
			amountShipping: order.data().amount_shipping,
			images: order.data().images,
			timestamp: moment(order.data().timestamp.toDate()).unix(),
			items: (
				await stripe.checkout.sessions.listLineItems(order.id, {
					limit: 100
				})
			).data
		}))
	);

	return {
		props: {
			orders,
		}
	}
}