import Head from "next/head";
import Link from "next/link";

export default function NotFound() {
	return (
		<div>
			<Head>
				<title>404 | Page Not Found | Amazon Clone</title>
			</Head>
			<div className="h-[40vh] space-y-3 flex flex-col justify-center items-center">
				<h2 className="text-3xl">404 Page Not Found</h2>
				<Link href="/">
					<a className="text-xl underline cursor-pointer">Back to Home Page</a>
				</Link>
			</div>
		</div>
	);
}