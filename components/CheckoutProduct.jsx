import { useDispatch } from "react-redux";
import { addItem, subtractItem, removeFromBasket } from "redux/basketSlice";
import Image from "next/image";
import { StarIcon } from "@heroicons/react/solid";
import Currency from "react-currency-formatter";

export default function CheckoutProduct({ product }) {
	const dispatch = useDispatch();

	const { hasPrime, id, title, description, image, category, rating, price, quantity } = product;
	const ratingScore = Math.floor(rating.rate);

	const addItemHandler = () => {
		dispatch(addItem(id));
	}

	const subtractItemHandler = () => {
		dispatch(subtractItem(id));
	}

	const removeItem = () => {
		dispatch(removeFromBasket(id));
	}

	return (
		<div className="grid grid-cols-5">
			<Image src={image} height={200} width={200} objectFit="contain" />
			<div className="col-span-3 mx-5">
				<p>{title}</p>
				<div className="flex">
					{[...Array(ratingScore)].map((_,i) => (
						<StarIcon key={i} className="h-5 text-yellow-500" />
					))}
				</div>
				<p className="text-xs my-2 line-clamp-3">{description}</p>
				<Currency quantity={price} currency="GBP" />
				{hasPrime && (
					<div className="flex items-center space-x-2">
						<img
							loading="lazy"
							className="w-13"
							src="/prime-logo.png"
							alt="prime"
						/>
						<p className="text-xs text-gray-500">FREE Next-day Delivery</p>
					</div>
				)}
			</div>
			<div className="flex flex-col space-y-2 my-auto justify-self-end">
				<div className="flex justify-around text-xl border-b pb-1">
					<button onClick={addItemHandler}>+</button>
					<p>{quantity}</p>
					<button className={quantity === 1 ? "text-gray-300" : undefined} onClick={subtractItemHandler}>-</button>
				</div>
				<button className="button mt-auto" onClick={removeItem}>Remove from Basket</button>
			</div>
		</div>
	);
}