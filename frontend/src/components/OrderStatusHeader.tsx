import { Order } from "@/types";
import { Progress } from "./ui/progress";
import { ORDER_STATUS } from "@/config/order-status-config";

type Props = {
    order: Order;
};

const OrderStatusHeader = ({ order }: Props) => {
    const getExpectedDelivery = () => {
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


    const getOrderStatusInfo = () => {
        const statusInfo = ORDER_STATUS.find((o) => o.value === order.status);
        return statusInfo ? statusInfo : { label: "Unknown Status", progressValue: 0 };
    };


    return (
        <>
            <h1 className="text-4xl font-bold tracking-tighter flex flex-col gap-5 md:flex-row md:justify-between">
                <span> Order Status: {getOrderStatusInfo().label}</span>
                <span> Expected by: {getExpectedDelivery()}</span>
            </h1>
            <Progress
                className="animate-pulse"
                value={getOrderStatusInfo().progressValue}
                aria-label={`Order status is ${getOrderStatusInfo().label}`}
            />

        </>
    );
};

export default OrderStatusHeader;