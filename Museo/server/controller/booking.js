import { sendBookingEmail } from "../config/emailConfig.js";
import Ticket from "../models/Booking.js";

const bookTicket = async (req, res) => {
  try {
    console.log("New Booking Request:", req.body);

    let {
      user,
      visitDate,
      visitTime,
      ticketType,
      numAdults,
      numChildren,
      numSeniors,
      totalPrice,
      paymentStatus,
      addOns,
      email
    } = req.body;

    if (!visitDate || !visitTime) {
      console.error("Error: Missing visitDate or visitTime!");
      return res.status(400).json({ error: "visitDate and visitTime are required." });
    }

    visitDate = new Date(visitDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (visitDate < today) {
      console.error("Error: Visit date is in the past!");
      return res.status(400).json({ error: "Visit date cannot be in the past!" });
    }

    if (numAdults < 1) {
      console.error("Error: At least one adult is required!");
      return res.status(400).json({ error: "At least one adult is required!" });
    }

    const ticket = await Ticket.create({
      user,
      visitDate,
      visitTime,
      ticketType,
      numAdults,
      numChildren,
      numSeniors,
      totalPrice,
      paymentStatus,
      addOns,
      email
    });

    console.log("Booking Successful:", ticket);

    // Send Confirmation Email
    await sendBookingEmail(email, ticket);

    res.status(201).json({ message: "Booking successful!", ticket });
  } catch (err) {
    console.error("Error Booking Ticket:", err);

    if (err.name === "ValidationError") {
      return res.status(400).json({ error: err.message });
    }

    res.status(500).json({ error: "Internal Server Error" });
  }
};


const getTicket = async (req, res) => {
  try {
    const { userId } = req.query;
    console.log(userId)

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    // ✅ Fetch tickets for the user, sorted by visit date (newest first)
    const tickets = await Ticket.find({ user: userId }).sort({ visitDate: -1 });

    res.status(200).json(tickets );
  } catch (error) {
    console.error("Error fetching tickets:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};



export { getTicket, bookTicket };
