import express from "express";
import { jwtCheck, jwtParse } from "../middleware/auth";
import OrderController from "../controllers/OrderController";

const router = express.Router();

// Route to get user orders
router.get("/", jwtCheck, jwtParse, OrderController.getMyOrders);

// Route to create a checkout session (no actual payment, just order creation and redirection)
router.post(
    "/checkout/create-checkout-session",
    jwtCheck,
    jwtParse,
    OrderController.createCheckoutSession
);

// Cashfree webhook handler route
router.post("/checkout/webhook", OrderController.cashfreeWebhookHandler);

export default router;
