import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema({
    ticket: { type: mongoose.Schema.Types.ObjectId, ref: "Ticket", required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    amount: { type: Number, required: true },
    paymentMethod: { type: String, enum: ["Credit Card", "Debit Card", "PayPal", "UPI"], required: true },
    paymentDate: { type: Date, default: Date.now },
    status: { type: String, enum: ["Success", "Failed"], required: true }
  });

  const Payment = mongoose.model("Payment", PaymentSchema)

  export default Payment