import moment from "moment";
import Currency from "react-currency-formatter";

export default function Order({ order }) {
  const { id, amount, amountShipping, items, timestamp, images} = order;

  return (
    <div className="relative border rounded-md">
      <div className="flex items-center space-x-10 p-5 bg-gray-100 text-sm text-gray-500">
        <div>
          <p className="font-bold text-xs">ORDER PLACED</p>
          <p>{moment.unix(timestamp).format("DD MMM, YYYY")}</p>
        </div>
        <div>
          <p className="text-xs font-bold">TOTAL</p>
          <p>
            <Currency quantity={amount} currency="GBP" /> - Next Day Delivery
            {" "}
            <Currency quantity={amountShipping} currency="GBP" />
          </p>
        </div>
        <p className="text-sm white-space-nowrap sm:text-xl self-end flex-1 text-right text-blue-500">{items.length} items</p>
        <p className="absolute top-2 right-2 w-40 lg:w-22 truncate text-xs white-nowrap">ORDER #{id}</p>
      </div>
      <div className="p-5 sm:p-10">
        <div className="flex space-x-6 overflow-x-auto">
          {images.map((image,index) => (
            <img
              key={index}
              src={image}
              alt="product"
              className="h-70 object-conyain sm:h-32"
            />
          ))}
        </div>
      </div>
    </div>
  );
}