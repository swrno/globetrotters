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
  description: string; // Markdown string
  tags: string[];
  days: number;
  nights: number;
  cost_per_person: number;
  best_time_to_visit: string; // e.g., "APR - MAY", "All Year Round"
  video_url?: string; // Optional video URL for overview section
  trip_highlight: Record<string, string>; // key-value where value is Markdown string
  itinerary: {
    description: string;
    details: {
      [key: string]: string; // e.g., day1, day2, day3, etc.
    };
  };
  inclusions_exclusions: {
    dos: string[];
    donts: string[];
  };
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
  cost_per_person: { type: Number, required: true, default: 0 },
  best_time_to_visit: { type: String, default: 'All Year Round' },
  video_url: { type: String },
  trip_highlight: { type: Map, of: String, default: {} },
  itinerary: {
    description: { type: String, default: '' },
    details: { type: Map, of: String, default: {} }
  },
  inclusions_exclusions: {
    dos: [{ type: String }],
    donts: [{ type: String }]
  },
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