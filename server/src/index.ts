//use to protect API password via .env file
import { config } from "dotenv";
config();

import express, { Express, Request, Response, query } from "express";
import mongoose from "mongoose";
import cors from "cors";
import Receipt from "./models/receipt";

const PORT = 5000;

const app = express();

app.use(cors());
app.use(express.json());

/**********************
 *
 * END POINT FOR /RECEIPT
 * creates new Receipt to splits
 * "async" request because newReceipt.save() is an asynchronous method noted as promise
 *
 *********************/
app.post("/receipts", async (req: Request, res: Response) => {
  //create new instance of Receipt for db
  //Requires receipt ID
  const newReceipt = new Receipt({
    phoneNumber: req.body.phoneNumber,
    customerName: req.body.customerName, //req.body.x is from app.tsx
    orders: req.body.orders,
  });
  const createdReceipt = await newReceipt.save(); //await since this method is async
  res.json(createdReceipt);
});

app.get("/receipts/:phoneNumber", async (req: Request, res: Response) => {
  const customerPhoneNumber = req.params.phoneNumber;
  const listOfReceipts = await Receipt.find({
    phoneNumber: customerPhoneNumber,
  });
  res.json(listOfReceipts);
});

mongoose.connect(process.env.MONGO_URL!).then(() => {
  console.log(`Listening on port ${PORT}`);
  app.listen(PORT);
});
