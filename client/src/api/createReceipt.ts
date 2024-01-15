export async function createReceipt(
  phoneNumber: string,
  customerName: string,
  orders: {
    order_name: string;
    order_price: number;
    order_count: number;
  }[] //(string | number)[][]
) {
  fetch("http://localhost:5000/receipts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      phoneNumber: phoneNumber,
      customerName: customerName,
      orders: orders,
    }),
  });
}
