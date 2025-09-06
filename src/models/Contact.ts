import mongoose, { Document, Schema } from 'mongoose';

export interface IContact extends Document {
  fullName: string;
  phone: string;
  email: string;
  message: string;
  createdAt: Date;
  updatedAt: Date;
}

const ContactSchema = new Schema<IContact>({
  fullName: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
}, {
  timestamps: true,
});

// Add indexes for better performance
ContactSchema.index({ email: 1 });
ContactSchema.index({ createdAt: -1 });

export default mongoose.models.Contact || mongoose.model<IContact>('Contact', ContactSchema);