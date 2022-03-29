import Head from "next/head";

export default function InternationalServerError() {
	return (
		<div>
			<Head>
				<title>500 | International Server Error | Amazon Clone</title>
			</Head>
			<div className="h-[40vh] space-y-3 flex flex-col justify-center items-center">
				<h2 className="text-3xl">500 International Server Error</h2>
				<p className="text-xl">Please try again in a few minutes</p>
			</div>
		</div>
	);
}