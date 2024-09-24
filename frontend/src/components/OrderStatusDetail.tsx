import { Order } from "@/types";
import { Separator } from "./ui/separator";

type Props = {
    order: Order;
};

const calculateItemPrice = (order: Order, item: any) => {
    const menuItem = order.restaurant.menuItems.find(
        (menuItem) => menuItem._id === item.menuItemId
    );
    return menuItem ? menuItem.price * parseInt(item.quantity) : 0;
};

const calculateTotal = (order: Order) => {
    return order.cartItems.reduce((acc, item) => {
        return acc + calculateItemPrice(order, item);
    }, 0);
};

const OrderStatusDetail = ({ order }: Props) => {
    return (
        <div className="space-y-5 bg-orange-100 rounded-lg p-10">
            {/* Delivery Details */}
            <div className="flex flex-col border-b border-orange-500 pb-5">
                <span className="font-bold text-lg text-orange-500">Delivering to:</span>
                <span className="text-gray-600">{order.deliveryDetails.name}</span>
                <span className="text-gray-600">
                    {order.deliveryDetails.address}, {order.deliveryDetails.city}
                </span>
            </div>

            {/* Order Summary */}
            <div className="flex flex-col border-b border-orange-500 pb-5">
                <span className="font-bold text-lg text-orange-500">Your Order:</span>
                <ul>
                    {order.cartItems.map((item) => (
                        <li key={item.menuItemId} className="flex justify-between py-2">
                            <span>
                                {item.name} x {item.quantity}
                            </span>
                            <span className="text-orange-500">
                                ₹{calculateItemPrice(order, item).toFixed(2)}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>

            <Separator />

            {/* Total */}
            <div className="flex flex-col">
                <span className="font-bold text-lg text-orange-500">Total:</span>
                <span className="text-orange-500">
                    ₹{calculateTotal(order).toFixed(2)}
                </span>
            </div>
        </div>
    );
};

export default OrderStatusDetail;

