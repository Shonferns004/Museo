import mongoose, { model } from 'mongoose';
const TicketSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },
    visitDate: { type: Date, required: true },
    visitTime: { type: String, required: true }, // e.g., "10:00 AM - 12:00 PM"
    ticketType: { type: String, enum: ["General", "Guided Tour", "Special Exhibition"], required: false },
    numAdults: { type: Number, required: false },
    numChildren: { type: Number, default: 0 },
    numSeniors: { type: Number, default: 0 },
    totalPrice: { type: Number, required: false },
    paymentStatus: { type: String, enum: ["Pending", "Paid", "Failed"], default: "Pending" },
    addOns: { type: [String], enum: ["Audio Guide", "VR Experience", "Souvenir"], default: [] },
    email: String
  });

const Ticket = mongoose.model("Ticket", TicketSchema)

export default Ticket