const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const cartSchema = new mongoose.Schema(
    {
        userId: {
            type: ObjectId,
            ref: "User",
            unique: true,
            trim: true
        },

        items: [
            {
                productId: { type: ObjectId, ref: "Product", required: true, trim: true },
                productPrice: { type: Number },
                quantity: { type: Number, default: 1, trim: true },
            },
        ],
        totalPrice: { type: Number, default: 0, trim: true },
        totalItems: { type: Number, default: 0, trim: true },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Cart", cartSchema);
