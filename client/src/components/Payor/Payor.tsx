import { useState } from "react";
import { MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import { createReceipt } from "../../api/createReceipt";
import NavigationBar from "../Navigation/NavigationBar";
import "./payor.css";

/*

***************** NEED TO STRUCTURE DATABASE *************************
DATA/OBJECTS NEEDED:
- Payee's phone number -> phoneNumber
- Payee's name -> customerName
- Orders -> orders: [
            {order_name, order_price, order_count}
          ]
- Paid -> paidPayor[]






*/
let dummyCustomerOne = {
  phoneNumber: "6191112222",
  customerName: "Jorome Marcon",
  orders: [
    { order_name: "sushi", order_price: 20, order_count: 2 },
    { order_name: "edamame", order_price: 10, order_count: 1 },
    { order_name: "soda", order_price: 5, order_count: 4 },
    { order_name: "poke", order_price: 30, order_count: 3 },
  ],
};

let dummyCustomerTwo = {
  phoneNumber: "61933344444",
  customerName: "John Doe",
  orders: [
    { order_name: "burger", order_price: 15, order_count: 1 },
    { order_name: "fries", order_price: 5, order_count: 1 },
    { order_name: "soda", order_price: 3, order_count: 2 },
    { order_name: "steak", order_price: 40, order_count: 2 },
  ],
};
let counter = 0; //counter to add dummy receipts

function Payor() {
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

    navigate(`/payhost/${phone}`);
  }

  return (
    <>
      <div className="App">
        <NavigationBar></NavigationBar>
        <form onSubmit={handleRetrieveReceipt}>
          <label>
            Host's Phone Number:
            <input
              id="customer-phone"
              value={phone}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setPhone(e.target.value);
              }}
            />
          </label>
          <button className="phn-sub-btn" type="submit">
            Submit
          </button>
        </form>
        <button className="btn-large" onClick={handleMouseEvent}>
          Click to Add Receipts
        </button>
      </div>
    </>
  );
}

export default Payor;
