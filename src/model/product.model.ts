import mongoose, { Schema } from 'mongoose';

import { Product } from '@/interface';

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,

      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.Product ||
  mongoose.model<Product>('Product', productSchema);
