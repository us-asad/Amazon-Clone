import Head from "next/head";
import { Banner, ProductFeed } from "components";

export default function Home({products}) {
	return (
		<div className="bg-gray-100">
			<Head>
				<title>Amazon</title>
			</Head>
			<main className="max-w-screen-2xl mx-auto">
				<Banner />
				<ProductFeed products={products} />
			</main>
		</div>
	);
}

export async function getServerSideProps() {
	const response = await fetch("https://fakestoreapi.com/products");

	if (response.status !== 200) return {
		props: {
			products: []
		}
	}

	const data = await response.json();

	return {
		props: {
			products: data
		}
	}
}
