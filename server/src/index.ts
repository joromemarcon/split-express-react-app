import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";

//use to protect API password via .env file
import { config } from "dotenv";
config();

import Receipt from "./models/receipt";

const PORT = 5000;

const app = express();

app.use(express.json());

//creates new Receipt to splits
// "async" request because newReceipt.save() is an asynchronous method noted as promise
app.post("/receipts", async (req: Request, res: Response) => {
  //create new instance of Receipt for db
  //Requires receipt ID
  const newReceipt = new Receipt({
    receiptID: req.body.receiptID,
  });
  const createdReceipt = await newReceipt.save(); //await since this method is async
  res.json(createdReceipt);
});

mongoose.connect(process.env.MONGO_URL!).then(() => {
  console.log("Listening on port 5000");
  app.listen(PORT);
});
