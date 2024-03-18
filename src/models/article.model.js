import mongoose from "mongoose";

const { Schema } = mongoose;

const articleSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      maxlength: 100,
    },
    subtitle: {
      type: String,
      required: [true, "Subtitle is required"],
      maxlength: 100,
    },
    status: {
      type: String,
      enum: ["READ", "SAVE", "UNREAD"],
      default: "UNREAD",
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      maxlength: 1000, 
    },
    image: {
      type: String,
    //   required: [true, "Image is required"],
    },
    authors: {
        type: [String],
        required: [true, "Author is required"],
      },
    categories: {
      type: [String],
      required: [true, "Categories is required"],
      enum: [
        "lasyans",
        "kilti",
        "edikasyon",
        "politik",
        "relijyon",
        "Espò",
        "espirityalite",
      ],
    },
    readCount: {
      type: Number,
      default: 0,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  }, 
  { timestamps: true }
);

export default mongoose.model("Article", articleSchema);
