import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    orders: [
        {
            orderId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Order",
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }
    ],
    orderBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    DeliveryStatus : {
        type : String,
        enum: ["Pending","Order in Process","Order Placed"],
        default : "Pending"
    }
}, { timestamps: true });

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;
