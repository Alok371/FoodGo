import { useGetMyOrders } from "@/api/OrderApi";
import OrderStatusHeader from "@/components/OrderStatusHeader";
import OrderStatusDetail from "@/components/OrderStatusDetail";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const OrderStatusPage = () => {
    const { orders, isLoading } = useGetMyOrders();

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <span className="text-2xl font-bold">Loading...</span>
            </div>
        );
    }

    if (!orders || orders.length === 0) {
        return (
            <div className="flex justify-center items-center h-screen">
                <span className="text-2xl font-bold">No orders found</span>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-10">
            {orders.map((order) => (
                <div
                    key={order._id}
                    className="bg-orange-100 rounded-lg shadow-md p-10 mb-10"
                >
                    <div className="border-b border-orange-500 pb-5">
                        <OrderStatusHeader order={order} />
                    </div>
                    <div className="grid gap-10 md:grid-cols-2">
                        <OrderStatusDetail order={order} />
                        <AspectRatio ratio={16 / 5}>
                            <img
                                src={order.restaurant.imageUrl}
                                className="rounded-md object-cover h-full w-full"
                                alt={order.restaurant.restaurantName}
                            />
                        </AspectRatio>
                    </div>

                </div>
            ))}
        </div>
    );
};

export default OrderStatusPage;