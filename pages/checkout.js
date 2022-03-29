import { useSession, signin } from "next-auth/client";
import { useSelector } from "react-redux";
import { selectItems } from "redux/basketSlice";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import Currency from "react-currency-formatter";
import { CheckoutProduct } from "components";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function Checkout() {
	const items = useSelector(selectItems);
	const [session,loading] = useSession();
	const numOfOrderProducts = items.reduce((quantity,product) => quantity + product.quantity,0);
	const currencyOfOrderProducts = items.reduce((quantity,product) => quantity + (product.quantity * product.price),0)

	const subtotalHandler = async () => {
		if(!loading) {
			if (!session) {
				signin("google");
			} else {
				const stripe = await stripePromise;

				const checkoutSession = await axios.post("/api/create-checkout-session", {
					items,
					email: session.user.email
				});

				const result = await stripe.redirectToCheckout({
					sessionId: checkoutSession.data.id
				});

				if(result.error) alert(result.error.message);
			}
		}
	}

	return (
		<div className="bg-gray-100">
			<Head>
				<title>Checkout - Amazon Basket</title>
			</Head>
			<main className="lg:flex max-w-screen-xl mx-auto">
				<div className="flex-grow m-5 shadow-sm">
					<Image src="/checkout-banner.png" width={1020} height={250} objectFit="contain" />
					<div className="flex flex-col p-5 space-y-10 bg-white">
						<h1 className="text-3xl border-b pb-4">
							{items.length === 0
								? "Your Amazon Basket is empty."
								: "Shopping Basket"
							}
						</h1>
						{items.map((item,i) => (
							<CheckoutProduct key={i} product={item} />
						))}
					</div>
				</div>
				<div className="flex flex-col bg-white p-10 shadow-md">
					{items.length > 0 && (
						<>
							<h2 className="whitespace-nowrap">
								Subtotal ({numOfOrderProducts} items)&nbsp;&nbsp;
								<span className="font-bold">
									<Currency quantity={currencyOfOrderProducts} currency="GBP" />
								</span>
							</h2>
							<button
								role="link"
								onClick={subtotalHandler}
								className={`button mt-2 ${!session && "from-gray-300 to-gray-500 border-gray-200 text-gray-300 active:from-gray-500"}`}
							>
								{loading ? "loading..." : session ? "Proceed to checkout" : "Sign in to checkout"}
							</button>
						</>
					)}
				</div>
			</main>
		</div>
	);
}