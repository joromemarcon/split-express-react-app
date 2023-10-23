import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";
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

mongoose
  .connect(
    "mongodb+srv://splitstorage:storagesplit@cluster0.ut217zc.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Listening on port 5000");
    app.listen(PORT);
  });
