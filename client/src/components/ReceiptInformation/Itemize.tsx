/**
 * The purpose of this file is for users to view their bill in an itemized manner.
 *
 * What it shows:
 *          > Host/Payee name
 *          > Host/payee's phone number
 *          > Invoice ID
 *          > List of items
 */

import React, { ChangeEvent } from "react";
import { useState, useEffect } from "react";
import { getReceipt } from "../../api/getReceipt";
import { useParams } from "react-router-dom";
import Transaction from "./Transaction";
import "./itemize.css";
import ChildTest from "../Payor/ChildTest";

interface Itest {
  selection: string;
}

function Itemize(Itest: Itest) {
  /************************************
   *
   *          DECLARATION
   *
   ************************************/

  /*
      purchased items Array
  */
  const [items, setItems] = useState<
    Array<{
      order_name: string;
      order_price: number;
      order_count: number;
    }>
  >([]); //useState<Array<(string | number)[]>>([][0]);

  const params = useParams();

  /*
    Here I am mapping purchased item to display the name of item
    and its corresponding price, side by side
  */
  let itemsArr = items;
  let itemPrice = new Map<String, number>();
  let itemCount = new Map<String, number[]>();

  itemsArr.map((item) => mapItems(item));

  function mapItems(item: {
    order_name: string;
    order_price: number;
    order_count: number;
  }) {
    itemPrice.set(item.order_name, item.order_price);
    let tempCountArr: number[] = [];
    for (let i = 1; i <= item.order_count; i++) {
      tempCountArr.push(i);
    }
    itemCount.set(item.order_name, tempCountArr);
  }

  /*
    Here I am using useEffect to load/reload the function
    every time there is a change happening
  */
  useEffect(() => {
    //code we want to run
    retrieveReceiptData();
    //optional return function
    return () => {};
  }, []); // The dependency array

  //purchased items information
  const [checkedItems, setCheckedItems] = useState<Array<string>>([]);
  const [purchaseTotal, setPurchaseTotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);

  const taxPercentage = 0.0825;

  /************************************
   *
   *          FUNCTIONS
   *
   ************************************/

  /*
       Function: retrieveReceiptData()
       use:
        Get data from DB using phone number and last name
        calls getReceiptLN function from api folder
        sets response.json into each useState variables
  */
  async function retrieveReceiptData() {
    const response = await getReceipt(params.phoneNumber!);
    setItems(response[0].orders);
  }

  function handleSelect(e: ChangeEvent<HTMLInputElement>) {
    const selectedItem = e.target.value;
    const isChecked = e.target.checked;

    calculateTotal(selectedItem, isChecked);
  }

  function calculateTotal(selectedItem: string, isChecked: boolean) {
    let calcTax = 0;
    let calcPurchase = 0;
    let calcTotal = 0;

    let price: number = itemPrice.get(selectedItem)!;

    if (isChecked) {
      calcPurchase = purchaseTotal + price;
      setCheckedItems([...checkedItems, selectedItem]);
      setPurchaseTotal(calcPurchase);
    } else {
      calcPurchase = purchaseTotal - price;
      const filteredList = checkedItems.filter((item) => item !== selectedItem);
      setCheckedItems(filteredList);
      setPurchaseTotal(calcPurchase);
    }
    calcTax = Math.round(calcPurchase * taxPercentage * 10) / 10;
    calcTotal = calcPurchase + calcTax;
    setTax(calcTax);
    setTotal(calcTotal);
  }

  /**
   *
   * RECONSTRUCTING CART TOTAL:
   *
   *
   */

  let itemMultiplier = new Map<string, number>(); // holds item name and count

  itemsArr.forEach((i) => {
    itemMultiplier.set(i.order_name, 1);
  });

  function hSelect(e: ChangeEvent<HTMLInputElement>) {
    const selectedItem = e.target.value;
    const isChecked = e.target.checked;

    if (isChecked) {
      setCheckedItems([...checkedItems, selectedItem]);
    } else {
      const filteredList = checkedItems.filter((item) => item !== selectedItem);
      setCheckedItems(filteredList);
    }
    hCalcualte();
  }

  function hCalcualte() {
    let calcTax = 0;
    let calcPurchase = 0;
    let calcTotal = 0;

    console.log(checkedItems);

    checkedItems.forEach((item) => {
      calcPurchase =
        calcPurchase + itemPrice.get(item)! * itemMultiplier.get(item)!;
    });

    setPurchaseTotal(calcPurchase);

    calcTax = Math.round(calcPurchase * taxPercentage * 10) / 10;
    calcTotal = calcPurchase + calcTax;
    setTax(calcTax);
    setTotal(calcTotal);
  }

  function selectOnChange(e: ChangeEvent<HTMLSelectElement>) {
    let itemId = e.target.id;
    let itemValue = Number(e.target.value);
    setDropDown([[itemId, itemValue]]);
  }

  const [dropDown, setDropDown] = useState(Array<[string, number]>());

  useEffect(() => {
    if (dropDown[0] != null)
      itemMultiplier.set(dropDown[0][0]!, dropDown[0][1]!);
    hCalcualte();
  }, [dropDown]);

  useEffect(() => {
    hCalcualte();
  }, [checkedItems]);

  if (Itest.selection === "payor") {
    return (
      <div id="r-parent-container">
        <div id="r-container">
          {itemsArr &&
            itemsArr.length &&
            itemsArr.map((item, index) => (
              <div key={index} className="receipt-checkbox-container">
                <input
                  type="checkbox"
                  name="items"
                  value={item.order_name}
                  onChange={hSelect}
                />
                <label>{item.order_name}</label>
                <label>{" $" + item.order_price}</label>
                {checkedItems.indexOf(item.order_name) > -1 ? (
                  <select
                    id={item.order_name}
                    defaultValue={1}
                    onChange={selectOnChange}
                  >
                    {itemCount.get(item.order_name)?.map((arr) => (
                      <option key={arr} id={item.order_name} value={arr}>
                        {arr}
                      </option>
                    ))}
                  </select>
                ) : null}
              </div>
            ))}
        </div>
        <div id="r-transaction">
          {checkedItems.length > 0 ? (
            <Transaction
              tax={tax}
              total={total}
              purchaseTotal={purchaseTotal}
              selectedItems={checkedItems}
            ></Transaction>
          ) : null}
        </div>
      </div>
    );
  } else {
    /**
     * This else statement will be used to return information for Payee
     */
    return (
      <div>
        <div className="r-item-list">
          <ul>
            {itemsArr &&
              itemsArr.length &&
              itemsArr.map((item, index) => (
                <li key={index}>{item.order_name + " " + item.order_count}</li>
              ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default Itemize;
