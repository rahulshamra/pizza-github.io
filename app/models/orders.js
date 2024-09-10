import mongoose from "mongoose";
const datschema = new mongoose.Schema(
    {
        Username: { type: String, required: true },
        order_data:{type:Array,required:true}
    },
    { timestamps: true }
);

const orderdata = mongoose.models.orderdata || mongoose.model('orderdata', datschema);
export default orderdata;
