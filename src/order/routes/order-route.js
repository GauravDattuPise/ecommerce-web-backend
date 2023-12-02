
const express = require("express");
const router = express.Router();

const { authentication } = require("../../middlewares/authentication");
const { placeOrder, getOrdersHistory, getOrderDetails } = require("../controllers/order-controller");

// place orders
router.post("/place-order", authentication, placeOrder)

// get orders history
router.get("/orders-history", authentication, getOrdersHistory)

// get order details by id
router.get("/order-details/:orderId", authentication, getOrderDetails)

module.exports = router