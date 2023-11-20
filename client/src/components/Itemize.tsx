import React, { ChangeEvent } from "react";
import { useState, useEffect } from "react";
import { getReceipt, TReceipt } from "../api/getReceipt";
import { useParams } from "react-router-dom";
import NavigationBar from "./Navigation/NavigationBar";

function Itemize() {
  //Payee information
  const [payeeName, setPayeeName] = useState(""); //person that paid
  const [payeePhone, setPayeePhone] = useState(""); //person that paid
  //Payor information
  const [payorName, setPayorName] = useState("");
  //shared information
  const [transactionID, setTransactionID] = useState("");
  const [items, setItems] = useState<Array<string>>([""]);
  //purchased items information
  const [checkedItems, setCheckedItems] = useState([""]);

  const params = useParams();
  let itemsArr = items;

  useEffect(() => {
    retrieveReceiptData();
    return () => {};
  }, []);

  async function retrieveReceiptData() {
    /*
    - Get data from DB using phone number.
    */
    const response = await getReceipt(params.phoneNumber!);
    setPayeeName(response[0].customerName);
    setPayeePhone(response[0].phoneNumber);
    setTransactionID(response[0]._id);
    setItems(response[0].orders);
  }

  function handleSelect(e: ChangeEvent<HTMLInputElement>) {
    const selectedItem = e.target.value;
    const isChecked = e.target.checked;

    if (isChecked) {
      setCheckedItems([...checkedItems, selectedItem]);
    } else {
      const filteredList = checkedItems.filter((item) => item !== selectedItem);
      setCheckedItems(filteredList);
    }
  }
  /*
    r - stands for receipt
    p - stands for payor
  */
  return (
    <div>
      <NavigationBar />
      <div className="r-container">
        <div className="r-info">
          <p>Host: {payeeName}</p>
          <p>Invoice ID: {transactionID}</p>
        </div>
        {itemsArr.map((item, index) => (
          <div key={index} className="r-checkbox-container">
            <input
              type="checkbox"
              name="items"
              value={item}
              onChange={handleSelect}
            />
            <label>{item}</label>
          </div>
        ))}
      </div>
      <h1>INSERT DIVIDER HERE</h1>
      <div className="p-container">
        <div className="p-info">
          <form>
            <label>
              Name:
              <input id="p-name" />
            </label>
            <div id="p-tip">Tip amount: $0</div>
            <div id="p-tax">Tax total: $0</div>
            <div id="p-total">Pay Total: $0</div>
            <div className="p-item-list">
              <ul>
                {checkedItems.map((items) => (
                  <li>{items}</li>
                ))}
              </ul>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Itemize;
