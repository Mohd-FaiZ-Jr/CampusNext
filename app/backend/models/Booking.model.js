import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema(
  {
    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
      required: [true, "Property is required"],
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Student is required"],
    },
    landlord: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Landlord is required"],
    },
    status: {
      type: String,
      enum: ["PENDING", "APPROVED", "CANCELLED", "REJECTED"],
      default: "PENDING",
    },
    checkInDate: {
      type: Date,
      required: false,
    },
    checkOutDate: {
      type: Date,
      required: false,
    },
    totalPrice: {
      type: Number,
      required: false,
    },
    notes: {
      type: String,
      maxlength: [500, "Notes cannot exceed 500 characters"],
    },
    cancelledBy: {
      type: String,
      enum: ["STUDENT", "LANDLORD"],
      required: false,
    },
    cancelledAt: {
      type: Date,
      required: false,
    },
  },
  { timestamps: true }
);

// Indexes for better query performance
BookingSchema.index({ student: 1, createdAt: -1 });
BookingSchema.index({ landlord: 1, status: 1 });
BookingSchema.index({ property: 1, status: 1 });

// Compound index to prevent duplicate pending bookings
BookingSchema.index(
  { student: 1, property: 1, status: 1 },
  {
    unique: true,
    partialFilterExpression: { status: "PENDING" },
  }
);

export default mongoose.models.Booking ||
  mongoose.model("Booking", BookingSchema);
