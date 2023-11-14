import { useState } from "react";
import "../App.css";
import { MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import { createReceipt } from "../api/createReceipt";
import NavigationBar from "./Navigation/NavigationBar";

let dummyCustomerOne = {
  phoneNumber: "6191112222",
  customerName: "Jorome Marcon",
  orders: ["sushi", "edemame", "soda", "poke"],
};

let dummyCustomerTwo = {
  phoneNumber: "61933344444",
  customerName: "John Doe",
  orders: ["burger", "fries", "soda", "steak"],
};
let counter = 0; //counter to add dummy receipts

function Payee() {
  const [phone, setPhone] = useState("");

  const navigate = useNavigate();

  async function handleMouseEvent(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    counter++;

    if (counter == 1) {
      createReceipt(
        dummyCustomerOne.phoneNumber,
        dummyCustomerOne.customerName,
        dummyCustomerOne.orders
      );
    } else if (counter == 2) {
      createReceipt(
        dummyCustomerTwo.phoneNumber,
        dummyCustomerTwo.customerName,
        dummyCustomerTwo.orders
      );
    }
  }
  async function handleRetrieveReceipt(e: React.FormEvent) {
    e.preventDefault();

    navigate(`/receipts/${phone}`);
  }

  return (
    <>
      <div className="App">
        <NavigationBar></NavigationBar>
        <form onSubmit={handleRetrieveReceipt}>
          <label>
            Customer Phone Number:
            <input
              id="customer-phone"
              value={phone}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setPhone(e.target.value);
              }}
            />
          </label>
          <button type="submit">Submit</button>
        </form>
        <button className="btn-large" onClick={handleMouseEvent}>
          Click to Add Receipts
        </button>
      </div>
    </>
  );
}

export default Payee;
