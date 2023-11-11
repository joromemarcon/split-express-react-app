import React from "react";
import { useState, useEffect } from "react";
import { getReceipt, TReceipt } from "../api/getReceipt";
import { useParams } from "react-router-dom";

function Itemize() {
  const [payeeName, setPayeeName] = useState("");
  const [payeePhone, setPayeePhone] = useState("");
  const [transactionID, setTransactionID] = useState("");
  const [items, setItems] = useState<Array<string>>([""]);

  const params = useParams();

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

  return (
    <div>
      <div></div>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default Itemize;
