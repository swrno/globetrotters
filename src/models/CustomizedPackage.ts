import mongoose, { Document, Schema } from "mongoose";

export interface ICustomizedPackage extends Document {
  packageId: string; // Reference to the base package ID
  userEmail: string;
  userName: string;
  userPhone: string;
  selectedInclusions: string[];
  customDays: number;
  customNights: number;
  customRequests: string;
  status: 'pending' | 'reviewed' | 'confirmed';
  priceSnapshot: number; // Price at the time of customization
  createdAt: Date;
  updatedAt: Date;
}

const CustomizedPackageSchema = new Schema<ICustomizedPackage>({
  packageId: { type: String, required: true },
  userEmail: { type: String, required: true },
  userName: { type: String, required: true },
  userPhone: { type: String, required: true },
  selectedInclusions: [{ type: String }],
  customDays: { type: Number, required: true },
  customNights: { type: Number, required: true },
  customRequests: { type: String },
  status: { type: String, enum: ['pending', 'reviewed', 'confirmed'], default: 'pending' },
  priceSnapshot: { type: Number, required: true },
}, {
  timestamps: true,
});

export default mongoose.models.CustomizedPackage || mongoose.model<ICustomizedPackage>('CustomizedPackage', CustomizedPackageSchema);
