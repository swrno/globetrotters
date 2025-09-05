import mongoose, { Document, Schema } from 'mongoose';

export interface IRegistration {
  name: string;
  email: string;
  phone: string;
  registeredAt?: Date;
}

export interface IPackage extends Document {
  id: string;
  location: string;
  title: string;
  description: string; // Markdown
  tags: string[];
  days: number;
  nights: number;
  registrations: IRegistration[];
  images: string[];
  createdAt: Date;
  updatedAt: Date;
}

const RegistrationSchema = new Schema<IRegistration>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  registeredAt: { type: Date, default: Date.now },
});

const PackageSchema = new Schema<IPackage>({
  id: { type: String, required: true, unique: true },
  location: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  tags: [{ type: String }],
  days: { type: Number, required: true },
  nights: { type: Number, required: true },
  registrations: [RegistrationSchema],
  images: [{ type: String }],
}, {
  timestamps: true,
});

// Add indexes for better performance
PackageSchema.index({ location: 1 });
PackageSchema.index({ tags: 1 });
PackageSchema.index({ createdAt: -1 });

export default mongoose.models.Package || mongoose.model<IPackage>('Package', PackageSchema);