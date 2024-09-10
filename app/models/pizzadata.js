import mongoose from "mongoose";
const datschema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        category: { type: String, required: true },
        foodType: { type: String, required: true },
        price: { type: Object, required: true },
        description: { type: String, required: true },
        image: { type: String, required: true }
    },
    { timestamps: true }
);

const pizzadata = mongoose.models.pizzadata || mongoose.model('pizzadata', datschema);
export default pizzadata;
