import mongoose from "mongoose";

// const { Schema } = mongoose;
//OR
const Schema = mongoose.Schema;

const ReceiptSchema = new Schema({
  phoneNumber: String,
  customerName: String,
  orders: Array<String>,
  peoplePaid: Array<String>,

  //receiptID: String,
  //testId: String, // String is shorthand for {type: String}
  //date: { type: Date, default: Date.now },
});

const Receipt = mongoose.model("Receipt", ReceiptSchema);

export default Receipt;
