/**
 * The purpose of this file is for Payees to view their bill in an itemized manner.
 * This page will almost be similar to the PayorItemize file
 *
 * What it shows:
 *          > Host/Payee name
 *          > Host/payee's phone number
 *          > Invoice ID
 *          > List of items
 *          > Payors/peers that have paid
 */
import NavigationBar from "../Navigation/NavigationBar";
import Itemize from "../ReceiptInformation/Itemize";
import { useState } from "react";
import "./payorMainPage.css";
import ReceiptDetails from "../ReceiptInformation/ReceiptDetails";
import Transaction from "../ReceiptInformation/Transaction";
import ChildTest from "./ChildTest";

function PayorMainPage() {
  const [test, setTest] = useState("hi");

  return (
    <>
      <NavigationBar />
      <div id="r-payor-container">
        <div className="r-details">
          <ReceiptDetails></ReceiptDetails>
        </div>
        <div className="r-items-list">
          <Itemize selection={"payor"}></Itemize>
        </div>
        {/* <div>
          <ChildTest itemCount={10} />
          {test}
        </div> */}
      </div>
    </>
  );
}

export default PayorMainPage;
