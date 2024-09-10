import mongoose from "mongoose";
const datschema = new mongoose.Schema(
    {
        Username: { type: String, required: true },
        Email: { type: String, required: true },
        Password: { type: String, required: true },
       Address: { type: String, required: true },
       
    },
    { timestamps: true }
);

const userdata = mongoose.models.userdata || mongoose.model('userdata', datschema);
export default userdata;
