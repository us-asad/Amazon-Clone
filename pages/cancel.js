import Head from "next/head";
import Link from "next/link";
import { XCircleIcon } from "@heroicons/react/solid";

export default function Fail() {
  return (
    <div className="bg-gray-100 h-screen">
      <Head>
        <title>Payment Successfully Done!</title>
      </Head>
      <main className="max-w-screen-lg mx-auto">
        <div className="flex flex-col p-10 bg-white">
          <div className="flex items-center space-x-2 mb-5">
            <XCircleIcon className="text-red-500 h-10" />
            <h1 className="text-3xl">
              Sorry, your order has been canceled
            </h1>
          </div>
          <p>
            we apologize for the errors, please try again in a few minutes.
          </p>
          <Link href="/checkout">
            <a className="button mt-8 text-center">Go to checkout page</a>
          </Link>
        </div>
      </main>
    </div>
  );
}