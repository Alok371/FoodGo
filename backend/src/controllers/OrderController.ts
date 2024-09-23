import { Request, Response } from "express";
import Restaurant, { MenuItemType } from "../models/restaurant";
import Order from "../models/order";

const FRONTEND_URL = process.env.FRONTEND_URL as string;

const getMyOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find({ user: req.userId })
      .populate("restaurant")
      .populate("user");
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

type CheckoutSessionRequest = {
  cartItems: {
    menuItemId: string;
    name: string;
    quantity: string;
  }[];
  deliveryDetails: {
    email: string;
    name: string;
    address: string;
    city: string;
  };
  restaurantId: string;
};

const createCheckoutSession = async (req: Request, res: Response) => {
  try {
    const checkoutSessionRequest: CheckoutSessionRequest = req.body;
    const restaurant = await Restaurant.findById(checkoutSessionRequest.restaurantId);
    if (!restaurant) {
      throw new Error("Restaurant not found");
    }

    // Calculate totalAmount based on cart items
    let totalAmount = 0;
    checkoutSessionRequest.cartItems.forEach((item) => {
      const menuItem = restaurant.menuItems.find(
        (menuItem: MenuItemType) => menuItem._id.toString() === item.menuItemId
      );
      if (!menuItem) {
        throw new Error(`Menu item not found: ${item.menuItemId}`);
      }
      totalAmount += menuItem.price * parseInt(item.quantity);
    });

    // Create a new order
    const newOrder = new Order({
      restaurant: restaurant._id,
      user: req.userId,
      status: "placed",
      deliveryDetails: checkoutSessionRequest.deliveryDetails,
      cartItems: checkoutSessionRequest.cartItems,
      totalAmount,  // Set the calculated totalAmount here
      createdAt: new Date(),
    });
    await newOrder.save();

    // Skip payment and directly redirect to the order status page
    const successUrl = `${FRONTEND_URL}/order-status?success=true&orderId=${newOrder._id}`;

    // Return the success URL to redirect the user
    res.json({ url: successUrl });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const cashfreeWebhookHandler = async (req: Request, res: Response) => {
  try {
    const orderId = req.body.orderId;
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    order.totalAmount = req.body.orderAmount;
    order.status = "paid";
    await order.save();
    res.status(200).send();
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ message: "Webhook error" });
  }
};

export default {
  getMyOrders,
  createCheckoutSession,
  cashfreeWebhookHandler,
};
