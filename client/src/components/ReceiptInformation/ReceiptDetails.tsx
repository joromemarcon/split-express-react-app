import React, { ChangeEvent } from "react";
import { useState, useEffect } from "react";
import { getReceipt } from "../../api/getReceipt";
import { useParams } from "react-router-dom";

function ReceiptDetails() {
  const params = useParams();

  //Payee information
  const [payeeName, setPayeeName] = useState(""); //person that paid
  const [payeePhone, setPayeePhone] = useState(""); //person that paid
  //shared information
  const [transactionID, setTransactionID] = useState("");

  /*
    Here I am using useEffect to load/reload the function
    every time there is a change happening
  */
  useEffect(() => {
    retrieveReceiptData();
    return () => {};
  }, []);

  async function retrieveReceiptData() {
    const response = await getReceipt(params.phoneNumber!);
    const formattedPhoneNumber = formatPhoneNumber(response[0].phoneNumber);
    setPayeeName(response[0].customerName);
    setPayeePhone(formattedPhoneNumber);
    setTransactionID(response[0]._id);
  }

  /*
    Function: formatPhoneNumber
    use:
      This function is to convert phone number from a single string to
      a (###)###-#### number format for ease of reading

  */
  function formatPhoneNumber(numberToFormat: string): string {
    const phone = numberToFormat.replace(/[^\d]/g, "");
    const phoneLength = phone.length;

    if (phoneLength < 4) return phone;
    if (phoneLength < 7) {
      return `(${phone.slice(0, 3)}) ${phone.slice(3)}`;
    }
    return `(${phone.slice(0, 3)})${phone.slice(3, 6)}-${phone.slice(6, 10)}`;
  }

  return (
    <div>
      <div>
        <p>Host: {payeeName.toUpperCase()}</p>
        <p>Host Phone: {payeePhone}</p>
        <p>Invoice ID: {transactionID}</p>
      </div>
    </div>
  );
}

export default ReceiptDetails;
