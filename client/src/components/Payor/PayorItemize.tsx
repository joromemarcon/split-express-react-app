import React, { ChangeEvent } from "react";
import { useState, useEffect } from "react";
import { getReceipt, TReceipt } from "../../api/getReceipt";
import { useParams } from "react-router-dom";
import NavigationBar from "../Navigation/NavigationBar";

function PayorItemize() {
  //Payee information
  const [payeeName, setPayeeName] = useState(""); //person that paid
  const [payeePhone, setPayeePhone] = useState(""); //person that paid
  //Payor information
  const [payorName, setPayorName] = useState("");
  const [payorPhone, setPayorPhone] = useState("");
  //shared information
  const [transactionID, setTransactionID] = useState("");
  const [items, setItems] = useState<
    Array<{
      order_name: string;
      order_price: number;
      order_count: number;
    }>
  >([]); //useState<Array<(string | number)[]>>([][0]);

  //purchased items information
  const [checkedItems, setCheckedItems] = useState<Array<string>>([]);
  const [purchaseTotal, setPurchaseTotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);

  const taxPercentage = 0.0825;
  const params = useParams();
  let itemsArr = items;
  let itemPrice = new Map<String, number>();

  itemsArr.map((item) => itemPrice.set(item.order_name, item.order_price));

  useEffect(() => {
    retrieveReceiptData();
    return () => {};
  }, []);

  async function retrieveReceiptData() {
    /*
    - Get data from DB using phone number.
    */
    const response = await getReceipt(params.phoneNumber!);
    const formattedPhoneNumber = formatPhoneNumber(response[0].phoneNumber);
    setPayeeName(response[0].customerName);
    setPayeePhone(formattedPhoneNumber);
    setTransactionID(response[0]._id);
    setItems(response[0].orders);
  }

  function formatPhoneNumber(numberToFormat: string): string {
    const phone = numberToFormat.replace(/[^\d]/g, "");
    const phoneLength = phone.length;

    if (phoneLength < 4) return phone;
    if (phoneLength < 7) {
      return `(${phone.slice(0, 3)}) ${phone.slice(3)}`;
    }
    return `(${phone.slice(0, 3)})${phone.slice(3, 6)}-${phone.slice(6, 10)}`;
  }

  function handleSelect(e: ChangeEvent<HTMLInputElement>) {
    const selectedItem = e.target.value;
    const isChecked = e.target.checked;

    let calcTax = 0;
    let calcPurchase = 0;
    let calcTotal = 0;

    if (isChecked) {
      calcPurchase = purchaseTotal + itemPrice.get(selectedItem)!;
      setCheckedItems([...checkedItems, selectedItem]);
      setPurchaseTotal(calcPurchase);
    } else {
      calcPurchase = purchaseTotal - itemPrice.get(selectedItem)!;
      const filteredList = checkedItems.filter((item) => item !== selectedItem);
      setCheckedItems(filteredList);
      setPurchaseTotal(calcPurchase);
    }
    calcTax = Math.round(calcPurchase * taxPercentage * 10) / 10;
    calcTotal = calcPurchase + calcTax;
    setTax(calcTax);
    setTotal(calcTotal);
  }

  return (
    <div>
      <NavigationBar />
      <div className="receipt-container">
        <div className="receipt-info">
          <p>Host: {payeeName}</p>
          <p>Host Phone: {payeePhone}</p>
          <p>Invoice ID: {transactionID}</p>
        </div>
        {itemsArr &&
          itemsArr.length &&
          itemsArr.map((item, index) => (
            <div key={index} className="receipt-checkbox-container">
              <input
                type="checkbox"
                name="items"
                value={item.order_name}
                onChange={handleSelect}
              />
              <label>{item.order_name}</label>
              <label>{" $" + item.order_price}</label>
            </div>
          ))}
      </div>

      {/*
        TO DO HERE:
        - FIX DIVIDER
        - Send data gathered to Payee's page
            + Name
            + Phone Number
            + Total amount paid / tax paid / tip paid / items paid
            + Date paid -> add a date display

      */}
      <h1>INSERT DIVIDER HERE</h1>
      <div className="payor-container">
        <div className="payor-info">
          <form>
            <label id="payor-info-label">
              Name:
              <input
                id="payor-name"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setPayorName(e.target.value);
                }}
              />
            </label>
            <label id="payor-info-label">
              Phone Number:
              <input
                id="payor-phone"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setPayorPhone(e.target.value);
                }}
              />
            </label>
            <div id="payor-purchase">Purchase amount: ${purchaseTotal}</div>
            <div id="payor-tax">Tax amount: ${tax}</div>
            <div id="payor-tip">Tip amount: $0</div>
            <div id="payor-total">Total: ${total}</div>
            <div className="payor-item-list">
              <ul>
                {checkedItems.map((items, index) => (
                  <li key={index}>{items}</li>
                ))}
              </ul>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PayorItemize;
