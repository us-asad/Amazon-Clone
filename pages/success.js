import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { emptyBasket } from "redux/basketSlice.js";
import Head from "next/head";
import Link from "next/link";
import { CheckCircleIcon } from "@heroicons/react/solid";

export default function Success() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(emptyBasket());
  }, []);

  return (
    <div className="bg-gray-100 h-screen">
      <Head>
        <title>Payment Successfully Done!</title>
      </Head>
      <main className="max-w-screen-lg mx-auto">
        <div className="flex flex-col p-10 bg-white">
          <div className="flex items-center space-x-2 mb-5">
            <CheckCircleIcon className="text-green-500 h-10" />
            <h1 className="text-3xl">
              Thank you, your order has been confirmed!
            </h1>
          </div>
          <p>
            Thank you for shopping with us. We will send a confirmation once your item has shipped, if you would line to check the status of your order(s) please press the link below.
          </p>
          <Link href="/orders">
            <a className="button mt-8 text-center">Go to my orders</a>
          </Link>
        </div>
      </main>
    </div>
  );
}