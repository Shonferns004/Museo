import mongoose from "mongoose";

const MonumentSchema = new mongoose.Schema({
  name: { type: String, required: false },
  location: { type: String, required: false },
  description: { type: String, required: false },
  discount: { type: Number, default: 0 },
  amount: { type: Number, default: 0 },
  openingTime: { type: String, required: false },
  closingTime: { type: String, required: false },
  ticketsAvailable: { type: Number, required: false },
  imageUrl: { type: String, required: false },
  relatedMonuments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Monument" }],
});

const Monument = mongoose.model("Monument", MonumentSchema);

export default Monument;
