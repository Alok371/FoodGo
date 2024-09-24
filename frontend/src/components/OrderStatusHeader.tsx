import { Order } from "@/types";
import { Progress } from "./ui/progress";
import { ORDER_STATUS } from "@/config/order-status-config";

type Props = {
    order: Order;
};

const getExpectedDelivery = (order: Order) => {
    const created = new Date(order.createdAt);
    created.setMinutes(
        created.getMinutes() + order.restaurant.estimatedDeliveryTime
    );
    let hours = created.getHours();
    const minutes = created.getMinutes();
    const isPM = hours >= 12;
    hours = hours % 12 || 12;
    const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${hours}:${paddedMinutes} ${isPM ? "PM" : "AM"}`;
};

const getOrderStatusInfo = (order: Order) => {
    const statusInfo = ORDER_STATUS.find((o) => o.value === order.status);
    return statusInfo
        ? statusInfo
        : { label: "Unknown Status", progressValue: 0 };
};

const OrderStatusHeader = ({ order }: Props) => {
    const statusInfo = getOrderStatusInfo(order);
    const expectedDelivery = getExpectedDelivery(order);

    return (
        <div className="flex flex-col md:flex-row justify-between items-center mb-5 bg-orange-100 rounded-lg p-5">
            <h1 className="text-3xl font-bold tracking-tighter text-orange-500">
                Order Status: {statusInfo.label}
            </h1>
            <div className="text-lg text-gray-600">
                Expected by: {expectedDelivery}
            </div>
            <Progress
                className="animate-pulse w-1/2"
                value={statusInfo.progressValue}
                aria-label={`Order status is ${statusInfo.label}`}
                color={statusInfo.progressValue < 50 ? "orange" : "green"}
            />
        </div>
    );
};

export default OrderStatusHeader;