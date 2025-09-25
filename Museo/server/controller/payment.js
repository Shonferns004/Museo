import Stripe from "stripe";
import Ticket from "../models/Booking.js";
const stripe = new Stripe(process.env.STRIPE_SECRET);

const createPaymentIntent = async (req, res) => {
  try {
    const { bookingId , bookingAmt } = req.body;

    console.log(bookingId)

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: "Monument Booking",
              description: "Entry Ticket",
            },
            unit_amount: bookingAmt * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `http://localhost:5173/cancel`,
      metadata: { bookingId: bookingId },
    });

    res.json({ sessionId: session.id });
  } catch (error) {
    console.error("Stripe Checkout Error:", error);
    res.status(500).json({ error: error.message });
  }
}

const updatePayment = async (req, res) => {
  try {
    const sessionId = req.query.session_id; // Get session ID from query params

    if (!sessionId) {
      return res.status(400).json({ success: false, message: "Missing session ID" });
    }

    // Retrieve the session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status === "paid") {
      const bookingId = session.metadata.bookingId;


      // Update the payment status in your database
      await Ticket.findByIdAndUpdate(bookingId, { paymentStatus: "Paid" });

      return res.json({ success: true, message: "Payment status updated to Paid" });
    }

    res.status(400).json({ success: false, message: "Payment not completed" });
  } catch (error) {
    console.error("Error updating payment:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


export { createPaymentIntent, updatePayment };
