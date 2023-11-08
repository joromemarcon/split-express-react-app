import { useEffect, useState } from "react";
import "./App.css";
import { MouseEvent } from "react";

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
let counter = 0;

function App() {
  const [phone, setPhone] = useState("");
  const [test, setTest] = useState(Array<String>);

  async function handleMouseEvent(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    counter++;

    if (counter == 1) {
      fetch("http://localhost:5000/receipts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phoneNumber: dummyCustomerOne.phoneNumber,
          customerName: dummyCustomerOne.customerName,
          orders: dummyCustomerOne.orders,
        }),
      });
    } else if (counter == 2) {
      fetch("http://localhost:5000/receipts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phoneNumber: dummyCustomerTwo.phoneNumber,
          customerName: dummyCustomerTwo.customerName,
          orders: dummyCustomerTwo.orders,
        }),
      });
    }
  }
  async function handleRetrieveReceipt(e: React.FormEvent) {
    e.preventDefault();
    async function fetchReceipt() {
      const response = await fetch(`http://localhost:5000/receipts/${phone}`);
      const customerResult = await response.json();
      setTest(customerResult[0].orders);
    }
    fetchReceipt();
  }

  return (
    <>
      <div className="App">
        <ul>
          {test.map((items, index) => (
            <li key={index}>{items}</li>
          ))}
        </ul>
        <form>
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
          <button type="submit" onClick={handleRetrieveReceipt}>
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

export default App;
