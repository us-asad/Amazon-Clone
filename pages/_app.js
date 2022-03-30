import Head from "next/head";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { Provider as NextAuthProvider } from "next-auth/client";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "redux/store";
import { Header } from "components";
import { signIn, signOut, useSession } from "next-auth/client";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'styles/globals.css';

function MyApp({ Component, pageProps }) {
	const router = useRouter();
	const [session,loading] = useSession();

	useEffect(() => {
		const alanBtn = require('@alan-ai/alan-sdk-web');

	  alanBtn({
	      key: process.env.NEXT_PUBLIC_ALAN_KEY,
	      rootEl: document.getElementById("alan-btn"),
	      onCommand: (commandData) => {
	        if (commandData.command === "navigateToCheckout") {
	        	router.push("/checkout");
	        }	else if (commandData.command === "navigateToHome") {
						router.push("/")
	        }	else if (commandData.command === "navigateToOrders") {
						router.push("/orders")
	        }	else if (commandData.command === "signIn") {
						signIn("google");
	        } else if (commandData.command === "signOut") {
	        	signOut();
	        } else if(commandData.command === "devWebsite") {
	        	window.open(process.env.NEXT_PUBLIC_WEBSITE_OF_DEV);
	        }
	      }
	  });
	}, []);

	return (
		<NextAuthProvider session={pageProps.session}>
			<ReduxProvider store={store}>
				<Head>
					<link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png" />
					<link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png" />
					<link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png" />
					<link rel="manifest" href="/favicons/site.webmanifest" />
				</Head>
  			<Header />
  			<Component {...pageProps} />
  			<ToastContainer />
			</ReduxProvider>
		</NextAuthProvider>
	);
}

export default MyApp;
