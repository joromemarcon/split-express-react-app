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

import React, { ChangeEvent } from "react";
import { useState, useEffect } from "react";
import { getReceiptLN } from "../../api/getReceiptLN";
import { useParams } from "react-router-dom";
import NavigationBar from "../Navigation/NavigationBar";
import Itemize from "../ReceiptInformation/Itemize";
import "./payeeMainPage.css";
import ReceiptDetails from "../ReceiptInformation/ReceiptDetails";
import Transaction from "../ReceiptInformation/Transaction";

function PayeeItemize() {
  return (
    <>
      <NavigationBar />
      <div className="r-details">
        <ReceiptDetails />
      </div>
    </>
  );
}

export default PayeeItemize;
