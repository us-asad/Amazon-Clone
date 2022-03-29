import { Provider as NextAuthProvider } from "next-auth/client";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "redux/store";
import { Header } from "components";
import 'styles/globals.css';

function MyApp({ Component, pageProps }) {
  	return (
  		<NextAuthProvider session={pageProps.session}>
  			<ReduxProvider store={store}>
	  			<Header />
	  			<Component {...pageProps} />
  			</ReduxProvider>
  		</NextAuthProvider>
  	);
}

export default MyApp;
