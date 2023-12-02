
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv")

const HttpError = require("./httpError/http-error");

const userRoute = require("./user/routes/user-route")
const categoryRoute = require("./category/routes/category-route")
const productRoute = require("./product/routes/product-route")
const cartRoute = require("./cart/routes/cart-route")
const orderRoute = require("./order/routes/order-route")

const app = express();
app.use(express.json());
dotenv.config();

// Connecting to db
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("db is connected"))
    .catch((err) => console.log("error in connecting with db", err.message))

// routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/category", categoryRoute)
app.use("/api/v1/product", productRoute)
app.use("/api/v1/cart", cartRoute)
app.use("/api/v1/order", orderRoute)


// route not found
app.use((err, req, res) => {
    const error = new HttpError("could not found path", 404);
    throw error;
})

// global middleware to handle errors
app.use((error, req, res, next) => {

    if (res.headerSent) { 
        return next(error)
    }

    res.status(error.code || 500)
    res.json({ message: error.message || "An unknown error occured" })
})


const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log("server is running on port", PORT)
})

