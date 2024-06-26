//use to protect API password via .env file
import { config } from "dotenv";
config();

//imports
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
app.post("/payhost", async (req: Request, res: Response) => {
  //create new instance of Receipt for db
  //Requires receipt ID
  const newReceipt = new Receipt({
    phoneNumber: req.body.phoneNumber,
    customerName: req.body.customerName, //req.body.x is from payor.tsx
    orders: req.body.orders,
    peoplePaid: req.body.peoplePaid,
  });
  const createdReceipt = await newReceipt.save(); //await since this method is async
  res.json(createdReceipt);
  res.send("added!");
});

app.get(
  "/receipts/payhost/:phoneNumber",
  async (req: Request, res: Response) => {
    const customerPhoneNumber = req.params.phoneNumber;
    const listOfReceipts = await Receipt.find({
      phoneNumber: customerPhoneNumber,
    });
    res.json(listOfReceipts);
  }
);

app.get(
  "/receipts/host/:phone/:lastName",
  async (req: Request, res: Response) => {
    const payeePhoneNumber = req.params.phone;
    const payeeLastName = req.params.lastName;
    const returnedReceipt = await Receipt.find({
      phoneNumber: payeePhoneNumber,
      customerName: payeeLastName,
    });

    res.json(returnedReceipt);
  }
);

mongoose.connect(process.env.MONGO_URL!).then(() => {
  console.log(`Listening on port ${PORT}`);
  app.listen(PORT);
});
