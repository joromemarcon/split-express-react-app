import { useState } from "react";
import { MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import { getReceipt } from "../../api/getReceipt";
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
  customerName: "jorome marcon",
  orders: [
    { order_name: "sushi", order_price: 20, order_count: 2 },
    { order_name: "edamame", order_price: 10, order_count: 1 },
    { order_name: "soda", order_price: 5, order_count: 4 },
    { order_name: "poke", order_price: 30, order_count: 3 },
  ],
  peoplePaid: [{ peer_name: "john", items_paid: ["sushi", "poke"] }],
};

let dummyCustomerTwo = {
  phoneNumber: "61933344444",
  customerName: "john doe",
  orders: [
    { order_name: "burger", order_price: 15, order_count: 1 },
    { order_name: "fries", order_price: 5, order_count: 1 },
    { order_name: "soda", order_price: 3, order_count: 2 },
    { order_name: "steak", order_price: 40, order_count: 2 },
  ],
  peoplePaid: [],
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
        dummyCustomerOne.orders,
        dummyCustomerOne.peoplePaid
      );
    } else if (counter == 2) {
      createReceipt(
        dummyCustomerTwo.phoneNumber,
        dummyCustomerTwo.customerName,
        dummyCustomerTwo.orders,
        dummyCustomerTwo.peoplePaid
      );
    }
  }

  async function handleRetrieveReceipt(e: React.FormEvent) {
    e.preventDefault();

    /*
  - Get data from DB using phone number.
  */
    const response = await getReceipt(phone!);
    if (response.length === 0) {
      alert("Invalid Phone Number!");
    } else {
      navigate(`/payhost/${phone}`);
    }
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
