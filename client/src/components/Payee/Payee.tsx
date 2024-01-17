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

    const response = await getReceiptLN(phone!, lastName!);
    console.log(response);
    navigate(`/host/${phone}/${lastName}`);
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
            Last Name:
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
