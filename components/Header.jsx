import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectItems, setSavedItems } from "redux/basketSlice";
import Image from "next/image";
import { useRouter } from "next/router";
import {
	MenuIcon,
	SearchIcon,
	ShoppingCartIcon,
} from "@heroicons/react/outline";
import { signIn, signOut, useSession } from "next-auth/client";
const bottomNavItems = [
	"Prime Video",
	"Amazon Business",
	"Today's Deals",
	"Electronics",
	"Food & Grocery",
	"Prime",
	"Buy Again",
	"Shopper Toolkit",
	"Health & Personal Care"
];

export default function Header() {
	const dispatch = useDispatch();
	const items = useSelector(selectItems);
	const router = useRouter();
	const [session,loading] = useSession();

	const authClickHandle = () => {
		if (!session) {
			signIn("google");
		} else if (session) {
			signOut();
		}
	}

	useEffect(() => {
		if (items.length !== 0) {
			localStorage.setItem("amazonSavedProducts",JSON.stringify(items));			
		}
	},[items]);

	useEffect(() => {
		const savedProducts = localStorage.getItem("amazonSavedProducts");
		const items = savedProducts ? JSON.parse(savedProducts) : [];

		dispatch(setSavedItems(items));
	},[]);

	return (
		<header>
			{/* Top nav */}
			<div className="flex items-center bg-amazon_blue p-1 flex-grow py-2">
				<div onClick={() => router.push("/")} className="mt-2 flex items-center flex-grow sm:flex-grow-0">
						<Image
							src="/logo.png"
							width="150"
							height="40"
							objectFit="contain"
							className="cursor-pointer"
						/>
				</div>
				{/* Search */}
				<div className="bg-yellow-400 hover:bg-yellow-500 hidden sm:flex items-center h-10 rounded-md flex-grow cursor-pointer">
					<input className="p-w h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none px-4" type="text" />
					<SearchIcon className="h-12 p-4" />
				</div>
				{/* Right Buttons */}
				<div className="text-white flex items-center text-xs space-x-6 mx-6 whitespace-nowrap">
					<div onClick={authClickHandle} className="link">
						{!loading ? (<p>{session ? `Hello ${session?.user?.name}` : "Sign In"}</p>) : <p>loading...</p>}
						<p className="font-extrabold md:text-sm">Account & Lists</p>
					</div>
					<div onClick={() => router.push("/orders")} className="link">
						<p>Returns</p>
						<p className="font-extrabold md:text-sm">& Orders</p>
					</div>
					<div onClick={() => router.push("/checkout")} className="link relative flex items-center">
						<span className="absolute top-0 right-0 md:right-18 h-4 w-4 bg-yellow-400 text-center rounded-full text-black font-bold">{items.length}</span>
						<ShoppingCartIcon className="h-10" />
						<p className="hidden md:inline mt-2 font-extrabold md:text-sm">Basket</p>
					</div>
				</div>
			</div>
			{/* Bottom nav */}
			<div className="flex items-center space-x-3 p-2 pl-6 bg-amazon_blue-light text-white text-sm">
				<p className="link flex items-center">
					<MenuIcon className="h-6 mr-1" />
					All
				</p>
				{bottomNavItems.map((item,i) => (
					<p key={i} className={`link ${i > 2 && "hidden lg:inline-flex"}`}>{item}</p>
				))}
			</div>
		</header>
	);
}