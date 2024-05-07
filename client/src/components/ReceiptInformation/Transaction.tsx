interface checkedItems {
  purchaseTotal: number;
  tax: number;
  total: number;
  selectedItems: string[];
}

function Transaction(checkedItems: checkedItems) {
  return (
    <div>
      <h3>Your Cart: </h3>
      <form>
        <div id="r-select">Purchase amount: ${checkedItems.purchaseTotal}</div>
        <div id="r-tax">Tax amount: ${checkedItems.tax}</div>
        <div id="r-tip">Tip amount: $0</div>
        <div id="r-total">Total: ${checkedItems.total}</div>
        <div className="r-item-list">
          <ul>
            {checkedItems.selectedItems.map((items, index) => (
              <li key={index}>{items}</li>
            ))}
          </ul>
        </div>
      </form>
    </div>
  );
}

export default Transaction;
