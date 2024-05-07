/**
 * The purpose of this file is to capture information
 * of the person that paid(to be paid)
 *
 * The "View Existing Bill" button in homepage routes to this page
 *
 * The Payee is able to access the main bill by entering their phoneNumber and full name(non-case sens.)
 */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getReceiptLN } from "../../api/getReceiptLN";
import NavigationBar from "../Navigation/NavigationBar";

function Payee() {
  const [phone, setPhone] = useState("");
  const [lastName, setLastName] = useState("");

  const navigate = useNavigate();

  async function handleRetrieveReceipt(e: React.FormEvent) {
    e.preventDefault();

    let lowerCaseLN = lastName.toLowerCase();
    const response = await getReceiptLN(phone!, lowerCaseLN);
    if (
      response[0].phoneNumber === phone &&
      response[0].customerName === lowerCaseLN
    ) {
      navigate(`/host/${phone}/${lowerCaseLN}`);
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
          <label>
            Full Name:
            <input
              id="customer-ln"
              value={lastName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setLastName(e.target.value);
              }}
            />
          </label>
          <button className="phn-sub-btn" type="submit">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default Payee;
