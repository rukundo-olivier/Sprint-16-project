import mongoose from "mongoose";
const Schema = mongoose.Schema;

const quoteSchema = new Schema(
    {
      author: {
        type: String,
        required: true,
      },
      snippet: {
        type: String,
        required: true,
      },
      body: {
        type: String,
        required: true,
      },
    },
    { timestamps: true }
  );

  export const Quote = mongoose.model("Quote", quoteSchema);