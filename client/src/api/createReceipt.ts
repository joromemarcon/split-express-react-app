export async function createReceipt(
  phoneNumber: string,
  customerName: string,
  orders: {
    order_name: string;
    order_price: number;
    order_count: number;
  }[], //(string | number)[][]
  peoplePaid: {
    peer_name: string;
    items_paid: string[];
  }[]
) {
  fetch("http://localhost:5000/payhost", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      phoneNumber: phoneNumber,
      customerName: customerName,
      orders: orders,
      peoplePaid: peoplePaid,
    }),
  });
}
