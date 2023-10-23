import mongoose from "mongoose";

// const { Schema } = mongoose;
//OR
const Schema = mongoose.Schema;

const ReceiptSchema = new Schema({
  receiptID: String, // String is shorthand for {type: String}
  //date: { type: Date, default: Date.now },
});

const Receipt = mongoose.model("Receipt", ReceiptSchema);

export default Receipt;
